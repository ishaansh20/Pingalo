import { createUrlService } from "../services/url.service.js";
import Url from "../models/Url.model.js";

export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, expiresAt } = req.body;
    const result = await createUrlService(originalUrl, expiresAt, req.user._id);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getMyUrls = async (req, res) => {
  try {
    const urls = await Url.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch URLs" });
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;

    const url = await Url.findOne({
      _id: id,
      user: req.user._id, // ensure user owns the URL
    });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    await url.deleteOne();

    res.json({ message: "URL deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
