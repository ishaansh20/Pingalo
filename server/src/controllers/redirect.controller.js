import { redirectService } from "../services/redirect.service.js";

export const redirectToOriginalUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const originalUrl = await redirectService(shortCode, req);
    return res.redirect(originalUrl);
  } catch (error) {
    if (error.message === "Short URL not found") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Short URL has expired") {
      return res.status(410).json({ message: error.message });
    }
    return res.status(500).json({ message: "Server error" });
  }
};
