const cloudinary = require("../config/cloudinary");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const fileBase64 = req.file.buffer.toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${fileBase64}`,
      {
        folder: "eventvault",
      }
    );

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
  console.log("UPLOAD ERROR:");
  console.log(error);

  res.status(500).json({
    success: false,
    message: error.message,
    error: error,
  });
}
};