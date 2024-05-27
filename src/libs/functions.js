import CryptoJS from "crypto-js";
import { PASSWORD, URL_DOWN } from "./config.js";

// extract token
export const resolveToken = (html) => {
  if (!html) {
      return '';
  }
  let matches = html.match(/<meta name="csrf-token" content="([^"]+)">/);
  return matches ? matches[1] : '';
}

// error 404 page
export const routeError = (req, res) => {
  return res.status(404).json({
    statusCode: 404,
    message: 'Cannot GET ' + req,
    error: 'Not Found',
  });
};

// clean string query
export const cleanString = (value) => {
  const clean = value.toLowerCase().replace(' ', '-');
  return clean;
};

// model search success
export const searchSuccess = (videos) => {
  return videos.map((v) => ({
    id: v.id,
    title: v.title,
    thumbnail: v.thumbnail[0].url,
    channel: v.channel.name,
    duration: v.durations.duration_raw,
    views: v.views.view_short_text,
    uploaded: v.uploaded,
    description: v.description,
  }));
};

// model search error
export const searchError = (status, url) => {
  const error = {
    statusCode: status,
    message: 'Cannot GET ' + url,
    error: 'Not Found',
  };
  return error;
};

// model convert success
export const convertSuccess = (title, downloadUrl) => {
  const result = {
    title: title,
    downloadUrl: downloadUrl,
    status: 'ok',
    message: 'success',
    error: false,
  };
  return result;
};

// model convert error
export const convertError = (message) => {
  const result = {
    title: null,
    downloadUrl: null,
    status: 'fail',
    message: message,
    error: true,
  };
  return result;
};

// ofuscate string
export const ofuscate = (value) => {
  const encryptedValue = CryptoJS.AES.encrypt(value, PASSWORD).toString();
  return URL_DOWN + encodeURIComponent(encryptedValue);
};

// desofuscate string
export const desOfuscate = (value) => {
  const bytes = CryptoJS.AES.decrypt(value, PASSWORD);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// model download error
export const downloadError = (message) => {
  const result = {
    downloadUrl: null,
    message: message,
    error: true,
  };
  return result;
};

// convert time
export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  let formattedTime = "";
  if (hours > 0) {
    formattedTime += hours < 10 ? `0${hours}:` : `${hours}:`;
  }
  if (minutes > 0) {
    formattedTime += minutes < 10 ? `0${minutes}` : `${minutes}`;
  } else {
    formattedTime += "00";
  }
  formattedTime += `:${remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`}`;
  return formattedTime;
}