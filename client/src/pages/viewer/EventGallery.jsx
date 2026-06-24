import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventGalleryGrid from "../../components/gallery/EventGallery";
import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import { fetchEvents } from "../../features/events/eventSlice";

const EventGallery = () => {
  const dispatch = useDispatch();
  const {
    events,
    loading,
  } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents({
      status: "approved",
      limit: 50,
    }));
  }, [dispatch]);

  const approvedEvents = useMemo(() => (
    events.filter((event) => event.status === "approved")
  ), [events]);

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Read Only"
        title="Event Gallery"
        description="Browse approved events without mutation controls."
      />

      {loading ? (
        <Loader label="Loading event gallery" />
      ) : (
        <EventGalleryGrid events={approvedEvents} />
      )}
    </div>
  );
};

export default EventGallery;
