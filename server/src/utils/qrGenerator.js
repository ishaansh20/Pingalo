import QRCode from "qrcode";

export const generateQRCode = async (url) => {
  try {
    const qr = await QRCode.toDataURL(url);
    return qr;
  } catch (error) {
    console.error("Error generating QR code:", error.message);
    return null;
  }
};
