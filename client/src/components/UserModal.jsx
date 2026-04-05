import { useActionState, useRef, useEffect } from "react";
import axios from "axios";

export default function UserModal({ user, onUserUpdated, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const [state, dispatchAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get("name");
      const email = formData.get("email");

      await axios.put(`http://localhost:3001/api/users/${user.id}`, {
        name,
        email,
      });
      await onUserUpdated();
      onClose();

      return { error: null };
    },
    { error: null },
  );

  return (
    <dialog ref={dialogRef}>
      <h2>Edit User</h2>
      <form action={dispatchAction}>
        <input name="name" defaultValue={user.name} required />
        <input name="email" defaultValue={user.email} required />
        <button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
      {state.error && <p>{state.error}</p>}
    </dialog>
  );
}
