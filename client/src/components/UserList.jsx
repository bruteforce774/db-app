export default function UserList({ users, onDelete, onEdit }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} — {user.email}
          <button onClick={() => onEdit(user)}>Edit</button>
          <button onClick={() => onDelete(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
