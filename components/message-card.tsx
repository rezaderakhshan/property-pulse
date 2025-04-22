"use client";

import { deleteMessage } from "@/app/actions/delete-message";
import { MarkMessageAsRead } from "@/app/actions/mark-message-as-read";
import { useMessageContext } from "@/context/message-context";
import { useState } from "react";
import { toast } from "react-toastify";

type MessageCardProps = {
  message: {
    _id: string;
    sender: {
      _id: string;
      username: string;
    };
    recipient: string;
    property: { _id: string; name: string };
    name: string;
    email: string;
    phone: string;
    body: string;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
};
const MessageCard = ({ message }: MessageCardProps) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDelete, setIsDelete] = useState(false);
  const { setUnreadCount } = useMessageContext();
  const handleReadClick = async () => {
    const read = await MarkMessageAsRead(message._id);
    setIsRead(read);
    setUnreadCount((prev) => (read ? prev - 1 : prev + 1));
    toast.success(`Marked as ${read ? "read" : "new"}`);
  };
  const handleDeleteClick = async () => {
    await deleteMessage(message._id);
    setIsDelete(true);
    setUnreadCount((prev) => (isRead ? prev : prev - 1));
    toast.success("Message deleted");
  };

  if (isDelete) {
    return <p>Deleted message</p>;
  }

  return (
    <div className="bg-white relative p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquirey:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul>
        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt as unknown as string).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }
          )}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
      >
        {isRead ? "Mark As New" : " Mark As Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 mr-3 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
