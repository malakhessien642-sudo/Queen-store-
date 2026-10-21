
const WHATSAPP_NUMBER = "201115830573";

// الأسعار هنا أمثلة مؤقتة؛ غيّريها للأسعار الحقيقية قبل نشر المتجر.
const products = {
  makeup: [
    { id: "m1", name: "Makeup Product 1", price: 150, image: "makeup1.jpg" },
    { id: "m2", name: "Makeup Product 2", price: 200, image: "makup2.jpg" },
    { id: "m3", name: "Makeup Product 3", price: 180, image: "makup3.jpg" }
  ],
  accessories: [
    { id: "a1", name: "Accessory 1", price: 120, image: "accessories1.webp" },
    { id: "a2", name: "Accessory 2", price: 100, image: "accessories2.jpeg" },
    { id: "a3", name: "Accessory 3", price: 140, image: "accessories3.jpeg" }
  ],
  dresses: [
    { id: "d1", name: "Dress 1", price: 450, image: "dresses1.jpg" },
    { id: "d2", name: "Dress 2", price: 500, image: "dresses2.jpg" },
    { id: "d3", name: "Dress 3", price: 480, image: "dresses3.jpg" }
  ]
};

const categoryNames = {
  makeup: "Makeup 💄",
  accessories: "Accessories ✨",
  dresses: "Dresses 👗"
};

let cart = [];

const productGrid = document.getElementById("productGrid");
const productsSection = document.getElementById("productsSection");
const productsTitle = document.getElementById("productsTitle");
const cartPanel = document.getElementById("cartPanel");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");

function formatPrice(price) {
  return price.toLocaleString("ar-EG") + " جنيه";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function showHome() {
  productsSection.hidden = true;
  document.getElementById("categories").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function showCategory(category) {
  if (!products[category]) return;

  productsTitle.textContent = categoryNames[category];
  productGrid.replaceChildren();

  products[category].forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";
    image.onerror = function () {
      this.alt = "الصورة غير متاحة: " + product.image;
      this.style.objectFit = "contain";
      this.style.padding = "12px";
      this.src =
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="350">' +
          '<rect width="100%" height="100%" fill="#fff0f5"/>' +
          '<text x="50%" y="48%" text-anchor="middle" fill="#741b3a" font-size="16">Image unavailable</text>' +
          '<text x="50%" y="56%" text-anchor="middle" fill="#741b3a" font-size="12">' +
          product.image +
          "</text></svg>"
        );
    };

    const info = document.createElement("div");
    info.className = "product-info";

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.name;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "add-button";
    button.textContent = "＋ أضيفي للسلة";
    button.addEventListener("click", () => addToCart(product));

    info.append(name, price, button);
    card.append(image, info);
    productGrid.append(card);
  });

  productsSection.hidden = false;
  productsSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

document.querySelectorAll(".category-card").forEach(button => {
  button.addEventListener("click", () => {
    showCategory(button.dataset.category);
  });
});

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  showToast("اتضاف المنتج لسلتك 💗");
}

function changeQuantity(id, amount) {
  const item = cart.find(product => product.id === id);
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(product => product.id !== id);
  }

  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(product => product.id !== id);
  renderCart();
  showToast("تم حذف المنتج من السلة");
}

function renderCart() {
  cartItems.replaceChildren();

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartCount.textContent = count;
  cartTotal.textContent = formatPrice(total);

  if (cart.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-cart";
    empty.textContent = "لسه السلة فاضية 💗 اختاري منتجاتك الأول.";
    cartItems.append(empty);
    return;
  }

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item";

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.name;
    image.onerror = function () {
      this.style.visibility = "hidden";
    };

    const details = document.createElement("div");

    const name = document.createElement("h3");
    name.textContent = item.name;

    const price = document.createElement("p");
    price.textContent = formatPrice(item.price * item.quantity);

    const actions = document.createElement("div");
    actions.className = "cart-actions";

    const minus = document.createElement("button");
    minus.type = "button";
    minus.className = "qty-button";
    minus.textContent = "−";
    minus.setAttribute("aria-label", "تقليل الكمية");
    minus.addEventListener("click", () => changeQuantity(item.id, -1));

    const quantity = document.createElement("span");
    quantity.className = "quantity";
    quantity.textContent = item.quantity;

    const plus = document.createElement("button");
    plus.type = "button";
    plus.className = "qty-button";
    plus.textContent = "+";
    plus.setAttribute("aria-label", "زيادة الكمية");
    plus.addEventListener("click", () => changeQuantity(item.id, 1));

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-button";
    remove.textContent = "حذف";
    remove.addEventListener("click", () => removeFromCart(item.id));

    actions.append(minus, quantity, plus, remove);
    details.append(name, price, actions);
    row.append(image, details);
    cartItems.append(row);
  });
}

function openCart() {
  cartPanel.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
  cartBackdrop.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
  cartBackdrop.hidden = true;
  document.body.style.overflow = "";
}

document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);

document.getElementById("clearCart").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("السلة فاضية بالفعل");
    return;
  }

  cart = [];
  renderCart();
  showToast("السلة اتفضّت");
});

document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("ضيفي منتج للسلة الأول 💗");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const lines = cart.map(item =>
    `• ${item.name} — الكمية: ${item.quantity} — ${item.price * item.quantity} جنيه`
  );

  const message = [
    "مرحبًا Queen Store 👑",
    "عايزة أطلب المنتجات دي:",
    "",
    ...lines,
    "",
    `الإجمالي: ${total} جنيه`,
    "من فضلكم أكدوا الطلب والتوصيل."
  ].join("\n");

  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank", "noopener,noreferrer");
});

renderCart();
