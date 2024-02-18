import mongoose from 'mongoose';

const postScheme = new mongoose.Schema({
    userId: {
        type:String,
        required: true
    },
    content: {
        type:String,
        required: true
    },
    title: {
        type:String,
        required: true,
        unique:true
    },
    image: {
        type:String,
        default: 'https://www.shutterstock.com/image-vector/content-writer-blog-articles-creation-600nw-2141979401.jpg'
    },
    category: {
        type:String,
        default: 'uncategorized'
    },
    slug: {
        type: String,
        required:true,
        unique:true
    }
}, {timestamps: true})

const Post = mongoose.model('Post', postScheme);

export default Post;