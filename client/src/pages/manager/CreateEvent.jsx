import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EventForm from "../../components/forms/EventForm";
import PageHeader from "../../components/common/PageHeader";
import {
  createEvent,
  uploadEventImage,
} from "../../features/events/eventSlice";
import { pushToast } from "../../features/ui/uiSlice";

const CreateEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    saving,
    uploadLoading,
  } = useSelector((state) => state.events);

  const handleSubmit = async (eventData) => {
    await dispatch(createEvent(eventData)).unwrap();
    dispatch(pushToast({
      title: "Event submitted",
      message: "Your event is waiting for admin approval.",
      type: "success",
    }));
    navigate("/manager/events");
  };

  const handleUpload = async (file) => {
    const result = await dispatch(uploadEventImage(file)).unwrap();
    return result.imageUrl;
  };

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Manager Workflow"
        title="Create Event"
        description="Submit a well-structured event for admin approval."
      />

      <div className="panel-card">
        <EventForm
          loading={saving}
          uploadLoading={uploadLoading}
          onSubmit={handleSubmit}
          onUploadImage={handleUpload}
          submitLabel="Submit Event"
        />
      </div>
    </div>
  );
};

export default CreateEvent;
