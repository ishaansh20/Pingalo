import Url from "../models/Url.model.js";
import { logClickAnalytics } from "./analytics.service.js";

export const redirectService = async (shortCode, req) => {
  const url = await Url.findOne({ shortCode });
  if (!url) {
    throw new Error("Short URL not found");
  }
  if (url.expiresAt && url.expiresAt < new Date()) {
    throw new Error("Short URL has expired");
  }
  url.clickCount = (url.clickCount || 0) + 1;
  await url.save();
  await logClickAnalytics(shortCode, req);
  return url.originalUrl;
};
