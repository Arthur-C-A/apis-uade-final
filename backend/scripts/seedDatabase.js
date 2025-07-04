require('dotenv').config();
const mongoose = require('mongoose');
const Dish = require('../models/Dish');

const initialDishes = [
  {
    title: "Bruschettas Caprese",
    price: 11000,
    category: "Entradas",
    description: "Pan tostado con tomate, mozzarella y albahaca",
    imageUrl: "/img/img1.jpg",
    ingredients: ["Pan", "Tomate", "Mozzarella", "Albahaca", "Aceite de oliva"]
  },
  {
    title: "Melanzane alla parmigiana",
    price: 12400,
    category: "Entradas",
    description: "Berenjenas al horno con queso parmesano",
    imageUrl: "/img/img2.jpg",
    ingredients: ["Berenjena", "Queso parmesano", "Salsa de tomate", "Albahaca"]
  },
  {
    title: "Focaccia casera con rosmarino e olio d'oliva",
    price: 11800,
    category: "Entradas",
    description: "Pan plano italiano con romero y aceite de oliva",
    imageUrl: "/img/img3.jpg",
    ingredients: ["Harina", "Romero", "Aceite de oliva", "Sal marina"]
  },
  {
    title: "Pizza Margherita",
    price: 26000,
    category: "Pizzas",
    description: "Pizza clásica con tomate, mozzarella y albahaca",
    imageUrl: "/img/img4.jpg",
    ingredients: ["Masa", "Tomate", "Mozzarella", "Albahaca", "Aceite de oliva"]
  },
  {
    title: "Pizza Diavola",
    price: 30000,
    category: "Pizzas",
    description: "Pizza picante con salami",
    imageUrl: "/img/img5.jpg",
    ingredients: ["Masa", "Tomate", "Mozzarella", "Salami picante"]
  },
  {
    title: "Pizza Quattro Formaggi",
    price: 33000,
    category: "Pizzas",
    description: "Pizza con cuatro quesos",
    imageUrl: "/img/img6.jpg",
    ingredients: ["Masa", "Mozzarella", "Gorgonzola", "Parmesano", "Fontina"]
  },
  {
    title: "Spaghetti alla Carbonara",
    price: 22000,
    category: "Pastas",
    description: "Pasta con huevo, queso pecorino y panceta",
    imageUrl: "/img/img7.jpg",
    ingredients: ["Spaghetti", "Huevo", "Pecorino", "Panceta", "Pimienta negra"]
  },
  {
    title: "Ñoquis di Patata al Pesto",
    price: 25000,
    category: "Pastas",
    description: "Ñoquis de papa con salsa pesto",
    imageUrl: "/img/img8.jpg",
    ingredients: ["Papa", "Harina", "Pesto", "Parmesano"]
  },
  {
    title: "Lasagna alla Napoletana",
    price: 28000,
    category: "Pastas",
    description: "Lasaña tradicional napolitana",
    imageUrl: "/img/img9.jpg",
    ingredients: ["Pasta", "Carne", "Salsa de tomate", "Mozzarella", "Parmesano"]
  },
  {
    title: "Tiramisú",
    price: 14000,
    category: "Postres",
    description: "Postre italiano de café y mascarpone",
    imageUrl: "/img/img10.jpg",
    ingredients: ["Mascarpone", "Café", "Bizcochos", "Cacao"]
  },
  {
    title: "Cannoli Siciliani",
    price: 15000,
    category: "Postres",
    description: "Dulce siciliano relleno de ricotta",
    imageUrl: "/img/img11.jpg",
    ingredients: ["Masa", "Ricotta", "Chocolate", "Frutas confitadas"]
  },
  {
    title: "Torta de Chocolate",
    price: 16400,
    category: "Postres",
    description: "Torta casera de chocolate",
    imageUrl: "/img/img12.jpg",
    ingredients: ["Chocolate", "Harina", "Huevos", "Azúcar"]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apis_uade');
    console.log('Connected to MongoDB');

    // Limpiar la base de datos
    await Dish.deleteMany({});
    console.log('Database cleared');

    // Add isActive: true to all initial dishes
    const dishesToSeed = initialDishes.map(dish => ({ ...dish, isActive: true }));

    // Insertar los platos
    await Dish.insertMany(dishesToSeed);
    console.log('Database seeded with initial dishes');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 