import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserTie,
} from "react-icons/fa";
import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import { fetchEventById } from "../../features/events/eventSlice";
import { formatDate } from "../../utils/formatters";

const EventDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    loading,
    selectedEvent,
  } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [dispatch, id]);

  if (loading && !selectedEvent) {
    return <Loader label="Loading event details" />;
  }

  if (!selectedEvent) {
    return (
      <div className="page-stack">
        <PageHeader title="Event not found" />
        <Link className="button secondary" to="/viewer/events">Back to Gallery</Link>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow={selectedEvent.category}
        title={selectedEvent.title}
        description={selectedEvent.description}
        actions={<StatusBadge value={selectedEvent.status} />}
      />

      <article className="detail-hero">
        {selectedEvent.bannerImage ? (
          <img src={selectedEvent.bannerImage} alt={selectedEvent.title} />
        ) : (
          <div className="media-fallback">{selectedEvent.category}</div>
        )}
      </article>

      <section className="detail-grid">
        <div className="panel-card">
          <div className="card-heading">
            <h3>Event Details</h3>
            <span>Read-only view</span>
          </div>

          <div className="detail-list">
            <span><FaCalendarAlt /> {formatDate(selectedEvent.eventDate)}</span>
            <span><FaMapMarkerAlt /> {selectedEvent.location}</span>
            <span><FaUserTie /> {selectedEvent.organizer}</span>
          </div>
        </div>

        <div className="panel-card">
          <div className="card-heading">
            <h3>Access Notice</h3>
            <span>Viewer permission</span>
          </div>
          <p>
            This role can inspect approved events but cannot create, edit,
            approve, or delete platform records.
          </p>
        </div>
      </section>
    </div>
  );
};

export default EventDetails;
