const cloudinary = require("../middleware/cloudinary");
const Update = require("../models/Update");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => { 
    console.log(req.user)
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      const updates = await Update.find({ user: req.user.id });
      //Sending post data from mongodb and user data to ejs template
      res.render("profile.ejs", { updates: updates, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPublicProfile: async (req, res) => { 
    try {
      const user = await User.findById(req.params.id);
      const updates = await Update.find({ user: user.id });
      res.render("public-profile.ejs", { updates: updates, user: user });
    } catch (err) {
      console.log(err);
    }
  }, 
   getFeed: async (req, res) => { 
     console.log(req.user)
     try {
       //Fetch all updates from the database
       const updates = await Update.find().populate('update');

      console.log(updates)

      //Sending post data from mongodb and user data to ejs template
      res.render("feed.ejs", { updates: updates , user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
 getDiscover: async (req, res) => { 
  console.log(req.user)
  try {
    // Fetch the most recent update for each user
    const updates = await Update.aggregate([
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: "$user",
          update: { $first: "$$ROOT" }
        }
      }
    ]).exec();

    console.log(updates)

    // Send update data from the database and user data to the template
    res.render("discover.ejs", { updates: updates , user: req.user });
  } catch (err) {
    console.log(err);
  }
},
  getUpdate: async (req, res) => {
    try {
      //id parameter comes from the post routes
      //router.get("/:id", ensureAuth, updatesController.getUpdate);
      //http://localhost:1818/post/631a7f59a3e56acfc7da286f
      //id === 631a7f59a3e56acfc7da286f
      const update = await Update.findById(req.params.id).populate("user");
      res.render("update.ejs", { update: update, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  createUpdate: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      //media is stored on cloudainary - the above request responds with url to media and the media id that you will need when deleting content 
      await Update.create({
        description: req.body.description,
        media: result.secure_url,
        cloudinaryId: result.public_id,
        links: req.body.links,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likeUpdate: async (req, res) => {
    try {
      await Update.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/update/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteUpdate: async (req, res) => {
    try {
      // Find post by id
      let update = await Update.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(update.cloudinaryId);
      // Delete post from db
      await update.remove({ _id: req.params.id });
      console.log("Deleted Update");
      res.redirect("/profile");
    } catch (err) {
      console.log("Update was not deleted");
      res.redirect("/profile");
    }
  },
};
