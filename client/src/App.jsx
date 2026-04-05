import { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import UserModal from "./components/UserModal";

const API = "/apps/db-app/api/users/index.php";

export default function App() {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/apps/db-app/api/users/user.php?id=${id}`);
    await fetchUsers();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  return (
    <div>
      <h1>Users</h1>
      <UserForm onUserAdded={fetchUsers} />
      <UserList users={users} onDelete={handleDelete} onEdit={handleEdit} />
      {modalOpen && selectedUser && (
        <UserModal
          user={selectedUser}
          onUserUpdated={fetchUsers}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
