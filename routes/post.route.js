const router = require("express").Router();

const PostRouter = router;
const Postcontroller = require("../controllers/post.controller");
const Posts = require("../models/Post");
const authorized = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix+'-'+file.originalname);
  },
});

const upload = multer({ storage: storage });

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
  upload.single("PostImageLink"),
  Postcontroller.AddPosts,
  async (req, res) => {
    res.status(200).send();
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
