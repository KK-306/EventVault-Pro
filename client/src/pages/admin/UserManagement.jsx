import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaEdit,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../features/users/userSlice";
import { pushToast } from "../../features/ui/uiSlice";
import { formatDate } from "../../utils/formatters";
import { getRoleLabel } from "../../utils/roleRoutes";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  role: "viewer",
  adminSecretKey: "",
};

const UserManagement = () => {
  const dispatch = useDispatch();
  const {
    error,
    loading,
    saving,
    users,
  } = useSelector((state) => state.users);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => (
    users.filter((user) => {
      const matchesQuery = [user.name, user.email]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesRole = role ? user.role === role : true;

      return matchesQuery && matchesRole;
    })
  ), [query, role, users]);

  const openCreate = () => {
    setEditingUser(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "viewer",
      adminSecretKey: "",
    });
    setModalOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => {
      const nextState = {
        ...current,
        [name]: value,
      };

      if (name === "role" && value !== "admin") {
        nextState.adminSecretKey = "";
      }

      return nextState;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editingUser) {
      const payload = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };
      const result = await dispatch(updateUser({
        id: editingUser._id,
        userData: payload,
      })).unwrap();

      dispatch(pushToast({
        title: "User updated",
        message: result.message || "User details updated.",
        type: "success",
      }));
    } else {
      const result = await dispatch(createUser(formData)).unwrap();

      dispatch(pushToast({
        title: "User created",
        message: result.message || "User created successfully.",
        type: "success",
      }));
    }
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteUser(id)).unwrap();
    dispatch(pushToast({
      title: "User deleted",
      message: "The account has been removed.",
      type: "success",
    }));
  };

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Identity and Access"
        title="User Management"
        description="Create users, update roles, suspend access, and keep RBAC assignments clear."
        actions={(
          <button className="button primary" type="button" onClick={openCreate}>
            <FaPlus /> New User
          </button>
        )}
      />

      <div className="filter-bar">
        <label className="field search-field">
          <span>Search</span>
          <div className="input-with-icon">
            <FaSearch />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search users"
            />
          </div>
        </label>

        <label className="field">
          <span>Role</span>
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="">All roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="viewer">Viewer</option>
          </select>
        </label>
      </div>

      {error && <div className="alert error">{error}</div>}
      {loading && <Loader label="Loading users" />}

      {!loading && filteredUsers.length === 0 ? (
        <EmptyState
          title="No users found"
          description="Create a user or adjust your filters."
        />
      ) : (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </td>
                  <td>{getRoleLabel(user.role)}</td>
                  <td><StatusBadge value={user.status} /></td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-button" type="button" onClick={() => openEdit(user)} aria-label="Edit user">
                        <FaEdit />
                      </button>
                      <button className="icon-button danger" type="button" onClick={() => handleDelete(user._id)} aria-label="Delete user">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingUser ? "Edit User" : "Create User"}
      >
        <form className="stack-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Name</span>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </label>

          <label className="field">
            <span>Email</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>

          {!editingUser && (
            <label className="field">
              <span>Password</span>
              <input type="password" name="password" value={formData.password} onChange={handleChange} minLength="6" required />
            </label>
          )}

          <label className="field">
            <span>Role</span>
            <select name="role" value={formData.role} onChange={handleChange}>
              {editingUser?.role === "admin" ? (
                <option value="admin">Admin</option>
              ) : null}
              {!editingUser && <option value="admin">Admin</option>}
              <option value="manager">Manager</option>
              <option value="viewer">Viewer</option>
            </select>
          </label>

          {!editingUser && formData.role === "admin" && (
            <label className="field">
              <span>Admin Secret Key</span>
              <input
                type="password"
                name="adminSecretKey"
                value={formData.adminSecretKey}
                onChange={handleChange}
                required
              />
            </label>
          )}

          <button className="button primary" disabled={saving} type="submit">
            {saving ? "Saving..." : "Save User"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement;
