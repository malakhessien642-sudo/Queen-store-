
"use strict";

// رقم واتساب المتجر بكود مصر الدولي
const WHATSAPP_NUMBER = "201115830573";

// المنتجات والأسعار التجريبية
// غيّري الأسعار حسب أسعار منتجاتك الحقيقية
const products = [
  {
    id: 1,
    category: "makeup",
    name: "Makeup Product 1",
    price: 150,
    image: "./makeup1.jpg"
  },
  {
    id: 2,
    category: "makeup",
    name: "Makeup Product 2",
    price: 200,
    image: "./makup2.jpg"
  },
  {
    id: 3,
    category: "makeup",
    name: "Makeup Product 3",
    price: 250,
    image: "./makeup3.jpg"
  },
  {
    id: 4,
    category: "dresses",
    name: "Dress 1",
    price: 650,
    image: "./dresses1.jpg"
  },
  {
    id: 5,
    category: "dresses",
    name: "Dress 2",
    price: 750,
    image: "./dresses2.jpg"
  },
  {
    id: 6,
    category: "dresses",
    name: "Dress 3",
    price: 850,
    image: "./dressed3.jpg"
  },
  {
    id: 7,
    category: "accessories",
    name: "Accessory 1",
    price: 120,
    image: "./accessories1.webp"
  },
  {
    id: 8,
    category: "accessories",
    name: "Accessory 2",
    price: 180,
    image: "./accessories2.jpeg"
  },
  {
    id: 9,
    category: "accessories",
    name: "Accessory 3",
    price: 220,
    image: "./accessories3.jpeg"
  }
];

const categoryInfo = {
  makeup: {
    title: "قسم المكياج",
    description: "اختاري مستحضرات المكياج اللي بتحبيها"
  },
  dresses: {
    title: "قسم الفساتين",
    description: "اختاري إطلالتك المميزة"
  },
  accessories: {
    title: "قسم الإكسسوارات",
    description: "كمّلي إطلالتك بأجمل الإكسسوارات"
  }
};

// السلة بتحتفظ بالمنتجات أثناء استخدام الصفحة
let cart = [];

// تنسيق السعر بالجنيه المصري
function formatPrice(price) {
  return price.toLocaleString("en-US") + " جنيه";
}

// عرض قسم محدد فقط
function showCategory(category) {
  if (!categoryInfo[category]) {
    return;
  }

  const categoriesSection = document.getElementById("categories-section");
  const productsSection = document.getElementById("products-section");
  const productsGrid = document.getElementById("products-grid");
  const productsTitle = document.getElementById("products-title");
  const productsDescription = document.getElementById("products-description");

  if (
    !categoriesSection ||
    !productsSection ||
    !productsGrid ||
    !productsTitle ||
    !productsDescription
  ) {
    console.error("لم يتم العثور على عناصر عرض المنتجات.");
    return;
  }

  const selectedProducts = products.filter(function(product) {
    return product.category === category;
  });

  productsTitle.textContent = categoryInfo[category].title;
  productsDescription.textContent = categoryInfo[category].description;

  productsGrid.replaceChildren();

  selectedProducts.forEach(function(product) {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    image.addEventListener("error", function() {
      image.alt = "الصورة غير متاحة: " + product.name;
    });

    const info = document.createElement("div");
    info.className = "product-info";

    const name = document.createElement("h3");
    name.textContent = product.name;

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "add-button";
    button.textContent = "＋ أضيفي للسلة";

    button.addEventListener("click", function() {
      addToCart(product.id);
    });

    info.append(name, price, button);
    card.append(image, info);
    productsGrid.appendChild(card);
  });

  categoriesSection.hidden = true;
  productsSection.hidden = false;

  productsSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// الرجوع للأقسام الرئيسية
function showHome() {
  document.getElementById("products-section").hidden = true;
  document.getElementById("categories-section").hidden = false;

  document.getElementById("categories-section").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// النزول للأقسام من البانر
function scrollToCategories() {
  document.getElementById("categories-section").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// إضافة منتج للسلة
function addToCart(productId) {
  const product = products.find(function(item) {
    return item.id === productId;
  });

  if (!product) {
    return;
  }

  const cartItem = cart.find(function(item) {
    return item.id === productId;
  });

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  renderCart();
  toggleCart(true);
}

// زيادة أو تقليل الكمية
function changeQuantity(productId, amount) {
  const item = cart.find(function(product) {
    return product.id === productId;
  });

  if (!item) {
    return;
  }

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(function(product) {
      return product.id !== productId;
    });
  }

  renderCart();
}

// حذف منتج من السلة
function removeFromCart(productId) {
  cart = cart.filter(function(item) {
    return item.id !== productId;
  });

  renderCart();
}

// حساب إجمالي عدد القطع
function getCartCount() {
  return cart.reduce(function(total, item) {
    return total + item.quantity;
  }, 0);
}

// حساب الإجمالي بالجنيه
function getCartTotal() {
  return cart.reduce(function(total, item) {
    return total + item.price * item.quantity;
  }, 0);
}

// تحديث محتويات السلة
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartCount.textContent = getCartCount();
  cartTotal.textContent = formatPrice(getCartTotal());
  cartItems.replaceChildren();

  if (cart.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-cart";
    emptyMessage.textContent = "السلة لسه فاضية ♡";
    cartItems.appendChild(emptyMessage);
    return;
  }

  cart.forEach(function(item) {
    const row = document.createElement("div");
    row.className = "cart-item";

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.name;

    const details = document.createElement("div");

    const name = document.createElement("h3");
    name.textContent = item.name;

    const price = document.createElement("div");
    price.className = "cart-item-price";
    price.textContent = formatPrice(item.price * item.quantity);

    const controls = document.createElement("div");
    controls.className = "cart-item-controls";

    const minusButton = document.createElement("button");
    minusButton.type = "button";
    minusButton.className = "quantity-button";
    minusButton.textContent = "−";
    minusButton.setAttribute("aria-label", "تقليل الكمية");
    minusButton.addEventListener("click", function() {
      changeQuantity(item.id, -1);
    });

    const quantity = document.createElement("span");
    quantity.textContent = item.quantity;

    const plusButton = document.createElement("button");
    plusButton.type = "button";
    plusButton.className = "quantity-button";
    plusButton.textContent = "+";
    plusButton.setAttribute("aria-label", "زيادة الكمية");
    plusButton.addEventListener("click", function() {
      changeQuantity(item.id, 1);
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-button";
    removeButton.textContent = "حذف";
    removeButton.addEventListener("click", function() {
      removeFromCart(item.id);
    });

    controls.append(
      minusButton,
      quantity,
      plusButton,
      removeButton
    );

    details.append(name, price, controls);
    row.append(image, details);
    cartItems.appendChild(row);
  });
}

// فتح وإغلاق السلة
function toggleCart(open) {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");

  if (open) {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
    document.body.classList.add("cart-open");
  } else {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.hidden = true;
    document.body.classList.remove("cart-open");
  }
}

// تجهيز رسالة الطلب وفتح واتساب
function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("السلة فاضية! اختاري المنتجات الأول ❤️");
    return;
  }

  let message = "مرحبًا Queen Store 👑\n";
  message += "عايزة أأكد الطلب التالي:\n\n";

  cart.forEach(function(item, index) {
    message += (index + 1) + "- " + item.name + "\n";
    message += "الكمية: " + item.quantity + "\n";
    message += "السعر: " + formatPrice(item.price * item.quantity) + "\n\n";
  });

  message += "الإجمالي: " + formatPrice(getCartTotal()) + "\n";
  message += "\nمن فضلكم أكدوا لي توافر المنتجات وتفاصيل التوصيل.";

  const whatsappURL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(whatsappURL, "_blank");
}

// تجهيز الصفحة بعد تحميل HTML
document.addEventListener("DOMContentLoaded", function() {
  renderCart();

  // إغلاق السلة بزر Escape
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      toggleCart(false);
    }
  });
});
