import React, { useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

const ChatBox = () => {
  const [name, setName] = useState("");

  const [messages, setMessages] = useState([
    { author: "Bob", text: "Hi there!" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        author: name,
        text: newMessage,
      };

      // Update the local state with the new message using the functional form
      setMessages((prevMessages) => [...prevMessages, messageData]);

      // Emit the message to the server
      socket.emit("chat-message", messageData);

      // Clear the input field
      setNewMessage("");
    }
  };

  socket.on("chat-message", ({ author, text }) => {
    console.log("Received message from server!");
    setMessages([...messages, { author, text }]);
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="mb-4">
        <label className="text-white">Enter your name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:border-blue-500 text-black"
        />
      </div>
      <div className="border p-6 rounded-lg w-1/2 h-1/2 flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded ${
                message.author === name ? "bg-blue-500" : "bg-gray-500"
              }`}
            >
              <div className="font-bold text-white">{message.author}</div>
              <div className="text-white">{message.text}</div>
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-l focus:outline-none focus:border-blue-500 text-black"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
