const product = JSON.parse(localStorage.getItem("product"));
let cart = Number(localStorage.getItem("cart")) || 0;

const container = document.getElementById("product-details");
container.innerHTML = `
  <h1>${product.name}</h1>
  <p>${product.description}</p>
  <h2 class="price">₹${product.price}</h2>
  <p>Available: ${product.quantity}</p>
`;

function addToCart() {
  const qty = Number(document.getElementById("qty").value);
  cart += qty;
  localStorage.setItem("cart", cart);
  alert("Added to cart!");
}