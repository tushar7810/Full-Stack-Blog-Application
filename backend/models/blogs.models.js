import mongoose , { Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
    mainImage: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
    },
    intro: {
        type: String,
        required: true,
        minLength: [250, "Blog introduction must contain at least 250 characters!"],
    },
    paraOneImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    paraOneDescription: {
      type: String,
    },
    paraOneTitle: {
      type: String,
    },
    paraTwoImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    paraTwoDescription: {
      type: String,
    },
    paraTwoTitle: {
      type: String,
    },
    paraThreeImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    paraThreeDescription: {
      type: String,
    },
    paraThreeTitle: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorAvatar: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    createdOn :{
      type: Date,
      default: Date.now(),
    }
})

export const Blog = mongoose.model('Blog',blogSchema)