const youtubeService = require("../services/youtubeService");

async function getSimilarVideos(req, res) {
  const { videoUrl } = req.body;
  const videoIdMatch = videoUrl.match(/(?<=v=|v\/|vi\/|vi=|e\/|embed\/|watch\/|\/live\/|\/shorts\/|youtu\.be\/|\/v\/|\/watch\?v=|watch\?.+&v=)([a-zA-Z0-9_-]{11})/);
  const videoId = videoIdMatch ? videoIdMatch[0] : null;

  if (!videoId) {
    return res.status(400).json({ error: "Invalid URL type" });
  }

  try {
    const videoDetails = await youtubeService.getVideoDetails(videoId);
    const similarVideos = await youtubeService.searchSimilarVideos(
      videoDetails,
      videoId
    );
    res.json(similarVideos);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
}

module.exports = {
  getSimilarVideos,
};
