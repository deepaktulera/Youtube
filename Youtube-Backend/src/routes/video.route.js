import express from 'express'
import { fetchVideos , fetchVideo , uploadVideo} from '../controllers/video.controller.js'

const router = express.Router()

router.get("/videos" , fetchVideos)
router.get("/video/:id" , fetchVideo)
router.post("/video/upload" , uploadVideo)

export default router