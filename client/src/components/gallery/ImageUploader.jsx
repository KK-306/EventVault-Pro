import { useRef, useState } from "react";
import { FaCloudUploadAlt, FaImage } from "react-icons/fa";

const ImageUploader = ({
  currentImage,
  disabled,
  loading,
  onUpload,
}) => {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(currentImage || "");

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setPreview(URL.createObjectURL(file));

    if (onUpload) {
      const imageUrl = await onUpload(file);
      if (imageUrl) {
        setPreview(imageUrl);
      }
    }
  };

  return (
    <div className="image-uploader">
      <div className="image-preview">
        {preview ? (
          <img src={preview} alt="Event preview" />
        ) : (
          <FaImage />
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled || loading}
      />

      <button
        type="button"
        className="button secondary"
        disabled={disabled || loading}
        onClick={() => fileRef.current?.click()}
      >
        <FaCloudUploadAlt />
        {loading ? "Uploading..." : "Upload banner"}
      </button>
    </div>
  );
};

export default ImageUploader;
