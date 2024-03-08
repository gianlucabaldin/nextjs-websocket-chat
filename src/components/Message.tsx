import React from "react";
import { IMessage } from "../types/types";
import { formatDateTime, getIntials } from "../utils/common";

interface MessageProps {
  msg: IMessage;
  isMe: boolean;
}

const Message: React.FC<MessageProps> = ({ msg, isMe }) => {
  const updatedAt =
    msg.updatedAt?.length && msg.updatedAt !== msg.createdAt
      ? " - edited at " + formatDateTime(msg.updatedAt)
      : "";
  const isDeleted = !!msg.deletedAt;

  return (
    <li className={`flex flex-col mt-4`}>
      <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
        <span className="italic">
          {msg.username} @ {formatDateTime(msg.createdAt)}{" "}
          {!isDeleted && updatedAt}
        </span>
      </div>
      <div
        className={`flex items-center ${
          isMe ? "justify-end" : "justify-start"
        }`}
      >
        <div className={`${isMe ? "order-2" : "order-1"} `}>
          <div
            className={`flex justify-center items-center uppercase font-light size-10 rounded-full bg-gray-200`}
          >
            {getIntials(msg.username)}
          </div>
        </div>
        <div
          className={`py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white ${
            isMe ? "mr-2 order-1" : "ml-2 order-2"
          } ${isDeleted ? "line-through" : ""}`}
        >
          {isDeleted ? "message deleted" : msg.text}
        </div>
      </div>
    </li>
  );
};

export default Message;
