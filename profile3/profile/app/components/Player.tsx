import Image from "next/image"
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa"

interface Props {
  playing: boolean
  playPause: () => void
  volume: number
  configVolume: (value: number) => void
  audioRef: React.RefObject<HTMLAudioElement | null>
  nome: string
  imagem: string
  url: string
}

export default function Player({
  playing,
  playPause,
  volume,
  configVolume,
  audioRef,
  nome,
  imagem,
  url
}: Props) {

  return (
    <div className="items-center flex flex-col rounded-2xl border-white-800 border-2 w-50 m-0 mr-auto ml-auto">

      <audio
        ref={audioRef}
        src={url}
        controls
        hidden
      ></audio>

      <Image
        src={imagem}
        alt={nome}
        width={200}
        height={200}
      />

      <h1>{nome}</h1>

      <button onClick={() => playPause()}>
        {
          playing
            ? <FaPauseCircle />
            : <FaPlayCircle />
        }
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.001"
        value={volume}
        onChange={(e) =>
          configVolume(parseFloat(e.target.value))
        }
        className="w-full mt-4"
      />

    </div>
  )
}