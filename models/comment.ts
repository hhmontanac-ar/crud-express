import mongoose, {Schema, Types} from "mongoose";

interface IComment{
    title : String,
    author: String,
    body: String,
    article: Types.ObjectId
}

const Comment = mongoose.model('Comment', new mongoose.Schema<IComment>({
    title: {type: String, required: true},
    body: {type: String, required: true},
    author: {type: String, required: true},
    article: {type: Schema.Types.ObjectId, ref: 'Article'}
}))

export {Comment, IComment};