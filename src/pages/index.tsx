import ChatBox from "@/components/ChatBox";
import UsernameForm from "@/components/UsernameForm";
import { IMessage } from "@/types/types";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log("Connecting to WebSocket server...");
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL as string, {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    newSocket.on("message", (newMessage: IMessage) => {
      console.log("Received message - client:", newMessage);
      setMessages((prevMessages) => [...(prevMessages ?? []), newMessage]);
    });

    setSocket(newSocket);

    // Clean up the socket connection on unmount
    return () => {
      console.log("Disconnecting from WebSocket server...");
      newSocket.disconnect();
    };
  }, []);

  const handleUsernameSubmit = (username: string) => {
    setUsername(username);
  };

  return (
    <main className="container mx-auto flex flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white py-8">
        Chat App
      </h1>

      {username ? (
        <ChatBox
          messages={messages ?? []}
          username={username}
          socket={socket}
        />
      ) : (
        <UsernameForm onSubmitUsername={handleUsernameSubmit} />
      )}
    </main>
  );
}
