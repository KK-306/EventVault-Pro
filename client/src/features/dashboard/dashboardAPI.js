import API from "../../api/axios";

export const getDashboardOverview = async () => {
  const [analytics, activity, events] = await Promise.all([
    API.get("/analytics/dashboard"),
    API.get("/activity"),
    API.get("/events", {
      params: {
        limit: 5,
      },
    }),
  ]);

  return {
    analytics: analytics.data.analytics,
    activity: activity.data.logs || [],
    recentEvents: events.data.events || [],
  };
};
