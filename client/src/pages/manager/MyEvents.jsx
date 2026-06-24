import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaEdit,
  FaPlus,
} from "react-icons/fa";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import { fetchEvents } from "../../features/events/eventSlice";
import { formatDate } from "../../utils/formatters";
import { canEditEvent, isOwnEvent } from "../../utils/permissions";

const MyEvents = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    events,
    loading,
  } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents({
      limit: 50,
    }));
  }, [dispatch]);

  const myEvents = useMemo(() => (
    events.filter((event) => isOwnEvent(event, user))
  ), [events, user]);

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Event Workflow"
        title="My Events"
        description="Track owned event submissions and edit drafts before approval."
        actions={(
          <Link className="button primary" to="/manager/events/new">
            <FaPlus /> New Event
          </Link>
        )}
      />

      {loading && <Loader label="Loading your events" />}

      {!loading && myEvents.length === 0 ? (
        <EmptyState
          title="No events assigned to you"
          description="Create an event to start the approval workflow."
          action={<Link className="button primary" to="/manager/events/new">Create Event</Link>}
        />
      ) : (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myEvents.map((event) => (
                <tr key={event._id}>
                  <td>
                    <strong>{event.title}</strong>
                    <span>{event.location}</span>
                  </td>
                  <td>{event.category}</td>
                  <td>{formatDate(event.eventDate)}</td>
                  <td><StatusBadge value={event.status} /></td>
                  <td>
                    {canEditEvent(event, user) && (
                      <Link className="icon-button" to={`/manager/events/${event._id}/edit`} aria-label="Edit event">
                        <FaEdit />
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
