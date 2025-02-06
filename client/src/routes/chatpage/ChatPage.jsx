import { useEffect, useRef, useState } from "react"
import "./chatpage.css"
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";
import Markdown from "react-markdown";
import logo from "/ywlogo.png"


export default function ChatPage() {

   

    const path = useLocation().pathname
    const chatId = path.split("/").pop()

    const { isPending, error, data } = useQuery({
        queryKey: ["chat", chatId],
        queryFn: () =>
          fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {credentials:"include"}).then((res) =>
            res.json(),
          ),
      })

  
    return (

        <div className="chatPage ">
            <div className=" wrapper border  rounded-xl dark:bg-gray-950 border-gray-700 ">
     
                <img className="absolute pointer-events-none opacity-4 justify-self-center self-center  md:h-40 h-20 " src="/ywlogo.png" />
                <div className="chat flex">
                 
                    {isPending ? "Loading..." : error ? "Something went wrong" : data?.history?.map((message, i) => (
                        <>
                        {message.img && <IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                    path={message.img}
                    width="380"

                    transformation={[{ width: 380 }]}
                    loading="lazy"
                    lqip={{active:true, quality:20}}
                />}
                         <div className={message.role==="user"? "message user font-thin mt-4 bg-slate-800": "message font-thin"} key={i}>
                            <Markdown>{message.parts[0].text}</Markdown>
                        </div>
                        </>
                    ))}
                    
                    
                {data &&<NewPrompt data={data}/>}
                </div>
            </div>
        </div>
    )
}



