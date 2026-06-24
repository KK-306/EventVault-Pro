import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCalendarCheck,
  FaClock,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";
import ActivityTimeline from "../../components/dashboard/ActivityTimeline";
import EventChart from "../../components/dashboard/EventChart";
import RolePieChart from "../../components/dashboard/RolePieChart";
import StatsCard from "../../components/dashboard/StatsCard";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import { fetchDashboardOverview } from "../../features/dashboard/dashboardSlice";
import { formatDate } from "../../utils/formatters";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    activity,
    analytics,
    error,
    loading,
    recentEvents,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardOverview());
  }, [dispatch]);

  if (loading && !analytics) {
    return <Loader label="Loading admin dashboard" />;
  }

  const chartData = [
    {
      label: "Approved",
      value: analytics?.approvedEvents || 0,
      tone: "approved",
    },
    {
      label: "Pending",
      value: analytics?.pendingEvents || 0,
      tone: "pending",
    },
    {
      label: "Total",
      value: analytics?.totalEvents || 0,
      tone: "total",
    },
  ];

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Admin Command Center"
        title="Operational Overview"
        description="Monitor approvals, users, event volume, and audit activity from one workspace."
      />

      {error && <div className="alert error">{error}</div>}

      <section className="metric-grid">
        <StatsCard
          icon={<FaCalendarCheck />}
          label="Total Events"
          value={analytics?.totalEvents || 0}
          helper="All event records"
          tone="blue"
        />
        <StatsCard
          icon={<FaClock />}
          label="Pending Approval"
          value={analytics?.pendingEvents || 0}
          helper="Needs admin review"
          tone="amber"
        />
        <StatsCard
          icon={<FaUsers />}
          label="Total Users"
          value={analytics?.totalUsers || 0}
          helper="Across all roles"
          tone="purple"
        />
        <StatsCard
          icon={<FaClipboardList />}
          label="Activity Logs"
          value={analytics?.totalLogs || 0}
          helper="Audit events captured"
          tone="green"
        />
      </section>

      <section className="dashboard-grid">
        <EventChart data={chartData} />
        <RolePieChart
          managers={analytics?.totalManagers || 0}
          viewers={analytics?.totalViewers || 0}
        />
      </section>

      <section className="dashboard-grid wide-left">
        <div className="panel-card">
          <div className="card-heading">
            <h3>Recent Events</h3>
            <span>Latest event submissions</span>
          </div>

          {recentEvents.length === 0 ? (
            <EmptyState
              title="No event submissions"
              description="Events created by admins and managers will appear here."
            />
          ) : (
            <div className="compact-list">
              {recentEvents.map((event) => (
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

        <div className="panel-card">
          <div className="card-heading">
            <h3>Activity Feed</h3>
            <span>System audit trail</span>
          </div>
          <ActivityTimeline logs={activity} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
