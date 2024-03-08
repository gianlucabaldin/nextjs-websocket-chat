import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { IMessage } from "../types/types";
import { generateRandomId, scrollToBottom } from "../utils/common";
import Message from "./Message";

interface ChatBoxProps {
  messages: IMessage[];
  username: string;
  socket: Socket | null;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, username, socket }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    scrollToBottom(messagesRef);
  }, [messages, messagesRef]);

  const handleSendMessage = () => {
    if (socket) {
      const newMsg: IMessage = {
        username,
        text: newMessage,
        id: generateRandomId(),
        createdAt: new Date().toISOString(),
      };
      socket.emit("message", newMsg);
      scrollToBottom(messagesRef);
      setNewMessage("");
    } else {
      console.error("Error: Socket not connected");
    }
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleOnKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <p className="flex flex-center mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Hi <span className="font-bold">{username}</span> and welcome to the
        chat!
      </p>
      <p className="flex flex-center mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Start typing a message and press enter or the button to send it to your
        friends.
      </p>
      <ul
        className="list-none h-[60vh] bg-slate-100 overflow-y-auto w-full p-4"
        ref={messagesRef}
      >
        {messages.map((msg, index) => (
          <Message isMe={msg.username === username} msg={msg} key={index} />
        ))}
      </ul>

      <div className="w-full">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-between items-center gap-x-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="newMessage"
            type="text"
            placeholder="Type your message here..."
            value={newMessage}
            onChange={handleMessageChange}
            disabled={!socket}
            onKeyUp={handleOnKeyUp}
          />

          <button
            type="button"
            onClick={handleSendMessage}
            disabled={!socket}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
