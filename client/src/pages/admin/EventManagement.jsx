import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCheck,
  FaEdit,
  FaPlus,
  FaSearch,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import EventForm from "../../components/forms/EventForm";
import { eventCategories } from "../../constants/eventCategories";
import {
  approveEvent,
  createEvent,
  deleteEvent,
  fetchEvents,
  rejectEvent,
  setEventFilters,
  updateEvent,
  uploadEventImage,
} from "../../features/events/eventSlice";
import { pushToast } from "../../features/ui/uiSlice";
import { formatDate } from "../../utils/formatters";

const EventManagement = () => {
  const dispatch = useDispatch();
  const {
    error,
    events,
    filters,
    loading,
    pagination,
    saving,
    uploadLoading,
  } = useSelector((state) => state.events);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents(filters));
  }, [dispatch, filters]);

  const hasEvents = useMemo(() => events.length > 0, [events.length]);

  const openCreate = () => {
    setEditingEvent(null);
    setModalOpen(true);
  };

  const openEdit = (event) => {
    setEditingEvent(event);
    setModalOpen(true);
  };

  const handleSubmit = async (eventData) => {
    if (editingEvent) {
      await dispatch(updateEvent({
        id: editingEvent._id,
        eventData,
      })).unwrap();
    } else {
      await dispatch(createEvent(eventData)).unwrap();
    }

    dispatch(pushToast({
      title: editingEvent ? "Event updated" : "Event created",
      message: "The event workspace is now in sync.",
      type: "success",
    }));
    setModalOpen(false);
    setEditingEvent(null);
  };

  const handleUpload = async (file) => {
    const result = await dispatch(uploadEventImage(file)).unwrap();
    return result.imageUrl;
  };

  const handleApprove = async (id) => {
    await dispatch(approveEvent(id)).unwrap();
    dispatch(pushToast({
      title: "Event approved",
      message: "Viewers can now discover this event.",
      type: "success",
    }));
  };

  const handleReject = async (id) => {
    await dispatch(rejectEvent(id)).unwrap();
    dispatch(pushToast({
      title: "Event rejected",
      message: "The event has been marked for revision.",
      type: "info",
    }));
  };

  const handleDelete = async (id) => {
    await dispatch(deleteEvent(id)).unwrap();
    dispatch(pushToast({
      title: "Event deleted",
      message: "The event was removed from the platform.",
      type: "success",
    }));
  };

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Event Operations"
        title="Manage Event Pipeline"
        description="Create, update, approve, reject, and retire events from a single control surface."
        actions={(
          <button className="button primary" type="button" onClick={openCreate}>
            <FaPlus /> New Event
          </button>
        )}
      />

      <div className="filter-bar">
        <label className="field search-field">
          <span>Search</span>
          <div className="input-with-icon">
            <FaSearch />
            <input
              value={filters.search}
              placeholder="Search by title"
              onChange={(event) => dispatch(setEventFilters({
                search: event.target.value,
                page: 1,
              }))}
            />
          </div>
        </label>

        <label className="field">
          <span>Category</span>
          <select
            value={filters.category}
            onChange={(event) => dispatch(setEventFilters({
              category: event.target.value,
              page: 1,
            }))}
          >
            <option value="">All categories</option>
            {eventCategories.map((category) => (
              <option value={category} key={category}>{category}</option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Status</span>
          <select
            value={filters.status}
            onChange={(event) => dispatch(setEventFilters({
              status: event.target.value,
              page: 1,
            }))}
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
      </div>

      {error && <div className="alert error">{error}</div>}
      {loading && <Loader label="Loading events" />}

      {!loading && !hasEvents ? (
        <EmptyState
          title="No events match this view"
          description="Create a new event or adjust your filters."
          action={(
            <button className="button primary" type="button" onClick={openCreate}>
              <FaPlus /> Create Event
            </button>
          )}
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
                <th>Owner</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>
                    <strong>{event.title}</strong>
                    <span>{event.location}</span>
                  </td>
                  <td>{event.category}</td>
                  <td>{formatDate(event.eventDate)}</td>
                  <td><StatusBadge value={event.status} /></td>
                  <td>{event.createdBy?.name || "Admin"}</td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-button" type="button" onClick={() => openEdit(event)} aria-label="Edit event">
                        <FaEdit />
                      </button>
                      <button className="icon-button success" type="button" onClick={() => handleApprove(event._id)} aria-label="Approve event">
                        <FaCheck />
                      </button>
                      <button className="icon-button warning" type="button" onClick={() => handleReject(event._id)} aria-label="Reject event">
                        <FaTimes />
                      </button>
                      <button className="icon-button danger" type="button" onClick={() => handleDelete(event._id)} aria-label="Delete event">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="table-footer">
            <span>
              Page {pagination.currentPage} of {pagination.totalPages} · {pagination.totalEvents} events
            </span>
          </div>
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingEvent ? "Edit Event" : "Create Event"}
        size="large"
      >
        <EventForm
          initialData={editingEvent}
          loading={saving}
          uploadLoading={uploadLoading}
          onSubmit={handleSubmit}
          onUploadImage={handleUpload}
          submitLabel={editingEvent ? "Update Event" : "Create Event"}
        />
      </Modal>
    </div>
  );
};

export default EventManagement;
