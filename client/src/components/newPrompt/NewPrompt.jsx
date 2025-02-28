
import { useEffect, useRef, useState } from 'react';
import "./newprompt.css"

import attachment from "/attachment.png"
import Upload from '../../upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';
import "/src/routes/chatpage/chatpage.css"
import Markdown from "react-markdown"
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function NewPrompt({data}) {

    const chat = model.startChat({
        history: [
        
        ],
      });

      
    const ref = useRef(null);
    const formRef = useRef(null);
    
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    
    const [img, setImg] = useState({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
    })
    
    useEffect(()=>{
        ref.current.scrollIntoView({behavior:"smooth"})
    },[question, answer, img.dbData])




    const add = async (text, isInitial) => {
        if(!isInitial)  setQuestion(text);

        try{
       

        const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData, text] : [text] );
        
        let accumulatedText ="";
        
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            accumulatedText+= chunkText;
            setAnswer(accumulatedText)
          }
         
        } catch(error){
            console.log(error);
            setAnswer("An error occurred.");
          }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = e.target.text?.value;
        if (!text) return;
        add(text, false)
        formRef.current.reset();
    };

    useEffect(()=>{
        if(data?.history?.length ===1){
            add(data.history[0].parts[0].text, true)
        }
           
    },[]);

    return (
        <>
            {question && <div className='message user text-lg font-thin bg-slate-800'>{question}</div>}
            {answer && (<div className='message text-lg  font-thin'>{<Markdown>{answer}</Markdown>}</div>)}
            {img.isLoading && <div>Loading...</div>}
            {img.dbData?.filePath &&
                (<IKImage
                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                    path={img.dbData?.filePath}
                    width="380"

                    transformation={[{ width: 380 }]}
                />
                )
            }
        <div className="endChat" ref={ref}></div>
        <div className="endChat w-full flex justify-center " ref={ref}> </div>
            <form ref={formRef} onSubmit={handleSubmit} className="shadow-[0_0_50px_rgba(139,92,246,0.5)]  bottom-5 absolute md:w-[70%] w-[80%]  bg-stone-950 gap-2 items-center  flex px-2 py-2 rounded-full">    
                <Upload setImg={setImg} bgc="bg-gray-400 hover:bg-stone-200 transition" />
                <input id="file" type="file" multiple={false} hidden />
                <input type="text" name="text" placeholder="Message DarkGPT" className="texts flex-1 p-2 border-none outline-none w-full" />
                <button className="cursor-pointer rounded-full bg-gray-400 hover:bg-stone-200 transition self-end ml-auto"><img src="/arrow.png" className="size-10 p-2" /></button>
            </form>
        </>
    )
}



