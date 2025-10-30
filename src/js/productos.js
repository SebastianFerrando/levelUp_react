export const productosIniciales = [
  {
    id: 1,
    codigo: "JM001",
    nombre: "Catan",
    precio: 29990,
    stock: 50,
    img: "/img/prod1.jpg",
    descripcion: "Catan es un juego de mesa estratégico donde los jugadores colonizan la isla de Catan, intercambian recursos y construyen asentamientos para dominar la isla. Ideal para 3-4 jugadores y partidas de 60-90 minutos.",
    categoria: "juegos de mesa"
  },
  {
    id: 2,
    codigo: "JM002",
    nombre: "Carcassonne",
    precio: 24990,
    stock: 40,
    img: "/img/prod2.jpg",
    descripcion: "Carcassonne es un juego de mesa donde construyes una ciudad medieval colocando losetas y posicionando seguidores estratégicamente. Perfecto para toda la familia y partidas de 30-45 minutos.",
    categoria: "juegos de mesa"
  },
  {
    id: 3,
    codigo: "AC001",
    nombre: "Controlador Inalambrico Xbox Series X",
    precio: 59990,
    stock: 30,
    img: "/img/prod3.jpg",
    descripcion: "Control inalámbrico para Xbox Series X con diseño ergonómico, botones sensibles y conectividad de baja latencia, ideal para sesiones largas de juego con máxima comodidad y precisión.",
    categoria: "accesorios"
  },
  {
    id: 4,
    codigo: "AC002",
    nombre: "Auriculares Gamer HyperX Cloud II",
    precio: 79990,
    stock: 25,
    img: "/img/prod4.jpg",
    descripcion: "Auriculares gamer con sonido envolvente 7.1, micrófono desmontable y almohadillas de espuma viscoelástica para máxima comodidad. Perfectos para gaming y streaming profesional.",
    categoria: "accesorios"
  },
  {
    id: 5,
    codigo: "CO001",
    nombre: "PlayStation 5",
    precio: 549990,
    stock: 15,
    img: "/img/prod5.jpg",
    descripcion: "Consola gamer de última generación con 1TB de almacenamiento, gráficos 4K, retrocompatibilidad con PS4, y soporte para juegos en alta velocidad con su SSD ultrarrápido. Ideal para gamers exigentes.",
    categoria: "consolas"
  },
  {
    id: 6,
    codigo: "CG001",
    nombre: "PC Gamer ASUS ROG Strix",
    precio: 1299990,
    stock: 10,
    img: "/img/prod6.jpg",
    descripcion: "PC gamer de alto rendimiento con procesador Intel Core i7, tarjeta gráfica NVIDIA RTX, 16GB de RAM y almacenamiento SSD de 1TB. Equipado con iluminación RGB y listo para juegos AAA a máxima calidad.",
    categoria: "computadoras"
  },
  {
    id: 7,
    codigo: "SG001",
    nombre: "Silla Gamer Secretlab Titan",
    precio: 349990,
    stock: 20,
    img: "/img/prod7.jpg",
    descripcion: "Silla ergonómica para gamers con soporte lumbar ajustable, reposabrazos 4D y tapizado de cuero PU premium. Diseñada para largas sesiones de juego con máxima comodidad y estilo.",
    categoria: "sillas"
  },
  {
    id: 8,
    codigo: "MS001",
    nombre: "Mouse Gamer Logitech G502 HERO",
    precio: 49990,
    stock: 35,
    img: "/img/prod8.jpg",
    descripcion: "Mouse gamer con sensor HERO 16K de alta precisión, 11 botones programables y diseño ergonómico. Ideal para juegos competitivos y personalización total del rendimiento.",
    categoria: "accesorios"
  },
  {
    id: 9,
    codigo: "MP001",
    nombre: "Mousepad Razer Goliathus Extended Chroma",
    precio: 29990,
    stock: 45,
    img: "/img/prod9.jpg",
    descripcion: "Mousepad extendido con superficie optimizada para sensores ópticos y láser, iluminación RGB personalizable y base antideslizante. Perfecto para setups gamer completos.",
    categoria: "accesorios"
  },
  {
    id: 10,
    codigo: "PP001",
    nombre: "Polera Gamer Personalizada 'Level-Up'",
    precio: 14990,
    stock: 60,
    img: "/img/prod10.jpg",
    descripcion: "Polera oficial del equipo Level-Up Gamer, confeccionada con algodón de alta calidad, cómoda y resistente. Ideal para fans del gaming y para mostrar tu estilo gamer.",
    categoria: "ropa"
  }
];

export const inicializarProductos = () => {
  if (!localStorage.getItem("productos")) {
    localStorage.setItem("productos", JSON.stringify(productosIniciales));
  }
};
