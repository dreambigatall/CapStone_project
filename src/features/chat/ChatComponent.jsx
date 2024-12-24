// import { useChatWithUsers } from "./useChatWithUsers";
import { useChatWithUsers } from "./useChat";

function ChatComponent() {
  const { chatWithUsers, isLoading, error } = useChatWithUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Chat Messages</h1>
      <ul>
        {chatWithUsers?.map(chat => (
          <li key={chat.id}>
            <p>
              <strong>User:</strong> {chat.user?.email || "Unknown User"}
            </p>
            <p>
              <strong>Message:</strong> {chat.message}
            </p>
            <p>
              <strong>Timestamp:</strong> {new Date(chat.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatComponent;
