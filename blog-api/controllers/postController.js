const postModel = require("../model/postModel");
const getAllPosts = async (req, res) => {
    try{
        const term = req.query.term;
        const posts = await postModel.findAll(term)
        res.status(200).json(posts);
    }
    catch(err){
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

const getPostById = async (req, res) => {
    try{
        const id = Number(req.params.id)
        if(Number.isNaN(id)){
            return res.status(400).json({
                message: "Invalid post id",
            });
        }
        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        res.status(200).json(post);
    }
    catch(err){
        console.error(error);

        res.status(500).json({
            message: "Internal server error",
        });
    }
}
const createPost = async (req, res) => {
    try {
        const {
            title,
            content,
            category
        } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }
        const post = await postModel.create({title, content, category});

        res.status(201).json(post);
    } 
    catch(error){
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}
const updatePost = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid post id"
            });
        }
        const {
            title,
            content,
            category
        } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                message:
                    "Title and content are required"
            });
        }
        const updatedPost =
            await postModel.update(
                id,
                {
                    title,
                    content,
                    category
                }
            );

        if (!updatedPost) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message:
                "Internal server error"
        });
    }
}
const deletePost = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid post id"
            });
        }

        const deletedPost = await postModel.deletePost(id);
        if (!deletedPost) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}
module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};