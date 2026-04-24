// components/user/UserProfile.tsx

export default function UserProfile({ user }: any) {
  return (
    <div className="bg-white p-5 rounded shadow">
      <h2 className="text-xl font-bold mb-3">User Info</h2>

      <div className="grid grid-cols-2 gap-3">

        <p><b>Name:</b> {user.name || "N/A"}</p>
        <p><b>Mobile:</b> {user.mobile}</p>

        <p><b>WhatsApp:</b> {user.whatsapp || "N/A"}</p>
        <p><b>Email:</b> {user.email || "N/A"}</p>

        <p><b>Gender:</b> {user.gender || "N/A"}</p>
        <p><b>Address:</b> {user.address || "N/A"}</p>

        <p><b>Constituency:</b> {user.constituency || "N/A"}</p>
        <p><b>User ID:</b> {user.uniqueId}</p>

        <p><b>Role:</b> {user.role}</p>

        <p>
          <b>Created:</b> 
          {new Date(user.createdAt).toLocaleString("en-IN")}
        </p>

      </div>
    </div>
  );
}
