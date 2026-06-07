export interface Video {
    nome: string;
    thumb: string;
    url: string;
  }
  
  const videos: Video[] = [
    {    
      nome: "bang",
      thumb: "/thumbs/Bang.png",
      url: "/videos/bang.mp4"
    }, {    
        nome: "desgraca",
        thumb: "/thumbs/Nova.png",
        url: "/videos/desgraca.mp4"
      }, {    
        nome: "show",
        thumb: "/thumbs/Show.png",
        url: "/videos/show.mp4"
      }
  ];
  
  export default videos;