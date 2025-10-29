export default function Blogs() {
  const blogs = [
    { id: 1, titulo: "Top 5 juegos del año", desc: "Descubre los títulos más jugados de 2025.", img: "/img/blog1.jpg" },
    { id: 2, titulo: "Accesorios gamer esenciales", desc: "Todo lo que necesitas para tu setup.", img: "/img/blog2.jpg" },
    { id: 3, titulo: "Novedades de consolas", desc: "PlayStation y Xbox con nuevas funciones.", img: "/img/blog3.jpg" },
  ];

  return (
    <div className="container mt-4">
      <h2 className="titulo text-center">Blogs y Noticias</h2>
      <div className="grid">
        {blogs.map((b) => (
          <div key={b.id} className="card blog-card">
            <img src={b.img} alt={b.titulo} />
            <h5>{b.titulo}</h5>
            <p>{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
