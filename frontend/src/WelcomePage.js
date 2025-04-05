export default function WelcomePage({ notifications, onLogout }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Welcome!</h2>

      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-4 py-2 mb-4"
      >
        Logout
      </button>

      <h3 className="text-lg font-semibold">Notifications</h3>
      <ul className="mt-2 list-disc list-inside">
        {notifications.length === 0 ? (
          <li>No notifications yet.</li>
        ) : (
          notifications.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))
        )}
      </ul>
    </div>
  );
}

