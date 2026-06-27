function ChatInput({
  message,
  setMessage,
  sendMessage,
}) {
  return (
    <div className="chat-input-box">

      <input
        type="text"
        placeholder="Ask anything about the company..."
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />

      <button onClick={sendMessage}>
        Send
      </button>

    </div>
  );
}

export default ChatInput;