import { useActionState } from "react";
import axios from "axios";

export default function UserForm({ onUserAdded }) {
  const [state, dispatchAction, isPending] = useActionState(async (prevState, formData) => {
    const name = formData.get("name");
    const email = formData.get("email");

    await axios.post("http://localhost:3001/api/users", { name, email });
    await onUserAdded();

    return { error: null };
  }, { error: null });

  return (
    <form action={dispatchAction}>
      <input name="name" placeholder="Name" required />
      <input name="email" placeholder="Email" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add User"}
      </button>
      {state.error && <p>{state.error}</p>}
    </form>
  );
}