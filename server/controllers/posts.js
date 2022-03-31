import express from 'express'
import mongoose from 'mongoose'

import PostMessage from '../models/postMessage.js'

const router = express.Router()

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()

        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const createPost = async (req, res) => {
    const post = req.body

    const newPost = new PostMessage(post)

    try {
        await newPost.save()

        res.status(201).json(newPost)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export default router