function Conversation({ messages }) {
  if (messages.length === 0) {
    return (
      <div className="empty-chat">
        <h3>Start a conversation 👋</h3>
        <p>Ask anything about your company documents.</p>
      </div>
    );
  }

  return (
    <div className="chat-history">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={
            msg.sender === "user"
              ? "user-message"
              : "ai-message"
          }
        >
          <strong>
            {msg.sender === "user"
              ? "You"
              : "🤖 NexaBot"}
          </strong>

          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Conversation;