import UsernameForm from "@/components/UsernameForm";
import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log("Connecting to WebSocket server...");
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL as string, {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    newSocket.on("message", (newMessage: string) => {
      console.log("Received message:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    setSocket(newSocket);

    // Clean up the socket connection on unmount
    return () => {
      console.log("Disconnecting from WebSocket server...");
      newSocket.disconnect();
    };
  }, []);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && socket) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  const handleUsernameSubmit = (username: string) => {
    setUsername(username);
  };

  return (
    <div>
      <h1>Chat App</h1>
      <p>username = *{username}*</p>
      {username ? (
        <>
          <div>
            {messages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>
          <form onSubmit={handleMessageSubmit}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </>
      ) : (
        <UsernameForm onSubmitUsername={handleUsernameSubmit} />
      )}
    </div>
  );
}
