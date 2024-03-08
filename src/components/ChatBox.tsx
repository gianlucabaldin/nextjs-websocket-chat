import React, { useEffect, useRef } from "react";
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
  const messagesRef = useRef<HTMLUListElement>(null);
  const newMessageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom(messagesRef);
  }, [messages, messagesRef]);

  /**
   * Sends a message through the "emit" socket event
   *
   * @param {string} message - the message to be sent
   * @return {void}
   */
  const sendMessage = (message: string) => {
    if (socket) {
      const newMsg: IMessage = {
        username,
        text: message,
        id: generateRandomId(),
        createdAt: new Date().toISOString(),
      };
      socket.emit("message", newMsg);
      scrollToBottom(messagesRef);
      newMessageRef.current!.value = "";
    } else {
      console.error("Error: Socket not connected");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage = newMessageRef.current!.value;
    sendMessage(newMessage);
  };

  /**
   * A function to handle "Enter" key press
   *
   * @param {React.KeyboardEvent} event - the keyboard event
   * @return {void}
   */
  const handleOnKeyUp = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (event.key === "Enter") {
      const newMessage = newMessageRef.current!.value.trim();
      if (newMessage !== "") {
        sendMessage(newMessage);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <p className="flex flex-center mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Hi&nbsp;<span className="font-bold">{username}</span>&nbsp;and welcome
        to the chat!
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
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-between items-center gap-x-4"
          onSubmit={handleSubmit}
        >
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="newMessage"
            type="text"
            placeholder="Type your message here..."
            disabled={!socket}
            onKeyUp={handleOnKeyUp}
            ref={newMessageRef}
          />

          <button
            type="submit"
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
