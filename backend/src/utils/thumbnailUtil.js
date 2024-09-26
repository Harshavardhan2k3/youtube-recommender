function getHighestQualityThumbnail(thumbnails) {
  const qualityOrder = ["maxres", "standard", "high", "medium", "default"];
  for (const quality of qualityOrder) {
    if (thumbnails[quality]) {
      return thumbnails[quality].url;
    }
  }
  return null; 
}

module.exports = {
  getHighestQualityThumbnail
};