import axios from 'axios';
import { DELIMITER } from '../libs/config.js';
import { desOfuscate, downloadError } from '../libs/functions.js';

export const downloadApi = async (req, res) => {
  const { link } = req.query;
  const decrypt = desOfuscate(link);
  const ex = decrypt.split(DELIMITER);

  try {
    const [title, url] = ex;
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    res.set('Content-Disposition', `attachment; filename="${title}"`);
    res.set('Content-Type', 'audio/mpeg');
    response.data.pipe(res);
  } catch (err) {
    const error = downloadError('Internal Server Error');
    res.status(500).json(error);
  }
};
