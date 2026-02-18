import Url from "../models/Url.model.js";
import { nanoid } from "nanoid";
import { generateQRCode } from "../utils/qrGenerator.js";

export const createUrlService = async (originalUrl, expiresAt, userId) => {
  if (!originalUrl) {
    throw new Error("Original URL is required");
  }

  const shortCode = nanoid(7);

  const newUrl = await Url.create({
    originalUrl,
    shortCode,
    expiresAt: expiresAt || null,
    user: userId,
  });
  const shortUrl = `${process.env.BASE_URL}/${shortCode}`;
  const qrCode = await generateQRCode(shortUrl);
  return { shortUrl, qrCode };
};

export const getUserUrlsService = async (userId) => {
  const urls = await Url.find({ user: userId })
    .sort({ createdAt: -1 })
    .select("-__v");

  return urls;
};
