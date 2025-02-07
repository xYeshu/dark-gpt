import { useEffect, useRef } from "react"
import "./chatpage.css"
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";
import Markdown from "react-markdown";
import logo from "/ywlogo.png"

export default function ChatPage() {


  
    return (

        <div className="chatPage ">
  <div className=" wrapper border  rounded-xl dark:bg-gray-950 border-gray-700 ">
     
     <img className="absolute pointer-events-none opacity-4 justify-self-center self-center  md:h-40 h-20 " src="/ywlogo.png" />
     <div className="chat flex">
                    
                         <div className="user message  font-thin mt-4 bg-slate-800" >
                            What is DarkGPT Demo
                        </div>
                         <div className="user text-lg font-thin" >
                            <Markdown>This is a Demo version of DarkGPT for Prototyping. The backend server is not connected and hence it does not store user chats.</Markdown>
                        </div>

                         {/* <div className={message.role==="user"? "message user": "message"} key={i}>
                            <Markdown>{message.parts[0].text}</Markdown>
                        </div> */}
                    
                <NewPrompt />
                </div>
            </div>
        </div>
    )
}



