const WHATSAPP_NUMBER = "201115830573";

const products = {
  makeup: [
    {
      id: "makeup1",
      name: "Makeup Product 1",
      image: "makeup1.jpg",
      price: 150
    },
    {
      id: "makeup2",
      name: "Makeup Product 2",
      image: "makup2.jpg",
      price: 220
    },
    {
      id: "makeup3",
      name: "Makeup Product 3",
      image: "makup3.jpg",
      price: 180
    }
  ],

  accessories: [
    {
      id: "accessories1",
      name: "Accessory 1",
      image: "accessories1.webp",
      price: 120
    },
    {
      id: "accessories2",
      name: "Accessory 2",
      image: "accessories2.jpeg",
      price: 160
    },
    {
      id: "accessories3",
      name: "Accessory 3",
      image: "accessories3.jpeg",
      price: 200
    }
  ],

  dresses: [
    {
      id: "dresses1",
      name: "Dress 1",
      image: "dresses1.jpg",
      price: 450
    },
    {
      id: "dresses2",
      name: "Dress 2",
      image: "dresses2.jpg",
      price: 520
    },
    {
      id: "dresses3",
      name: "Dress 3",
      image: "dressed3.jpg",
      price: 490
    }
  ]
};

const categoryNames = {
  makeup: "Makeup 💄",
  accessories: "Accessories ✨",
  dresses: "Dresses 👗"
};

let cart = [];
let toastTimer;

const categoriesSection = document.getElementById("categories");
const productsSection = document.getElementById("productsSection");
const productsTitle = document.getElementById("productsTitle");
const productsGrid = document.getElementById("productsGrid");

const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");


// Format prices
function formatPrice(price) {
  return "EGP " + price.toLocaleString("en-US");
}


// Show a small notification
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2200);
}


// Open the selected category
function showCategory(categoryKey) {
  const selectedProducts = products[categoryKey];

  if (!selectedProducts) {
    return;
  }

  productsTitle.textContent = categoryNames[categoryKey];

  productsGrid.innerHTML = selectedProducts.map(function (product) {
    return `
      <article class="product-card">

        <div class="product-image-wrap">
          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.style.display='none'"
          >
        </div>

        <div class="product-info">

          <h3>${product.name}</h3>

          <p class="product-description">
            A lovely choice from Queen Store.
          </p>

          <div class="product-buy-row">

            <span class="product-price">
              ${formatPrice(product.price)}
            </span>

            <button
              class="add-btn"
              type="button"
              data-add="${product.id}"
            >
              Add to Cart +
            </button>

          </div>

        </div>

      </article>
    `;
  }).join("");

  categoriesSection.hidden = true;
  productsSection.hidden = false;

  productsSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


// Return to categories
function showCategories() {
  productsSection.hidden = true;
  categoriesSection.hidden = false;

  categoriesSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


// Find a product by its ID
function findProduct(productId) {
  for (const category of Object.values(products)) {
    const product = category.find(function (item) {
      return item.id === productId;
    });

    if (product) {
      return product;
    }
  }

  return null;
}


// Add a product to the cart
function addToCart(productId) {
  const product = findProduct(productId);

  if (!product) {
    return;
  }

  const existingProduct = cart.find(function (item) {
    return item.id === productId;
  });

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  renderCart();

  showToast(product.name + " added to your cart");
}


// Increase or decrease quantity
function changeQuantity(productId, amount) {
  const item = cart.find(function (product) {
    return product.id === productId;
  });

  if (!item) {
    return;
  }

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  renderCart();
}


// Remove a product completely
function removeFromCart(productId) {
  cart = cart.filter(function (item) {
    return item.id !== productId;
  });

  renderCart();
}


// Display cart products and calculate the total
function renderCart() {
  const totalQuantity = cart.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);

  const totalPrice = cart.reduce(function (sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = formatPrice(totalPrice);

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🛍️</div>
        <h3>Your cart is empty</h3>
        <p>Choose your favorite products to get started.</p>
      </div>
    `;

    return;
  }

  cartItems.innerHTML = cart.map(function (item) {
    return `
      <article class="cart-item">

        <img
          src="${item.image}"
          alt="${item.name}"
          onerror="this.style.visibility='hidden'"
        >

        <div>

          <h3>${item.name}</h3>

          <p class="cart-item-price">
            ${formatPrice(item.price)} each
          </p>

          <div class="quantity-controls">

            <button
              type="button"
              data-quantity="${item.id}"
              data-change="-1"
              aria-label="Decrease quantity"
            >−</button>

            <span>${item.quantity}</span>

            <button
              type="button"
              data-quantity="${item.id}"
              data-change="1"
              aria-label="Increase quantity"
            >+</button>

          </div>

          <button
            type="button"
            class="remove-btn"
            data-remove="${item.id}"
          >
            Remove
          </button>

        </div>

        <span class="cart-line-total">
          ${formatPrice(item.price * item.quantity)}
        </span>

      </article>
    `;
  }).join("");
}


// Open cart
function openCart() {
  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  cartOverlay.hidden = false;
  document.body.style.overflow = "hidden";
}


// Close cart
function closeCart() {
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartOverlay.hidden = true;
  document.body.style.overflow = "";
}


// Send the order details to WhatsApp
function checkoutOnWhatsApp() {
  if (cart.length === 0) {
    showToast("Your cart is empty. Add a product first.");
    return;
  }

  const orderLines = cart.map(function (item) {
    return (
      "- " + item.name +
      " x " + item.quantity +
      " = " + formatPrice(item.price * item.quantity)
    );
  });

  const totalPrice = cart.reduce(function (sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  const message = [
    "Hello Queen Store 👑",
    "I would like to place an order:",
    "",
    ...orderLines,
    "",
    "Total: " + formatPrice(totalPrice),
    "",
    "Please confirm product availability and delivery details."
  ].join("\n");

  const whatsappURL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(whatsappURL, "_blank");
}


// Category buttons
document.querySelectorAll("[data-category]").forEach(function (button) {
  button.addEventListener("click", function () {
    showCategory(button.dataset.category);
  });
});


// Add-to-cart buttons
productsGrid.addEventListener("click", function (event) {
  const button = event.target.closest("[data-add]");

  if (button) {
    addToCart(button.dataset.add);
  }
});


// Quantity and remove buttons inside the cart
cartItems.addEventListener("click", function (event) {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");

  if (quantityButton) {
    const productId = quantityButton.dataset.quantity;
    const amount = Number(quantityButton.dataset.change);

    changeQuantity(productId, amount);
  }

  if (removeButton) {
    removeFromCart(removeButton.dataset.remove);
  }
});


// Connect the main buttons
document.getElementById("openCart").addEventListener(
  "click",
  openCart
);

document.getElementById("closeCart").addEventListener(
  "click",
  closeCart
);

cartOverlay.addEventListener("click", closeCart);

document.getElementById("checkoutButton").addEventListener(
  "click",
  checkoutOnWhatsApp
);

document.getElementById("backButton").addEventListener(
  "click",
  showCategories
);

document.getElementById("homeButton").addEventListener("click", function () {
  closeCart();
  showCategories();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("homeLink").addEventListener("click", function (event) {
  event.preventDefault();

  closeCart();
  showCategories();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// Show the current year
document.getElementById("year").textContent = new Date().getFullYear();


// Initialize the cart
renderCart();