import { useState } from "react";
import "./Carousel.css";

export default function CarouselHome() {
  const imgs = ["/img/prod1.jpg", "/img/prod7.jpg", "/img/prod10.jpg"];
  const [index, setIndex] = useState(0);

  return (
    <div className="carousel-home">
      <img src={imgs[index]} alt="carrusel" />
      <div className="controls">
        <button onClick={() => setIndex((index - 1 + imgs.length) % imgs.length)}>◀</button>
        <button onClick={() => setIndex((index + 1) % imgs.length)}>▶</button>
      </div>
    </div>
  );
}
