import React from 'react'

import { ReactMediaRecorder } from "react-media-recorder"

import { RiVoiceprintLine } from 'react-icons/ri';
// import { MdKeyboardVoice } from 'react-icons/md';


export default function Recorder({handleStopRecording}) {
  return (
    <ReactMediaRecorder 
        audio
        render={({status, startRecording, stopRecording}) => (
            <>
                <button
                    onMouseDown={startRecording} 
                    onMouseUp={stopRecording}
                    style={{padding:'2px 0px 0px 1px', fontSize:"21px", border:'none', width: "45px", height:"45px", color: "#fff", background:status=="recording"?"red":"#5852d6", borderRadius:20}}
                >
                    <RiVoiceprintLine  />
                </button>
                <p>{status}</p>
            </>
        )}
        onStop={handleStopRecording}
        // style={{width: 55, height:55, background:"#5852d6", color: "#fff", border: 'none', fontSize:'23px', borderRadius:25, padding: '10px'}}
    />
    //     onstop
    //     <RiVoiceprintLine  style={{padding:'3px 0px 0px 0px'}}/>
    //     {/* <MdKeyboardVoice /> */}
    // </ReactMediaRecorder>
  )
}
