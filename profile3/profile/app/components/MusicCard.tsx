import Image from "next/image"

interface Props {
  nome: string
  imagem: string
  onClick: () => void
}

export default function MusicCard({
  nome,
  imagem,
  onClick
}: Props) {

  return (
    <li
      onClick={onClick}
      className="w-50 cursor-pointer"
    >

      <h1>{nome}</h1>

      <Image
        src={imagem}
        alt={"Imagem da musica " + nome}
        width={180}
        height={180}
      />

    </li>
  )
}