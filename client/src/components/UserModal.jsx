import { useRef, useEffect, useState } from "react";
import axios from "axios";

export default function UserModal({ user, onUserUpdated, onClose }) {
  const dialogRef = useRef(null);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);
    try {
      await axios.put(`/apps/db-app/api/users/user.php?id=${user.id}`, { name, email });
      await onUserUpdated();
      onClose();
    } catch (err) {
      setError("Failed to update user.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <dialog ref={dialogRef}>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
      {error && <p>{error}</p>}
    </dialog>
  );
}
