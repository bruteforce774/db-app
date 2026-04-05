import { useState, useEffect, useActionState } from "react";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3001/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const [state, dispatchAction, isPending] = useActionState(async (prevState, formData) => {
    const name = formData.get("name");
    const email = formData.get("email");

    await axios.post("http://localhost:3001/api/users", { name, email });
    await fetchUsers();

    return { error: null };
  }, {error: null });

  return (
    <div>
      <h1>Users</h1>

      <form action={dispatchAction}>
        <input name="name" placeholder="Name" required />
        <input name="email" placeholder="Email" required />
        <button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add User"}
        </button>
        {state.error && <p>{state.error}</p>}
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}
