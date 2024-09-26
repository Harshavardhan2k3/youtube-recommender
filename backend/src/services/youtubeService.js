const youtube = require('../config/youtube');
const thumbnailUtil = require('../utils/thumbnailUtil');

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

async function searchSimilarVideos(videoDetails, originalVideoId) {
  const keywords = videoDetails.tags
    ? videoDetails.tags.slice(0, 2).join(" ")
    : "";

  const queries = [
    videoDetails.title,
    `${videoDetails.title} ${keywords}`,
    // `${keywords}`,
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
        thumbnail: thumbnailUtil.getHighestQualityThumbnail(details.thumbnails),
        title: details.title,
        views: parseInt(details.views, 10),
      };
    })
  );

  return similarVideos
    .filter((video) => video.videoId !== originalVideoId)
    .slice(0, 5);
}

module.exports = {
  getVideoDetails,
  searchSimilarVideos
};