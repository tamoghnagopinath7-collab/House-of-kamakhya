// ---------- Sample product data ----------
const products = [
  { id: 1, name: "Japa Kurta Sets",  tagline: "Drawn from tradition", price: 5625, mrp: 7500, type: "kurta", color: "#d98c9a" },
  { id: 2, name: "Karnikar Kurta Set",  tagline: "A rhythm of grace",    price: 4200, mrp: 5600, type: "kurta", color: "#c9b27c" },
  { id: 3, name: "Mallika Kurta Set",    tagline: "Beauty that unfolds",  price: 4200, mrp: 5600, type: "kurta", color: "#9fb89a" },
  { id: 4, name: "Mandara Anarkali Set", tagline: "Tradition, redefined", price: 5249, mrp: 6999, type: "kurta", color: "#e0a63c" },
  { id: 5, name: "Ketaki Beige Cord Set", tagline: "Purity in form", price: 5625, mrp: 7500, type: "cord", color: "#e8dccd" },
  { id: 6, name: "Kumuda Cord set ", tagline: "Elegance in every breath", price: 5625, mrp: 7500, type: "cord", color: "#a53d8489" }
];

let bag = 0;
const wishlist = new Set();

const grid = document.getElementById("productGrid");
const bagCount = document.getElementById("bagCount");
const wishCount = document.getElementById("wishCount");

const rupees = n => "₹" + n.toLocaleString("en-IN");

// ---------- Render products ----------
function renderProducts(filter = "all") {
  grid.innerHTML = "";

  products
    .filter(p => filter === "all" || p.type === filter)
    .forEach(p => {
      const off = Math.round((1 - p.price / p.mrp) * 100);
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <span class="badge">${off}% OFF</span>
        <button class="wish ${wishlist.has(p.id) ? "on" : ""}" data-id="${p.id}" aria-label="Add to wishlist">&#9825;</button>
        <div class="card-img" style="background:${p.color}"></div>
        <div class="card-body">
          <h3>${p.name}</h3>
          <p class="tagline">${p.tagline}</p>
          <p class="price">${rupees(p.price)} <del>${rupees(p.mrp)}</del></p>
          <button class="btn add" data-id="${p.id}">Add to Bag</button>
        </div>`;
      grid.appendChild(card);
    });
}

// ---------- Add to bag / wishlist (event delegation) ----------
grid.addEventListener("click", e => {
  const wishBtn = e.target.closest(".wish");
  const addBtn = e.target.closest(".add");

  if (wishBtn) {
    const id = Number(wishBtn.dataset.id);
    wishlist.has(id) ? wishlist.delete(id) : wishlist.add(id);
    wishBtn.classList.toggle("on");
    wishCount.textContent = wishlist.size;
  }

  if (addBtn) {
    bag++;
    bagCount.textContent = bag;
    addBtn.textContent = "Added ✓";
    setTimeout(() => (addBtn.textContent = "Add to Bag"), 1000);
  }
});

// ---------- Filters ----------
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

// ---------- Mobile menu ----------
const nav = document.getElementById("nav");
document.getElementById("menuToggle").addEventListener("click", () => nav.classList.toggle("open"));
nav.addEventListener("click", () => nav.classList.remove("open"));

// ---------- Newsletter validation ----------
document.getElementById("newsletterForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("formMsg");
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  msg.className = "form-msg " + (valid ? "ok" : "error");
  msg.textContent = valid ? "Thank you for subscribing!" : "Please enter a valid email address.";
  if (valid) e.target.reset();
});

// ---------- Init ----------
renderProducts();