import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCalendarPlus,
  FaCheckCircle,
  FaClock,
  FaEdit,
} from "react-icons/fa";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import StatsCard from "../../components/dashboard/StatsCard";
import { fetchEvents } from "../../features/events/eventSlice";
import { formatDate } from "../../utils/formatters";
import { isOwnEvent } from "../../utils/permissions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    events,
    loading,
  } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents({
      limit: 20,
    }));
  }, [dispatch]);

  const myEvents = useMemo(() => (
    events.filter((event) => isOwnEvent(event, user))
  ), [events, user]);

  const approved = myEvents.filter((event) => event.status === "approved").length;
  const pending = myEvents.filter((event) => event.status === "pending").length;

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Manager Workspace"
        title="Your Event Pipeline"
        description="Create polished event submissions and track their approval progress."
        actions={(
          <Link className="button primary" to="/manager/events/new">
            <FaCalendarPlus /> Create Event
          </Link>
        )}
      />

      <section className="metric-grid">
        <StatsCard icon={<FaEdit />} label="My Events" value={myEvents.length} helper="Owned submissions" />
        <StatsCard icon={<FaClock />} label="Pending" value={pending} helper="Awaiting admin review" tone="amber" />
        <StatsCard icon={<FaCheckCircle />} label="Approved" value={approved} helper="Live for viewers" tone="green" />
      </section>

      <div className="panel-card">
        <div className="card-heading">
          <h3>Recent Submissions</h3>
          <span>Manager-owned events</span>
        </div>

        {loading ? (
          <Loader label="Loading manager events" />
        ) : myEvents.length === 0 ? (
          <EmptyState
            title="No manager events yet"
            description="Create your first event and send it into the approval workflow."
            action={<Link className="button primary" to="/manager/events/new">Create Event</Link>}
          />
        ) : (
          <div className="compact-list">
            {myEvents.slice(0, 6).map((event) => (
              <article className="compact-row" key={event._id}>
                <div>
                  <strong>{event.title}</strong>
                  <span>{event.category} · {formatDate(event.eventDate)}</span>
                </div>
                <StatusBadge value={event.status} />
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
