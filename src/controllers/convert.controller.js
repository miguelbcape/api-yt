import puppeteer from 'puppeteer';
import idYT from '../models/idyt.model.js';
import { CONVERT_URL, TIME_CONVERT } from '../libs/config.js';
import { convertError, convertSuccess} from '../libs/functions.js';
import { connectRedis } from '../libs/database.js';

export const convertApi = async (req, res) => {
  const { id } = req.query;
  const error = convertError('error converting');
  const errorDb = (message) => convertError(message);
  
  if(!id) return res.json(error);

  const idFound = await idYT.findOne({ id_yt: id });
  if (idFound) return res.json(errorDb(idFound.option));

  try {
    const client = await connectRedis();

    // read cache
    const cacheName = `download_${id}`;
    const value = await client.get(cacheName);
    if (value) return res.json(JSON.parse(value));
    // read cache

    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(CONVERT_URL);
    await page.type("#url", `https://www.youtube.com/watch?v=${id}`);
    await page.click('input[type="submit"]');
    await page.waitForSelector("form div:nth-of-type(2) a");
  
    // Obtiene el titulo del video
    const titleId = await page.evaluate(() => {
      const title = document.querySelector("form div:nth-of-type(1)");
      return title.textContent;
    });
  
    // Obtiene el atributo href del enlace
    const downloadLink = await page.evaluate(() => {
      const link = document.querySelector("form div:nth-of-type(2) a");
      return link.href;
    });

    await browser.close();

    const result = convertSuccess(titleId, downloadLink);

    // insert cache
    const payload = JSON.stringify(result);
    await client.set(cacheName, payload);
    await client.expire(cacheName, TIME_CONVERT);
    // insert cache

    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.json(error);
  }
};
