const API = "https://product-api-w0rr.onrender.com/api/products";
let cartCount = 0;

async function loadProducts() {
  const res = await fetch(API);
  const products = await res.json();

  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => {
      localStorage.setItem("product", JSON.stringify(p));
      window.location.href = "product.html";
    };

    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p class="price">₹${p.price}</p>
      <p>In stock: ${p.quantity}</p>
    `;
    grid.appendChild(card);
  });
}

async function addProduct() {
  const product = {
    name: document.getElementById("name").value.trim(),
    description: document.getElementById("description").value.trim(),
    price: Number(document.getElementById("price").value),
    quantity: Number(document.getElementById("quantity").value)
  };

  if (!product.name || !product.description || product.price <= 0 || product.quantity <= 0) {
    alert("Please fill all fields correctly");
    return;
  }

  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("Backend error:", err);
    alert("Failed to add product");
    return;
  }

  loadProducts();
}

loadProducts();
