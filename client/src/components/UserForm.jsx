import { useState } from "react";
import axios from "axios";

const API = "/apps/db-app/api/users/index.php";

export default function UserForm({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);
    try {
      await axios.post(API, { name, email });
      setName("");
      setEmail("");
      await onUserAdded();
    } catch (err) {
      setError("Failed to add user.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add User"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
