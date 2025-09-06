const axios = require('axios');

const API_BASE_URL = 'https://ecommerce-web-s9lj.onrender.com/api';

const items = [
  {
    name: "Wireless Mouse",
    description: "A smooth, ergonomic wireless mouse with fast response.",
    price: 799,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    stock: 24
  },
  {
    name: "Cotton T-Shirt",
    description: "Comfortable plain cotton t-shirt for casual wear.",
    price: 399,
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    stock: 52
  },
  {
    name: "JavaScript for Beginners",
    description: "An introductory guide to JavaScript programming.",
    price: 699,
    category: "Books",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    stock: 14
  },
  {
    name: "Ceramic Coffee Mug",
    description: "Sturdy ceramic mug for your morning coffee.",
    price: 249,
    category: "Home & Garden",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    stock: 61
  },
  {
    name: "Football Size 5",
    description: "Standard size 5 football for outdoor play.",
    price: 1099,
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=400&q=80",
    stock: 36
  },
  {
    name: "Wooden Toy Train",
    description: "Classic wooden toy train with magnetic connectors.",
    price: 549,
    category: "Toys",
    imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    stock: 47
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Compact speaker with clear sound and deep bass.",
    price: 1599,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
    stock: 33
  },
  {
    name: "Denim Jeans",
    description: "Regular fit blue denim jeans for men.",
    price: 1199,
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1469398715555-76331d7abdf5?auto=format&fit=crop&w=400&q=80",
    stock: 28
  },
  {
    name: "Succulent Plant Pot",
    description: "Small ceramic pot with a living succulent.",
    price: 449,
    category: "Home & Garden",
    imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
    stock: 20
  },
  {
    name: "Yoga Mat 6mm",
    description: "Non-slip yoga mat with cushioning.",
    price: 899,
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    stock: 44
  },
  {
    name: "Rubik's Cube 3x3",
    description: "Original 3x3 Rubik's Cube puzzle toy.",
    price: 349,
    category: "Toys",
    imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    stock: 38
  },
  {
    name: "LED Desk Lamp",
    description: "Adjustable LED lamp for desk use.",
    price: 879,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=400&q=80",
    stock: 29
  },
  {
    name: "Printed Hoodie",
    description: "Stylish printed hoodie for winter.",
    price: 1499,
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    stock: 34
  },
  {
    name: "Cookbook: Indian Recipes",
    description: "More than 100 authentic Indian dishes.",
    price: 799,
    category: "Books",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    stock: 13
  },
  {
    name: "Woolen Blanket",
    description: "Warm woolen blanket for winter nights.",
    price: 1800,
    category: "Home & Garden",
    imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    stock: 19
  },
  {
    name: "Adjustable Dumbbells",
    description: "Set of adjustable dumbbells for home workouts.",
    price: 1750,
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=400&q=80",
    stock: 15
  },
  {
    name: "Lego Building Blocks (Set)",
    description: "Creative Lego blocks set for builders.",
    price: 950,
    category: "Toys",
    imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    stock: 50
  },
  {
    name: "Wireless Headphones",
    description: "Over-ear headphones with noise cancellation.",
    price: 2999,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    stock: 26
  },
  {
    name: "Formal Shirt",
    description: "Classic white formal shirt for office wear.",
    price: 799,
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    stock: 49
  },
  {
    name: "Gardening Tool Set",
    description: "5-piece gardening tools for home garden.",
    price: 599,
    category: "Home & Garden",
    imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
    stock: 31
  },
  {
    name: "Badminton Racket",
    description: "Lightweight badminton racket for fast swings.",
    price: 1075,
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=400&q=80",
    stock: 22
  },
  {
    name: "Remote Control Car",
    description: "RC car with rechargeable batteries.",
    price: 1400,
    category: "Toys",
    imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    stock: 21
  },
  {
    name: "USB Flash Drive 32GB",
    description: "High-speed 32GB USB flash storage.",
    price: 499,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    stock: 53
  },
  {
    name: "Graphic Novel: Marvel Heroes",
    description: "Best Marvel graphic novels collected.",
    price: 1099,
    category: "Books",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    stock: 11
  },
  {
    name: "Curtains with Rod",
    description: "Elegant curtains with metal rod for windows.",
    price: 1300,
    category: "Home & Garden",
    imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
    stock: 25
  },
  {
    name: "Cricket Bat",
    description: "English willow cricket bat for all levels.",
    price: 1899,
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=400&q=80",
    stock: 40
  },
  {
    name: "Puzzle Game: Sudoku Board",
    description: "Wooden board game for Sudoku lovers.",
    price: 550,
    category: "Toys",
    imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    stock: 42
  },
  {
    name: "Bluetooth Earbuds",
    description: "True wireless stereo earbuds with case.",
    price: 1499,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    stock: 27
  },
  {
    name: "Men's Sports Shoes",
    description: "Breathable running shoes for men.",
    price: 1699,
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1469398715555-76331d7abdf5?auto=format&fit=crop&w=400&q=80",
    stock: 37
  },
  {
    name: "Classic Novels Boxed Set",
    description: "Timeless classics bundled in a boxed set.",
    price: 1249,
    category: "Books",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    stock: 8
  },
  {
    name: "Indoor Plant Stand",
    description: "Decorative stand for small indoor plants.",
    price: 799,
    category: "Home & Garden",
    imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
    stock: 30
  },
  {
    name: "Resistance Bands",
    description: "Fitness resistance bands for stretching.",
    price: 299,
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    stock: 57
  },
  {
    name: "Plush Teddy Bear",
    description: "Soft teddy bear, ideal for gifting.",
    price: 650,
    category: "Toys",
    imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    stock: 48
  },
  {
    name: "Smart Fitness Tracker",
    description: "Track steps, sleep and heart rate.",
    price: 1999,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    stock: 14
  },
  {
    name: "Women's Kurti",
    description: "Elegant floral printed kurti.",
    price: 999,
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    stock: 46
  },
  {
    name: "Self-Help Book: Habits",
    description: "A transformative book on habits and discipline.",
    price: 470,
    category: "Books",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    stock: 17
  },
  {
    name: "Wall Hanging Decor",
    description: "Handcrafted wall hanging for interiors.",
    price: 350,
    category: "Home & Garden",
    imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
    stock: 39
  },
  {
    name: "Table Tennis Bat",
    description: "Professional table tennis bat.",
    price: 950,
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    stock: 32
  }
];

const insertItems = async () => {
  console.log(`Starting to insert ${items.length} items...`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    try {
      const response = await axios.post(`${API_BASE_URL}/items`, item);
      console.log(`✅ ${i + 1}/${items.length}: ${item.name} - Success`);
      successCount++;
    } catch (error) {
      console.log(`❌ ${i + 1}/${items.length}: ${item.name} - Error: ${error.response?.data?.message || error.message}`);
      errorCount++;
    }
    
    // Add a small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`✅ Successfully inserted: ${successCount} items`);
  console.log(`❌ Failed to insert: ${errorCount} items`);
  console.log(`📦 Total items processed: ${items.length}`);
};

// Run the insertion
insertItems().catch(console.error);
