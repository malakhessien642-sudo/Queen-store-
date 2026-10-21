
const WHATSAPP_NUMBER = "201115830573";

const products = {
  makeup1: {
    name: "Beauty Essential 01",
    price: 150,
    image: "makeup1.jpg"
  },
  makeup2: {
    name: "Beauty Essential 02",
    price: 200,
    image: "makup2.jpg"
  },
  makeup3: {
    name: "Beauty Essential 03",
    price: 250,
    image: "makeup3.jpg"
  },
  dress1: {
    name: "Elegant Dress 01",
    price: 650,
    image: "dresses1.jpg"
  },
  dress2: {
    name: "Elegant Dress 02",
    price: 750,
    image: "dresses2.jpg"
  },
  dress3: {
    name: "Elegant Dress 03",
    price: 850,
    image: "dressed3.jpg"
  },
  accessory1: {
    name: "Charming Detail 01",
    price: 120,
    image: "accessories1.webp"
  },
  accessory2: {
    name: "Charming Detail 02",
    price: 180,
    image: "accessories2.jpeg"
  },
  accessory3: {
    name: "Charming Detail 03",
    price: 220,
    image: "accessories3.jpeg"
  }
};

const cart = {};

const cartDrawer = document.getElementById("cart-drawer");
const cartBackdrop = document.getElementById("cart-backdrop");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");
const toast = document.getElementById("toast");

function formatPrice(price) {
  return "EGP " + price.toLocaleString("en-US");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function openCart() {
  cartDrawer.classList.add("open");
  cartBackdrop.classList.add("show");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("cart-open");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartBackdrop.classList.remove("show");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("cart-open");
}

document.getElementById("open-cart").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
document.getElementById("continue-shopping").addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
  }
});

document.querySelectorAll(".add-button").forEach(button => {
  button.addEventListener("click", () => {
    const id = button.dataset.id;

    if (!products[id]) return;

    cart[id] = (cart[id] || 0) + 1;

    renderCart();
    showToast("Added to your shopping bag ♡");
  });
});

function changeQuantity(id, amount) {
  if (!cart[id]) return;

  cart[id] += amount;

  if (cart[id] <= 0) {
    delete cart[id];
  }

  renderCart();
}

function removeItem(id) {
  delete cart[id];
  renderCart();
  showToast("Item removed from your bag");
}

function renderCart() {
  const ids = Object.keys(cart);

  const totalQuantity = ids.reduce((sum, id) => {
    return sum + cart[id];
  }, 0);

  const totalPrice = ids.reduce((sum, id) => {
    return sum + products[id].price * cart[id];
  }, 0);

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = formatPrice(totalPrice);
  checkoutButton.disabled = ids.length === 0;

  if (ids.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <span>🛍</span>
        <h3>Your bag is waiting</h3>
        <p>Add something lovely to get started.</p>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = ids.map(id => {
    const product = products[id];
    const quantity = cart[id];

    return `
      <article class="cart-item">
        <img src="${product.image}" alt="${product.name}">

        <div>
          <h3>${product.name}</h3>
          <p class="cart-item-price">
            ${formatPrice(product.price * quantity)}
          </p>

          <div class="cart-item-actions">
            <div class="quantity-control">
              <button
                type="button"
                data-action="decrease"
                data-id="${id}"
                aria-label="Decrease quantity">−</button>

              <span>${quantity}</span>

              <button
                type="button"
                data-action="increase"
                data-id="${id}"
                aria-label="Increase quantity">+</button>
            </div>

            <button
              type="button"
              class="remove-item"
              data-action="remove"
              data-id="${id}">Remove</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

cartItems.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");

  if (!button) return;

  const id = button.dataset.id;
  const action = button.dataset.action;

  if (action === "increase") changeQuantity(id, 1);
  if (action === "decrease") changeQuantity(id, -1);
  if (action === "remove") removeItem(id);
});

checkoutButton.addEventListener("click", () => {
  const ids = Object.keys(cart);

  if (ids.length === 0) {
    showToast("Your shopping bag is empty");
    return;
  }

  let total = 0;

  const orderLines = ids.map(id => {
    const product = products[id];
    const quantity = cart[id];
    const subtotal = product.price * quantity;

    total += subtotal;

    return `- ${product.name} | Quantity: ${quantity} | ${formatPrice(subtotal)}`;
  });

  const message = [
    "Hello Queen Store! ♛",
    "",
    "I'd like to order:",
    ...orderLines,
    "",
    `Total: ${formatPrice(total)}`,
    "",
    "Please confirm product availability and delivery details."
  ].join("\n");

  const whatsappURL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(whatsappURL, "_blank", "noopener");
});

renderCart();
