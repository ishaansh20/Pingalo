import Click from "../models/Click.model.js";
import geoip from "geoip-lite";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const UAParser = require("ua-parser-js");

export const logClickAnalytics = async (shortCode, req) => {
  try {
    const ip = req.ip || req.connection.remoteAddress;

    const geo = geoip.lookup(ip) || {};
    const parser = new UAParser(req.headers["user-agent"]);
    const uaData = parser.getResult();

    await Click.create({
      shortCode,
      ipAddress: ip,
      country: geo?.country || "Unknown",
      userAgent: uaData.browser.name || "Unknown",
    });
  } catch (error) {
    console.error("Analytics logging failed", error.message);
  }
};

export const getAnalyticsByShortCode = async (shortCode) => {
  const totalClicks = await Click.countDocuments({ shortCode });

  const countryStats = await Click.aggregate([
    { $match: { shortCode } },
    { $group: { _id: "$country", count: { $sum: 1 } } },
  ]);
  const deviceStats = await Click.aggregate([
    { $match: { shortCode } },
    { $group: { _id: "$userAgent", count: { $sum: 1 } } },
  ]);

  const clicksByDay = await Click.aggregate([
    { $match: { shortCode } },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return {
    totalClicks,
    countryStats,
    deviceStats,
    clicksByDay,
  };
};
