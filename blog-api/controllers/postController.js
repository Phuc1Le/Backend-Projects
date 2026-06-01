const postModel = require("../model/postModel");
const getAllPosts = async (req, res) => {
    try{
        const posts = await postModel.findAll()
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
module.exports = {
  getAllPosts,
  getPostById,
};