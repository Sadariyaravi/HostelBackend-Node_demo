const Posts = require("../models/Post");
const {SERVER_ERROR} = require("../enums/error")

const GetPosts = async (req, res, next) => {
  try {
    Posts.findAll().then((allPost) => {
      res.locals.Posts = allPost;
      next();
    });
  }catch (error) {
     next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const AddPosts = async (req, res, next) => {
  try {
    Posts.create(req.body).then((AddedPost) => {
      res.locals.AddedPost = AddedPost;
      next();
    });
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const UpdatePosts = async (req, res, next) => {
  try {
    Posts.update(req.body, {
      where: {
        id: req.query.PostId,
      },
    });
    res.locals.updated_post = `Post Id:${req.query.PostId} Updated SuccessFully`;
    next();
  }catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const DeletePosts = async (req, res, next) => {
  try {
    Posts.destroy({
      where: {
        id: req.query.PostId,
      },
    });
    res.locals.postdelete = `Post Id: ${req.query.PostId} is deleted successfully`;

    next();
  } catch (error) {
    if (error.errors)
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

module.exports = { AddPosts, GetPosts, UpdatePosts, DeletePosts };
