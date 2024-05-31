export const PORT = 3000;
export const TIME_SEARCH = 120; // 2 minutos
export const TIME_CONVERT = 300; // 5 minutos
export const CONVERT_URL = process.env.CONVERT_URL;

export const ROOT_URL = process.env.ROOT_URL;
export const URL_DOWN = ROOT_URL + '/yt/download?link=';
export const PASSWORD = process.env.PASSWORD;
export const DELIMITER = process.env.DELIMITER;

export const URL_REDIS = process.env.URL_REDIS;
export const URL_MONGO = process.env.URL_MONGO;

// SEGURITY
export const SECRET_KEY = process.env.SECRET_KEY;
export const ENCRYPTION_KEY = SECRET_KEY ? btoa(SECRET_KEY) : '';