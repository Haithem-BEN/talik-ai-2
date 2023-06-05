import axios from 'axios'
import React, { useState } from 'react'
import Header from './Header'
import Recorder from './Recorder'

export default function Controler() {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([])
  
  const createBlobUrl = (data)=>{
    const blob = new Blob([data],{type:"audio/mpeg"})
    const url = window.URL.createObjectURL(blob);
    return url
  }
  
  const handleStopRecording = async (blobUrl)=>{
    setIsLoading(true)
    // append recorder message to messages
    const myMessage = {sender: "me", blobUrl}
    const messagesArray = [...messages, myMessage]

    // Conver blob url to blob obj 
    fetch(blobUrl).then((res) => res.blob()).then(async blob=>{
      const formData = new FormData();
      formData.append("file", blob, "myFile.wav")
      // send data 
      await axios.post("http://127.0.0.1:8000/post-audio", formData, {headers:{"Content-Type":"audio/mpeg"}, responseType:"arraybuffer"})
    }).then(res=>{

      const blob = res.data
      const audio = new Audio();
      audio.src= createBlobUrl(blob);

      const abbesMessage = {sneder:"abbes", blobUrl: audio.src}
      messagesArray.push(abbesMessage)
      setMessages(messagesArray)

      // Auto paly the resposne 
      audio.play()

      setIsLoading(false)

    }).catch(e=>{
      console.log(e.message)
      setIsLoading(false)
    })
    

  }
  
  return (
    <div>
      <Header setMessages={setMessages} />
      {/* <ChatHistoryBox /> */}
      <div>
        {messages.map(message=><audio src={message} controls />)}
      </div>
      <Recorder handleStopRecording={handleStopRecording} />
    </div>
  )
}
