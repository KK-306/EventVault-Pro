import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCalendarAlt,
  FaImages,
  FaMapMarkerAlt,
} from "react-icons/fa";
import EventGallery from "../../components/gallery/EventGallery";
import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import StatsCard from "../../components/dashboard/StatsCard";
import { fetchEvents } from "../../features/events/eventSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    events,
    loading,
  } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents({
      status: "approved",
      limit: 12,
    }));
  }, [dispatch]);

  const approvedEvents = useMemo(() => (
    events.filter((event) => event.status === "approved")
  ), [events]);

  const locations = new Set(approvedEvents.map((event) => event.location)).size;

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Viewer Portal"
        title="Discover Approved Events"
        description="Read-only access to live events curated by your organization."
        actions={<Link className="button primary" to="/viewer/events">Open Gallery</Link>}
      />

      <section className="metric-grid">
        <StatsCard icon={<FaCalendarAlt />} label="Approved Events" value={approvedEvents.length} helper="Available to view" />
        <StatsCard icon={<FaMapMarkerAlt />} label="Locations" value={locations} helper="Unique venues" tone="green" />
        <StatsCard icon={<FaImages />} label="Gallery Mode" value="Read Only" helper="Viewer-safe access" tone="purple" />
      </section>

      {loading ? (
        <Loader label="Loading viewer dashboard" />
      ) : (
        <EventGallery events={approvedEvents.slice(0, 6)} />
      )}
    </div>
  );
};

export default Dashboard;
