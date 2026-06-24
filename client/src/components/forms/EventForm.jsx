import { useState } from "react";
import ImageUploader from "../gallery/ImageUploader";
import { eventCategories } from "../../constants/eventCategories";

const emptyEvent = {
  title: "",
  description: "",
  category: "Workshop",
  location: "",
  eventDate: "",
  organizer: "",
  bannerImage: "",
};

const toDateInput = (value) => {
  if (!value) {
    return "";
  }

  return new Date(value).toISOString().slice(0, 10);
};

const getInitialFormData = (initialData) => {
  if (!initialData) {
    return emptyEvent;
  }

  return {
    title: initialData.title || "",
    description: initialData.description || "",
    category: initialData.category || "Workshop",
    location: initialData.location || "",
    eventDate: toDateInput(initialData.eventDate),
    organizer: initialData.organizer || "",
    bannerImage: initialData.bannerImage || "",
  };
};

const EventFormFields = ({
  initialData,
  loading,
  uploadLoading,
  onSubmit,
  onUploadImage,
  submitLabel = "Save Event",
}) => {
  const [formData, setFormData] = useState(() => getInitialFormData(initialData));

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleUpload = async (file) => {
    const imageUrl = await onUploadImage(file);

    if (imageUrl) {
      setFormData((current) => ({
        ...current,
        bannerImage: imageUrl,
      }));
    }

    return imageUrl;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <label className="field span-2">
        <span>Event title</span>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="AI Leadership Summit"
          required
        />
      </label>

      <label className="field">
        <span>Category</span>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          {eventCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Date</span>
        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          required
        />
      </label>

      <label className="field">
        <span>Location</span>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Main Auditorium"
          required
        />
      </label>

      <label className="field">
        <span>Organizer</span>
        <input
          name="organizer"
          value={formData.organizer}
          onChange={handleChange}
          placeholder="Placement Cell"
          required
        />
      </label>

      <label className="field span-2">
        <span>Description</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the event objective, audience, and outcomes."
          rows="4"
          required
        />
      </label>

      <div className="span-2">
        <ImageUploader
          currentImage={formData.bannerImage}
          loading={uploadLoading}
          onUpload={handleUpload}
        />
      </div>

      <div className="form-actions span-2">
        <button className="button primary" disabled={loading} type="submit">
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

const EventForm = (props) => {
  const formKey = props.initialData?._id || "new-event";

  return <EventFormFields key={formKey} {...props} />;
};

export default EventForm;
