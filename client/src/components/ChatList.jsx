import { Link } from "react-router";
import "./chatlist.css";
import ywlogoc from "/ywlogoc.svg";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Pricing from "../components/Pricing";
import { motion, AnimatePresence } from "framer-motion";
import { SignOutButton } from '@clerk/clerk-react'

export default function ChatList() {
  const [price, setPrice] = useState(true);

  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="h-full flex flex-col gap-6 mx-3  p-4 bg-gray-900 border border-gray-700   text-white rounded-xl ">
      {/* Minimal Animated Pricing Section */}
      <AnimatePresence>
        {!price && (
          <motion.div
            initial={{x:0, opacity: 0 }}
            animate={{x:30, opacity: 1 }}
            exit={{ x:0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pricing shadow-[0_0_100px_rgba(139,92,246,0.4)] absolute w-full md:left-[100%] "
          >
            <Pricing />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Section */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg  text-purple-400">DASHBOARD</h2>
        <Link className="dashboard-link" to="/dashboard">
          ➕ Create New Chat
        </Link>

        <a
          className="dashboard-link"
          href="https://yeshu.pages.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          👤 About Creator
        </a>
        <SignOutButton>
        <Link className="dashboard-link" to="/">
          🚪 Log Out
        </Link>
        </SignOutButton>
        <hr className="border-gray-700 my-3" />
      </div>

      {/* Chats Section */}
      <div className="chats flex flex-col h-[40vh] overflow-y-auto">
        <h2 className="text-lg  text-purple-400">CHATS</h2>
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong"
          : data?.map((chat) => (
              <Link
                key={chat._id}
                className="chat-link"
                to={`/dashboard/chats/${chat._id}`}
              >
                💬 {chat.title}
              </Link>
            ))}
      </div>

      {/* Bottom Section */}
      <div className="flex items-center mt-auto px-1 py-2 hover:bg-gray-800 rounded-lg shadow-md">
        {/* Rotating Logo */}
        <div className="right flex justify-center items-center">
          <img
            src={ywlogoc}
            alt="Logo"
            className="size-10 animate-spin"
            style={{ animationDuration: "5s" }}
          />
        </div>

        {/* Upgrade Section */}
        <div className="flex flex-col ml-2">
          <button
            className="upgrade-btn cursor-pointer flex flex-col rounded-lg text-white shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => setPrice(!price)}
          >
            Upgrade to Pro
            <span className="text-sm text-gray-400 font-thin">
              More access to the best models
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
