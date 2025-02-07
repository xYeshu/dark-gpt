import { useAuth } from "@clerk/clerk-react";
import "./dashboardlayout.css";
import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import ChatList from "../../components/ChatList";
import { motion } from "framer-motion";

export default function DashBoardLayout() {
    const { isLoaded, userId } = useAuth();
    const Navigate = useNavigate();

    // Set initial state based on window width
    const [toggleMenu, setMenu] = useState(window.innerWidth < 768);

    useEffect(() => {
        if (isLoaded && !userId) {
            Navigate("/sign-in");
        }
    }, [isLoaded, userId, Navigate]);

    if (!isLoaded) return "Loading..";

    return (
        <>
            <div className="dashlayout flex flex-row h-full">
                <motion.div
                    className={`set absolute z-[10] md:relative ${
                        toggleMenu ? "-translate-x-full" : "translate-x-0"
                    } transition-transform duration-300 ease-out`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <ChatList />
                </motion.div>

                <button
                    className="absolute bottom-9 z-[10] left-1 md:hidden cursor-pointer"
                    onClick={() => setMenu(!toggleMenu)}
                >
                    <img src="/arrow.png" className="rotate-90 size-10 p-2" />
                </button>

                {/* Apply blur effect only on mobile screens using Tailwind's media queries */}
                <div
                    className={`content flex-1 ${
                        !toggleMenu ? "md:blur-none blur" : ""
                    }`}
                >
                    <Outlet />
                </div>
            </div>
        </>
    );
}
