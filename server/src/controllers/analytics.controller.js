import Url from "../models/Url.model.js";
import { getAnalyticsByShortCode } from "../services/analytics.service.js";
export const getAnalytics = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    if (url.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const data = await getAnalyticsByShortCode(shortCode);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Analytics fetch failed" });
  }
};
