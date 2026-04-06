import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {

    },
    {

    }

)

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;