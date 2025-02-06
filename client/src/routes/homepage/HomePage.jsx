import { useState } from "react";
import "./homepage.css";
import ywlogoc from "/ywlogoc-c.svg";
import { Link } from "react-router";
import Example from "../../components/Pricing";
import { motion } from "framer-motion"; // Import Framer Motion

export default function HomePage() {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <motion.div 
            className="flex flex-wrap flex-col justify-center h-full"
            initial={{y:20, opacity: 0 }}
            animate={{y:0, opacity: 1 }}
            transition={{ duration: 1.5 , ease: "easeIn" }}
        >
            <div className="left flex flex-col justify-center text-center items-center flex-1 gap-3 md:gap-5">
                <h1 className="text-xl font-thin">Presenting</h1>

                {/* Animated Title */}
                <motion.div
                    className="font-thin md:rounded-full md:p-4 text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500 hover:shadow-[0_0_95px_rgba(139,92,246,0.9)] hover:scale-101"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    DARK GPT
                </motion.div>

                <h3 className="text-[15px] md:text-[20px] font-thin max-w-3xl">
                    AI Designed for Ethical Hackers: Unrestricted, real-time insights into cybersecurity, exploits, vulnerability assessment, and red teaming.
                    <br />
                    ⚠️ Disclaimer: For ethical hacking and educational purposes only. Use responsibly and within legal boundaries.
                </h3>

                {/* Animated Checkbox */}
                <label 
                    className="md:w-2/3 block text-gray-500 font-bold transition-all duration-700 hover:text-white"
                  
                >
                    <input
                        className="mr-2 leading-tight accent-purple-500"
                        type="checkbox"
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <span className="text-sm font-light">
                        Agree to Terms of Use and Privacy Policy
                    </span>
                </label>

                {/* Glowing Button */}
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.95 }}>
                    <Link
                        to={isChecked ? "/dashboard" : "#"}
                        className={`text-white font-thin rounded-full text-sm px-5 py-2.5 text-center transition-all duration-500 ${
                            isChecked
                                ? "bg-gradient-to-br from-purple-600 to-blue-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.9)] hover:scale-105"
                                : "cursor-not-allowed opacity-50"
                        }`}
                        onClick={(e) => !isChecked && e.preventDefault()}
                    >
                        GET STARTED
                    </Link>
                </motion.div>
            </div>

            {/* Right Side with Rotating Logo */}
            <div className="right flex flex-col justify-center items-center text-center flex-1">
                <motion.img
                    src={ywlogoc}
                    alt="Logo"
                    className="md:size-60 size-40 shadow-[0_0_90px_rgba(139,92,246,0.9)] rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                />
            </div>

            <span className="text-sm font-light self-center opacity-50">
                A project by Yeshu Wanjari © 2025
            </span>
        </motion.div>
    );
}
