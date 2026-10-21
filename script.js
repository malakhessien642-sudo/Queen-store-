
const WHATSAPP_NUMBER = "201115830573";

// Replace these sample prices with your actual product prices.
const products = [
  { id: "m1", category: "makeup", name: "Makeup Collection 01", price: 150, image: "makeup1.jpg" },
  { id: "m2", category: "makeup", name: "Makeup Collection 02", price: 200, image: "makup2.jpg" },
  { id: "m3", category: "makeup", name: "Makeup Collection 03", price: 250, image: "makeup3.jpg" },

  { id: "d1", category: "dresses", name: "Elegant Dress 01", price: 650, image: "dresses1.jpg" },
  { id: "d2", category: "dresses", name: "Elegant Dress 02", price: 750, image: "dresses2.jpg" },
  { id: "d3", category: "dresses", name: "Elegant Dress 03", price: 850, image: "dressed3.jpg" },

  { id: "a1", category: "accessories", name: "Accessory 01", price: 120, image: "accessories1.webp" },
  { id: "a2", category: "accessories", name: "Accessory 02", price: 180, image: "accessories2.jpeg" },
  { id: "a3", category: "accessories", name: "Accessory 03", price: 220, image: "accessories3.jpeg" }
];

const categoryDetails = {
  makeup: {
    title: "Makeup",
    description: "A little beauty, a lot of confidence."
  },
  dresses: {
    title: "Dresses",
    description: "Find the look that feels like you."
  },
  accessories: {
    title: "Accessories",
    description: "The little details make the difference."
  }
};

let cart = [];

const productGrid = document.getElementById("product-grid");
const productsSection = document.getElementById("products-section");
const categoriesSection = document.getElementById("categories");
const cartDrawer = document.getElementById("cart-drawer");
const cartBackdrop = document.getElementById("cart-backdrop");

document.getElementById("year").textContent = new Date().getFullYear();

function showCategory(category) {
  const details = categoryDetails[category];

  if (!details) return;

  document.getElementById("products-title").innerHTML =
    details.title + " <i>Collection</i>";

  document.getElementById("products-description").textContent =
    details.description;

  const selectedProducts = products.filter(
    product => product.category === category
  );

  productGrid.innerHTML = selectedProducts.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.style.display='none'; this.parentElement.style.background='#ead5d8';"
        >
      </div>

      <div class="product-info">
        <span class="product-category">${category}</span>
        <h3>${product.name}</h3>

        <div class="product-bottom">
          <span class="product-price">${product.price} EGP</span>
          <button
            class="add-button"
            onclick="addToCart('${product.id}')"
          >
            + Add to Bag
          </button>
        </div>
      </div>
    </article>
  `).join("");

  categoriesSection.hidden = true;
  productsSection.hidden = false;

  productsSection.scrollIntoView({ behavior: "smooth" });
}

function showHome() {
  productsSection.hidden = true;
  categoriesSection.hidden = false;

  document.getElementById("home").scrollIntoView({
    behavior: "smooth"
  });
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);

  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  toggleCart(true);
}

function changeQuantity(productId, change) {
  const item = cart.find(product => product.id === productId);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(product => product.id !== productId);
  }

  updateCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

function updateCart() {
  const count = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent =
    total.toLocaleString("en-US") + " EGP";

  const cartItems = document.getElementById("cart-items");

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        Your bag is waiting for something lovely ♡
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">

      <div>
        <h3>${item.name}</h3>
        <p>${(item.price * item.quantity).toLocaleString("en-US")} EGP</p>

        <div class="quantity-controls">
          <button
            onclick="changeQuantity('${item.id}', -1)"
            aria-label="Decrease quantity"
          >−</button>

          <span>${item.quantity}</span>

          <button
            onclick="changeQuantity('${item.id}', 1)"
            aria-label="Increase quantity"
          >+</button>
        </div>
      </div>

      <button
        class="remove-item"
        onclick="removeFromCart('${item.id}')"
        aria-label="Remove ${item.name}"
      >✕</button>
    </div>
  `).join("");
}

function toggleCart(open) {
  cartDrawer.classList.toggle("open", open);
  cartBackdrop.classList.toggle("open", open);

  document.body.style.overflow = open ? "hidden" : "";
}

function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("Your bag is empty. Please add a product first.");
    return;
  }

  const lines = cart.map(item =>
    `• ${item.name} x ${item.quantity} = ${
      (item.price * item.quantity).toLocaleString("en-US")
    } EGP`
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const message = [
    "Hello Queen Store! ♛",
    "I'd like to place an order:",
    "",
    ...lines,
    "",
    `Total: ${total.toLocaleString("en-US")} EGP`,
    "",
    "Please confirm availability and delivery details."
  ].join("\n");

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
}
