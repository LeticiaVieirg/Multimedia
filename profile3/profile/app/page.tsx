import Image from "next/image";

export default function Home() {
  return ( 
    <div className="items-center flex flex-col rounded-2xl border-pink-800 border-2 w-50 m-0 mr-auto ml-auto">
      <div className="w-25 mt-3">
        <img className="rounded-4xl" src="Leticia.jpeg" alt="Imagem de Perfil" />
      </div>
      <h1 className="mt-2">Leticia Vieira</h1>
      <p className="mb-2">Computer Engineering</p>
      <button className="bg-pink-700 p-1.5 pr-2 pl-2 rounded-2xl mb-3">Contact</button>
    </div>
  );
}
