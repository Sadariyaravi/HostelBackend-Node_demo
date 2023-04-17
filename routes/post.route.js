const router = require("express").Router();

const PostRouter = router;
const Postcontroller = require("../controllers/post.controller");
const Posts = require("../models/Post");
const authorized = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");


// Allow anonymous
PostRouter.get("/Post", Postcontroller.GetPosts, async (req, res) => {
  res.status(200).send(res.locals.Posts);
});


// Authentication For all Routers except Get method.
// PostRouter.use(authentication);


// Post method with Authorization. only for Hosteladmin and superadmin
PostRouter.post(
  "/Post",
  authentication,
  authorized(["HostelAdmin", "SuperAdmin"]),
  Postcontroller.AddPosts,
  async (req, res) => {
    res.status(200).send(res.locals.AddedPost);
  }
);


// Put method with Authorization. only for Hosteladmin and superadmin
PostRouter.put(
  "/Post",
  authentication,
  authorized(["HostelAdmin", "SuperAdmin"]),
  Postcontroller.UpdatePosts,
  async (req, res) => {
    res.status(200).send(res.locals.updated_post);
  }
);


// Delete method with Authorization. only for Hosteladmin and superadmin
PostRouter.delete(
  "/Post",
  authentication,
  authorized(["HostelAdmin", "SuperAdmin"]),
  Postcontroller.DeletePosts,
  async (req, res) => {
    res.status(200).send(res.locals.postdelete);
  }
);

module.exports = PostRouter;
