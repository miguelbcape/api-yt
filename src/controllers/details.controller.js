import Youtube from 'youtube-stream-url';
import { formatTime, searchError } from '../libs/functions.js';

export const detailsApi = async (req, res) => {
  const { id } = req.query;

  try {
    const { videoDetails, formats } = await Youtube.getInfo({
      url: `https://www.youtube.com/watch?v=${id}`,
    });

    const filteredFormats = formats.filter(format => format.itag === 18 || format.itag === 22);

    const details = {
      id: videoDetails.videoId,
      title: videoDetails.title,
      duration: formatTime(videoDetails.lengthSeconds),
      keywords: videoDetails.keywords,
      description: videoDetails.shortDescription,
      thumbnail: videoDetails.thumbnail.thumbnails.pop().url,
      views: videoDetails.viewCount,
      author: videoDetails.author,
      formats: filteredFormats.map(format => ({
        itag: format.itag,
        url: format.url,
        quality: format.qualityLabel
      }))
    };

    return res.status(200).json(details);
  } catch (error) {
    const notFound = searchError(500, req.query.query);
    return res.status(500).json(notFound);
  }
};
