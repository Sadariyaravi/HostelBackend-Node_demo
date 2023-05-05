const Posts = require("../models/Post");
const { SERVER_ERROR, BAD_REQUEST } = require("../enums/error");
const Joi = require("joi");

const PostValidations = Joi.object().keys({
  PostTitle: Joi.string().required().min(4).max(20),
  PostBody: Joi.string().required().min(6),
  PostedBy: Joi.number().required(),
  PostImageLink: Joi.string(),
});

const GetPosts = async (req, res, next) => {
  try {
    Posts.findAll().then((allPost) => {
      res.locals.Posts = allPost;
      next();
    });
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const AddPosts = async (req, res, next) => {
  try {
    console.log(req.body, req.file);
    let { error } = PostValidations.validate(req.body);

    if (error) {
      next({ error: { status: BAD_REQUEST, message: error.message } });
    } else {
      let Post = {
        PostTitle: req.body.PostTitle,
        PostBody: req.body.PostBody,
        PostedBy: req.body.PostedBy,
        PostImageLink: req.file.path,
      };
      Posts.create(Post).then((AddedPost) => {
        res.locals.AddedPost = AddedPost;
        next();
      });
    }
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
  } catch (error) {
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
    if (error.errors) next({ error: { status: SERVER_ERROR, message: error } });
  }
};

module.exports = { AddPosts, GetPosts, UpdatePosts, DeletePosts };
