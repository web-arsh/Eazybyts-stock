"use client";

import DashboardLayout from "@/Component/DashboardLayout/DashboardLayout";
import Message from "@/Component/Message/Message";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Send } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";
import { io } from "socket.io-client";

export default function Page() {
  const { user } = useUser();
  const socketRef = useRef(null);

  const currentUserId = user?.id ?? "";
  const name = user?.firstName ?? "";
  const imageUrl = user?.imageUrl ?? "/";

  const [allMsg, setMessage] = useState([]);
  const containerRef = useRef(null);

  // auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [allMsg]);

  // fetch messages + init socket
  useEffect(() => {
    (async () => {
      await axios.post("/api/user");
      const response = await axios.get("/api/message");
      setMessage(response.data);
    })();

    socketRef.current = io(); // adjust server URL if needed
    const socket = socketRef.current;

    socket.on("newMessage", (data) => {
      setMessage((prev) => [...prev, data]);
    });

    return () => {
      socket?.disconnect();
    };
  }, []);

  // derive formatted messages
  const formattedMessages = useMemo(() => {
    return allMsg.map((data) => ({
      name: data.name,
      msg: data.message,
      imageUrl: data.pic,
      direction: data.name === name ? "right" : "left",
    }));
  }, [allMsg, name]);

  // send message
  const sentMessage = async (form) => {
    const formData = form.get("message");
    await axios.post("/api/message", {
      id: currentUserId,
      name,
      message: formData,
      pic: imageUrl,
    });
  };

  return (
    <DashboardLayout>
      <div className="size-full rounded-md shadow-xl flex flex-col">
        {/* header */}
        <div className="w-full flex bg-indigo-500 justify-center items-center h-[60px] shadow-sm rounded-tl-md rounded-tr-md">
          <h1 className="text-xl text-white font-semibold">Chat Online</h1>
        </div>

        {/* messages */}
        <div
          ref={containerRef}
          className="w-full flex-1 overflow-y-auto py-5 space-y-2"
        >
          {formattedMessages.map((data, key) => (
            <Message data={data} key={key} />
          ))}
        </div>

        {/* input */}
        <div className="w-full h-fit rounded-bl-md rounded-br-md p-5">
          <form
            className="w-full flex items-center max-w-full mx-auto"
            action={sentMessage}
          >
            <div className="relative w-full">
              <div className="w-full absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-4 rounded-full h-full bg-white bg-opacity-80 backdrop-blur-md"
                placeholder="Type your message..."
                required
                name="message"
              />
            </div>
            <button
              type="submit"
              className="p-4 ms-2 text-sm font-medium text-white bg-blue-700 rounded-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <Send />
              <span className="sr-only">Send</span>
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
