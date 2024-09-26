const express = require('express');
const videoController = require('../controllers/videoController');

const router = express.Router();

router.post("/get-similar-videos", videoController.getSimilarVideos);

module.exports = router;