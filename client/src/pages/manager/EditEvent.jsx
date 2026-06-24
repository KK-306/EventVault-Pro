import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import EventForm from "../../components/forms/EventForm";
import {
  fetchEventById,
  updateEvent,
  uploadEventImage,
} from "../../features/events/eventSlice";
import { pushToast } from "../../features/ui/uiSlice";

const EditEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    loading,
    saving,
    selectedEvent,
    uploadLoading,
  } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [dispatch, id]);

  const handleSubmit = async (eventData) => {
    await dispatch(updateEvent({
      id,
      eventData,
    })).unwrap();
    dispatch(pushToast({
      title: "Event updated",
      message: "Your event changes have been saved.",
      type: "success",
    }));
    navigate("/manager/events");
  };

  const handleUpload = async (file) => {
    const result = await dispatch(uploadEventImage(file)).unwrap();
    return result.imageUrl;
  };

  if (loading && !selectedEvent) {
    return <Loader label="Loading event" />;
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Manager Workflow"
        title="Edit Event"
        description="Refine event details before or after review."
      />

      <div className="panel-card">
        <EventForm
          initialData={selectedEvent}
          loading={saving}
          uploadLoading={uploadLoading}
          onSubmit={handleSubmit}
          onUploadImage={handleUpload}
          submitLabel="Update Event"
        />
      </div>
    </div>
  );
};

export default EditEvent;
