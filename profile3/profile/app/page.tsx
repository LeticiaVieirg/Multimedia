
"use client"

import { useState, useRef, useEffect } from "react"
import {
  FaBackward,
  FaForward,
  FaPauseCircle,
  FaPlayCircle,
  FaStepBackward,
  FaStepForward
} from "react-icons/fa";

import videos from "./data/Video";

export default function Home() {

  const [playing, setPlaying] =useState<boolean>(false);
  const [volume, setVolume]=useState<number>(1);
  const videoRef=useRef<HTMLVideoElement>(null);
  const [videoIndex, setVideoIndex]=useState<number>(0);
  const [currentTime, setCurrentTime]=useState<number>(0);
  const [duration, setDuration]=useState<number>(0);
  const [velocity, setvelocity]=useState<number>(1);
  const [filter, setFilter]=useState("normal");

  const getFilterClass = () => {
    switch (filter) {
      case "gray":
        return "grayscale";
  
      case "red":
        return "sepia hue-rotate-[300deg] saturate-[5]";
  
      case "green":
        return "sepia hue-rotate-[50deg] saturate-[5]";
  
      case "blue":
        return "sepia hue-rotate-[180deg] saturate-[5]";
  
      case "bw":
        return "grayscale contrast-150";
  
      default:
        return "";
    }
  };

  const play=()=>{
    const video=videoRef.current;
    if(!video) return;
    video.play().catch((err)=>console.log(err));
  }

  const pause=()=>{
    const video=videoRef.current;
    if(!video) return;
    video.pause();
  }

  const playPause=()=>{
    if(playing){
      pause()
    }else{
      play();
    }
    setPlaying(!playing)
  }

  const configCurrentTime=(time:number)=> {
    const video = videoRef.current;
    if(!video) return;
    video.currentTime=time;
    setCurrentTime(time);
  }

  const configVolume=(value:number)=> {
    const video=videoRef.current; 
    if(!video) return;
    video.volume=value;
    setVolume(value);
  }

  //Controle do primeiro audio, para ser executada
  useEffect(() => {
    configVideo(0);
  
    const audio = videoRef.current;
  
    if (!audio) return;
  
    audio.onloadedmetadata = () => {
      setDuration(audio.duration || 0);
    };
  }, []);

  const formatTime=(time:number)=>{
    const minutes = Math.trunc(time/60);
    const seconds=Math.trunc(time%60)
    return ("0"+minutes).slice(-2)+":"+("0"+seconds).slice(-2)
  }

  useEffect(() => {
    const audio = videoRef.current;
  
    if (!audio) return;
  
    audio.load();
  
    audio.onloadedmetadata = () => {
      setDuration(audio.duration || 0);
    };
  
    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };
  
    audio.onended = () => {
      configVideo(videoIndex + 1);
    };
  
    if (playing) {
      audio.play().catch((err) => console.log(err));
    }
  }, [videoIndex, playing]);

  const configVideo=(index: number) => {
    if(index>=videos.length){
      index=0;
    }else if(index<0){
      index=videos.length-1
    }
    setVideoIndex(index);
  }

  const configVelocity=(number:number)=>{
    let newVelocity=number;
    if(newVelocity>3){
      newVelocity=1;
    }
    const video=videoRef.current;
    if(!video)return;
    video.playbackRate=newVelocity;
    setvelocity(newVelocity);
  }

  return (
    <div className="  flex bg-black w-125 mr-auto ml-auto">
      <div>
        <ul>{
          videos.map((video, index)=>{
            return(
              <li key={index} onClick={() => configVideo(index)} className="w-50">
                <h1>{video.nome}</h1>
                  <img src ={videos[index].thumb} alt= {`Thumbnail do video ${video.nome}`} />
              </li>
            )
          })
        }
      </ul>
    </div>
    <div className="items-center flex flex-col w-50 m-0 mr-auto ml-auto">
      <video ref={videoRef} src={videos[videoIndex].url} className={`w-[500px] rounded-lg ${getFilterClass()}`}></video>
      <button onClick={()=> playPause()}>
        {
            playing ? <FaPauseCircle/> : <FaPlayCircle/>
        }
      </button>

      <input type="range"
        min="0"
        max="1"
        step="0.001"
        value={volume}
        onChange={(e)=>configVolume(Number(e.target.value))}
      />
       <div className="flex">
          <p>{formatTime(currentTime)}</p>
          <input 
            type="range"
            min={0}
            step={0.001}
            max={duration || 0}
            value={currentTime}
            onChange={(e) => configCurrentTime(Number(e.target.value))}
          />
          <p>{formatTime(duration)}</p>
        </div>
        <div>
          <button className="mr-4" onClick={()=>configCurrentTime(currentTime - 10)}>
            <FaBackward />
          </button>

          <button onClick={() => configCurrentTime(currentTime + 10)}>
             <FaForward />
          </button>
        </div>
        <div>
          <button onClick={()=> configVideo(videoIndex - 1)} className="mr-4">
                <FaStepBackward />
          </button>

          <button onClick={() => configVideo(videoIndex + 1)}>
            <FaStepForward />
          </button>

          <button onClick={() => configVelocity(velocity + 0.5)} className="bg-blue-500 rounded-[360px] w-6">
            {velocity}
          </button>
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
        <button
          onClick={() => setFilter("normal")}
          className="bg-gray-500 px-2 py-1 rounded"
        >
          Normal
        </button>

        <button
          onClick={() => setFilter("gray")}
          className="bg-gray-700 px-2 py-1 rounded"
        >
          Cinza
        </button>

        <button
          onClick={() => setFilter("red")}
          className="bg-red-500 px-2 py-1 rounded"
        >
          Vermelho
        </button>

        <button
          onClick={() => setFilter("green")}
          className="bg-green-500 px-2 py-1 rounded"
        >
          Verde
        </button>

        <button
          onClick={() => setFilter("blue")}
          className="bg-blue-500 px-2 py-1 rounded"
        >
          Azul
        </button>

        <button
          onClick={() => setFilter("bw")}
          className="bg-black border px-2 py-1 rounded"
        >
          P&B
        </button>
      </div>
        <div>
          <div className="w-50">
                  <h1>{videos[videoIndex].nome}</h1>
                  <img src={videos[videoIndex].imagem} alt={"Imagem da música " + videos[videoIndex].nome} />
                </div>
        </div>
      </div>
    </div>
  );
}