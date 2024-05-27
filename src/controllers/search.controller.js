import youtube from 'yt-api-search';
import { TIME_SEARCH } from '../libs/config.js';
import { connectRedis } from '../libs/database.js';
import { cleanString, searchError, searchSuccess } from '../libs/functions.js';

const yt = new youtube.default();

export const searchApi = async (req, res) => {
  const { query, lang } = req.query;
  const search = cleanString(query);
  const language = lang !== undefined && lang !== null ? lang : 'en';

  try {
    const client = await connectRedis();

    // read cache
    const cacheName = `result_${language}_${search}`;
    const value = await client.get(cacheName);
    if (value) return res.json(JSON.parse(value));
    //read cache

    const { videos } = await yt.search(search, { language });
    const results = searchSuccess(videos);

    // insert cache
    const payload = JSON.stringify({ results });
    await client.set(cacheName, payload);
    await client.expire(cacheName, TIME_SEARCH);
    // insert cache

    return res.status(200).json({ results });
  } catch (error) {
    const notFound = searchError(500, req.query.query);
    return res.status(500).json(notFound);
  }
};
