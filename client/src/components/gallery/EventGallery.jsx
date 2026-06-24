import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { formatDate } from "../../utils/formatters";
import EmptyState from "../common/EmptyState";
import StatusBadge from "../common/StatusBadge";

const EventGallery = ({ events = [], basePath = "/viewer/events" }) => {
  if (events.length === 0) {
    return (
      <EmptyState
        title="No events available"
        description="Approved events will show up here for viewers."
      />
    );
  }

  return (
    <div className="event-gallery-grid">
      {events.map((event) => (
        <Link
          className="event-card"
          to={`${basePath}/${event._id}`}
          key={event._id}
        >
          <div className="event-card-media">
            {event.bannerImage ? (
              <img src={event.bannerImage} alt={event.title} />
            ) : (
              <div className="media-fallback">{event.category || "Event"}</div>
            )}
            <StatusBadge value={event.status} />
          </div>

          <div className="event-card-body">
            <span className="eyebrow">{event.category || "General"}</span>
            <h3>{event.title}</h3>
            <p>{event.description}</p>

            <div className="event-card-meta">
              <span><FaCalendarAlt /> {formatDate(event.eventDate)}</span>
              <span><FaMapMarkerAlt /> {event.location}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EventGallery;
