import React, { useState } from 'react'

import { HiRefresh } from 'react-icons/hi';
import axios from "axios";

export default function Header(setMessages) {

    const [isResetting, setIsResetting] = useState(false)

    const resetConv = async () =>{
        setIsResetting(true)

        await axios.get("http://127.0.0.1:8000/reset_messages").then(res=>{
            if (res.status === 200) setMessages([])
            else console.log("error with the backend API req")
        }).catch(err=> console.log(err));
        
        setIsResetting(false)
    }
    
  return (
    <div style={{display:'flex', justifyContent:'space-between'}}>
        Chat With Ai
        <button onClick={resetConv} disabled={isResetting}><HiRefresh /> Reset</button>
    </div>
  )
}
