import CarouselHome from "../components/CarouselHome";

export default function Home() {
  return (
    <section className="home">
      <div className="text-center py-5">
        <h1 className="titulo">Bienvenido a Level-Up Gamer</h1>
        <p>Explora nuestros productos y lleva tu experiencia gamer al siguiente nivel.</p>
        <a href="/productos" className="btn-ir">Explorar Productos</a>
      </div>
      <CarouselHome />
    </section>
  );
}
