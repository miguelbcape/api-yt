import jwt from 'jsonwebtoken';
import { PASSWORD } from "./config.js";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
        payload,
        PASSWORD,
        {
          expiresIn: '1d',
        },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        }
      );
  })
}
