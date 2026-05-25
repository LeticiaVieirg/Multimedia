
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

import musics from "./data/Musics";mul

export default function Home() {

  const [playing, setPlaying] =useState<boolean>(false);
  const [volume, setVolume]=useState<number>(1);
  const audioRef=useRef<HTMLAudioElement>(null);
  const [audioIndex, setAudioIndex]=useState<number>(0);
  const [currentTime, setCurrentTime]=useState<number>(0);
  const [duration, setDuration]=useState<number>(0);
  const [velocity, setvelocity]=useState<number>(1);

  const play=()=>{
    const audio=audioRef.current;
    if(!audio) return;
    audio.play().catch((err)=>console.log(err));
  }

  const pause=()=>{
    const audio=audioRef.current;
    if(!audio) return;
    audio.pause();
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
    const audio = audioRef.current;
    if(!audio) return;
    audio.currentTime=time;
    setCurrentTime(time);
  }

  const configVolume=(value:number)=> {
    const audio=audioRef.current; 
    if(!audio) return;
    audio.volume=value;
    setVolume(value);
  }

  //Controle do primeiro audio, para ser executada
  useEffect(() => {
    configAudio(0);
  
    const audio = audioRef.current;
  
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
    const audio = audioRef.current;
  
    if (!audio) return;
  
    audio.load();
  
    audio.onloadedmetadata = () => {
      setDuration(audio.duration || 0);
    };
  
    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };
  
    audio.onended = () => {
      configAudio(audioIndex + 1);
    };
  
    if (playing) {
      audio.play().catch((err) => console.log(err));
    }
  }, [audioIndex, playing]);

  const configAudio=(index: number) => {
    if(index>=musics.length){
      index=0;
    }else if(index<0){
      index=musics.length-1
    }
    setAudioIndex(index);
  }

  const configVelocity=(number:number)=>{
    let newVelocity=number;
    if(newVelocity>3){
      newVelocity=1;
    }
    const audio=audioRef.current;
    if(!audio)return;
    audio.playbackRate=newVelocity;
    setvelocity(newVelocity);
  }

  return (
    <div className="  flex bg-black w-125 mr-auto ml-auto">
      <div>
        <ul>{
          musics.map((music, index)=>{
            return(
              <li key={index} onClick={() => configAudio(index)} className="w-50">
                <h1>{music.nome}</h1>
                  <img src ={musics[index].imagem} alt= {"Imagem da musica" + music.nome} />
              </li>
            )
          })
        }
      </ul>
    </div>
    <div className="items-center flex flex-col w-50 m-0 mr-auto ml-auto">
      <audio ref={audioRef} src={musics[audioIndex].url} controls hidden></audio>
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
          <button onClick={()=> configAudio(audioIndex - 1)} className="mr-4">
                <FaStepBackward />
          </button>

          <button onClick={() => configAudio(audioIndex + 1)}>
            <FaStepForward />
          </button>

          <button onClick={() => configVelocity(velocity + 0.5)} className="bg-blue-500 rounded-[360px] w-6">
            {velocity}
          </button>
        </div>
        <div>
          <div className="w-50">
                  <h1>{musics[audioIndex].nome}</h1>
                  <img src={musics[audioIndex].imagem} alt={"Imagem da música " + musics[audioIndex].nome} />
                </div>
        </div>
      </div>
    </div>
  );
}