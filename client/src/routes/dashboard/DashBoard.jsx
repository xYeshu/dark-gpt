import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Upload from "../../upload/Upload";
import ywlogoc from "/ywlogoc.svg";

export default function DashBoard() {
    const [img, setImg] = useState({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
    });

    const [isShadowOn, setIsShadowOn] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsShadowOn((prev) => !prev); 
        }, 1500); 

        return () => clearInterval(interval); 
    }, []);

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (text) => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });
            return await res.json();
        },
        onSuccess: (id) => {
            queryClient.invalidateQueries({ queryKey: ["userChats"] });
            navigate(`/dashboard/chats/${id}`);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = e.target.text.value;
        if (!text) return;
        mutation.mutate(text);
    };

    return (
        <div className="flex pt-30 flex-col h-screen items-center text-white px-4">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-8">
                <img
                    className="size-19 mb-2 animate-spin"
                    style={{ animationDuration: "5s" }}
                    src={ywlogoc}
                    alt="DarkGPT Logo"
                />
                <h1 className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-thin tracking-wide">
                    DarkGPT
                </h1>
                <p className="text-gray-400 text-sm mt-2">
                    Ethical Hacking & Cybersecurity AI Assistant
                </p>
            </div>

            {/* Suggested Topics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl text-center">
                <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition">
                    <span className="text-lg">Top Penetration Testing Attacks</span>
                </div>
                <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition">
                    <span className="text-lg">Understanding XSS Attacks</span>
                </div>
                <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition">
                    <span className="text-lg">Cybersecurity Best Practices</span>
                </div>
            </div>

            {/* Chat Input Form */}
            <div className="w-full flex mt-20 justify-center">
                <form
                    onSubmit={handleSubmit}
                    className={`absolute md:w-[60%] w-[80%]  gap-2 items-center flex px-2 py-2 rounded-full transition-all duration-500 ${
                        isShadowOn ? "shadow-[0_0_50px_rgba(139,92,246,0.7)]" : "shadow-none"
                    }`}
                >
                    <Upload setImg={setImg} />
                    <input id="file" type="file" multiple={false} hidden />
                    <input
                        type="text"
                        name="text"
                        placeholder="Message DarkGPT"
                        className="texts flex-1 p-2 border-none outline-none w-full"
                    />
                    <button className="cursor-pointer rounded-full self-end ml-auto">
                        <img src="/arrow.png" className="size-10 p-2" />
                    </button>
                </form>
            </div>
        </div>
    );
}
