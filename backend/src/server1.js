const express = require("express");
const { google } = require("googleapis");
require("dotenv").config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const youtube = google.youtube({
  version: "v3",
  auth: process.env.API_KEY,
});

async function getVideoDetails(videoId) {
  const response = await youtube.videos.list({
    part: "snippet,statistics",
    id: videoId,
  });

  const videoInfo = response.data.items[0];
  return {
    id: videoId,
    title: videoInfo.snippet.title,
    views: videoInfo.statistics.viewCount,
    thumbnails: videoInfo.snippet.thumbnails,
  };
}

function getHighestQualityThumbnail(thumbnails) {
  const qualityOrder = ["maxres", "standard", "high", "medium", "default"];
  for (const quality of qualityOrder) {
    if (thumbnails[quality]) {
      return thumbnails[quality].url;
    }
  }
  return null; 
}

async function searchSimilarVideos(videoDetails, originalVideoId) {
  const keywords = videoDetails.tags
    ? videoDetails.tags.slice(0, 2).join(" ")
    : "";

  const queries = [
    videoDetails.title,
    `${videoDetails.title} ${keywords}`,
    `${keywords}`,
    `${videoDetails.title} trending`,
    `${videoDetails.title} new`,
  ];

  const randomQuery = queries[Math.floor(Math.random() * queries.length)];

  const searchResponse = await youtube.search.list({
    q: randomQuery,
    type: "video",
    part: "id",
    maxResults: 10, 
  });

  const similarVideos = await Promise.all(
    searchResponse.data.items.map(async (item) => {
      const videoId = item.id.videoId;
      const details = await getVideoDetails(videoId);
      return {
        videoId: videoId,
        videoURL: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail: getHighestQualityThumbnail(details.thumbnails),
        title: details.title,
        views: parseInt(details.views, 10),
      };
    })
  );

  
  return similarVideos
    .filter((video) => video.videoId !== originalVideoId)
    .slice(0, 5);
}

app.post("/get-similar-videos", async (req, res) => {
  const { videoUrl } = req.body;
  const videoId = new URL(videoUrl).searchParams.get("v");

  if (!videoId) {
    return res.status(400).json({ error: "Invalid URL type" });
  }

  try {
    const videoDetails = await getVideoDetails(videoId);
    const similarVideos = await searchSimilarVideos(videoDetails, videoId);
    res.json(similarVideos);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
