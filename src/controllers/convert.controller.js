import { CONVERT_URL, TIME_CONVERT } from '../libs/config.js';
import { convertError } from '../libs/functions.js';
import { connectRedis } from '../libs/database.js';

export const convertApi = async (req, res) => {
  const { id, format } = req.query;

  const error = convertError('error converting');

  if (!id || !format) return res.json(error);

  try {
    const client = await connectRedis();

    // read cache
    const cacheName = `download_${format}_${id}`;
    const value = await client.get(cacheName);
    if (value) return res.json(JSON.parse(value));
    // read cache

    const response = await fetch(CONVERT_URL, {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        accept: '*/*',
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        Origin: 'https://youtubetomp3.sc/',
        Referer: 'https://youtubetomp3.sc/',
      },
      body: `link=https://www.youtube.com/watch?v=${id}&format=${format}`,
    });

    if (!response.ok) {
      return res.json(error);
    }

    const data = await response.json();

    // insert cache
    const payload = JSON.stringify(data);
    await client.set(cacheName, payload);
    await client.expire(cacheName, TIME_CONVERT);
    // insert cache

    res.json(data);
  } catch (err) {
    return res.json(error);
  }
};