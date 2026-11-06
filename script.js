const HOBBY_REVIEWS = [
  {
    id: "arknights",
    name: "Arknights",
    category: "game",
    categoryLabel: "Game",
    iconImg: "images/Arknights_icon.png",
    summary:
      "Arknights is a tower defense strategy game blending dark fantasy, sci-fi, and political drama developed by the Chinese studio Hypergryph (HG). It features deep lore, complex world-building, a diverse cast of unique operators, and a distinct Prussian-futuristic art style. It is an ideal choice for those who enjoy strategy games and intricate, multi-layered storytelling.",
    pros: [
      "Deep and challenging tower defense gameplay",
      "Highly detailed visual art and operator characters",
      "Compelling world-building lore in Arknights",
      "Features a diverse range of musical genres",
    ],
    cons: [
      "The gacha system is a bit more expensive than those in other gacha games",
      "Acquiring currency and materials for character upgrades is somewhat difficult",
      "It has a bit of a steep learning curve for beginners.",
    ],
    conclusion:
      "In my opinion, Arknights is a must-try for fans of gacha games, tower defense, and gamers who appreciate complex game lore.",
    link: "https://www.arknights.global/",
  },
  {
    id: "instagram",
    name: "Instagram",
    category: "media",
    categoryLabel: "Media",
    iconImg: "images/Instagram_icon.png",
    summary:
      "A social media platform developed by Meta, designed for sharing photos, reels, and stories.",
    pros: [
      "The Reels feature is highly effective for short-form video content",
      "Explore a world of visual content and entertainment",
      "Stories and Close Friends make it easy to share personal moments",
    ],
    cons: [
      "The feed algorithm is not fast enough and it is difficult to fyp",
      "Annoying ads",
    ],
    conclusion:
      "In my opinion, the social media platform Instagram remains highly relevant due to its ease of access and the efficiency with which moments can be shared.",
    link: "https://www.instagram.com/",
  },
];

// ==========================================
// 2. DOM ELEMENTS
// ==========================================

const navbarWrapper = document.getElementById("navbarWrapper");
const mobileToggle = document.getElementById("mobileToggle");
const navLinks = document.querySelectorAll(".nav-link");

const reviewsGrid = document.getElementById("reviewsGrid");

// Music Player & Spotify Controls
const musicWidget = document.getElementById("musicWidget");
const minimizeMusicBtn = document.getElementById("minimizeMusicBtn");
const minimizeIcon = document.getElementById("minimizeIcon");
const navbarAudioToggle = document.getElementById("navbarAudioToggle");

// Toast
const toastBox = document.getElementById("toastBox");

// ==========================================
// 3. NAVBAR SCROLL EFFECT
// ==========================================

// Mobile Sidebar Toggle
const mobileSidebar = document.getElementById("mobileSidebar");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");
const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
const sidebarLinks = document.querySelectorAll(".sidebar-link");
const sidebarMusicBtn = document.getElementById("sidebarMusicBtn");

function openSidebar() {
  mobileSidebar.classList.add("open");
  sidebarBackdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeSidebar() {
  mobileSidebar.classList.remove("open");
  sidebarBackdrop.classList.remove("active");
  document.body.style.overflow = "";
}

mobileToggle.addEventListener("click", openSidebar);
sidebarCloseBtn.addEventListener("click", closeSidebar);
sidebarBackdrop.addEventListener("click", closeSidebar);

sidebarLinks.forEach((link) => {
  link.addEventListener("click", closeSidebar);
});

// Sidebar music button
if (sidebarMusicBtn) {
  sidebarMusicBtn.addEventListener("click", () => {
    closeSidebar();
    if (musicWidget) {
      musicWidget.classList.toggle("expanded");
      showToast("Spotify: DAYBREAK'S BELL - L'Arc~en~Ciel");
    }
  });
}

// Active link highlighting for both desktop navbar & mobile sidebar
window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbarWrapper.classList.add("scrolled");
  } else {
    navbarWrapper.classList.remove("scrolled");
  }

  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 160;

  sections.forEach((sec) => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
      sidebarLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// Mobile music widget: tap header bar to expand/collapse
if (musicWidget) {
  const headerBar = musicWidget.querySelector(".widget-header-bar");
  if (headerBar) {
    headerBar.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        // Don't trigger if clicking minimize btn itself
        if (e.target.closest(".widget-minimize-btn")) return;
        musicWidget.classList.toggle("expanded");
      }
    });
  }
}

// ==========================================
// 4. SPOTIFY CONTROLS & EVENT LISTENERS
// ==========================================

// Spotify Player Widget & Minimize Toggle
if (minimizeMusicBtn && musicWidget) {
  minimizeMusicBtn.addEventListener("click", () => {
    musicWidget.classList.toggle("minimized");
    if (musicWidget.classList.contains("minimized")) {
      minimizeIcon.classList.replace("fa-chevron-down", "fa-chevron-up");
    } else {
      minimizeIcon.classList.replace("fa-chevron-up", "fa-chevron-down");
    }
  });
}

if (navbarAudioToggle && musicWidget) {
  navbarAudioToggle.addEventListener("click", () => {
    musicWidget.classList.remove("minimized");
    if (minimizeIcon)
      minimizeIcon.classList.replace("fa-chevron-up", "fa-chevron-down");
    showToast("Spotify: DAYBREAK'S BELL - L'Arc~en~Ciel (Gundam 00 OP)");
  });
}

// ==========================================
// 5. RENDER SOFTWARE REVIEWS
// ==========================================

function renderReviews() {
  reviewsGrid.innerHTML = HOBBY_REVIEWS.map((app) => {
    const iconHtml = app.iconImg
      ? `<img src="${app.iconImg}" alt="${app.name}" class="app-badge-img" />`
      : `<i class="${app.iconClass}"></i>`;

    const prosList = app.pros
      .map(
        (p) =>
          `<li><i class="fa-solid fa-check" style="color:#10b981;"></i> <span>${p}</span></li>`,
      )
      .join("");
    const consList = app.cons
      .map(
        (c) =>
          `<li><i class="fa-solid fa-minus" style="color:#f43f5e;"></i> <span>${c}</span></li>`,
      )
      .join("");

    return `
            <div class="review-item-card">
                <div>
                    <div class="review-top-meta">
                        <div class="app-badge-icon">
                            ${iconHtml}
                        </div>
                        <div>
                            <h3 class="app-title">${app.name}</h3>
                            <span class="app-category">${app.categoryLabel}</span>
                        </div>
                    </div>

                    <p class="app-summary">${app.summary}</p>

                    <div class="review-pros-cons">
                        <div class="review-pros-box">
                            <h4 class="pros-cons-title text-success">
                                <i class="fa-solid fa-thumbs-up"></i> Strenght
                            </h4>
                            <ul class="pros-cons-list">${prosList}</ul>
                        </div>
                        <div class="review-cons-box">
                            <h4 class="pros-cons-title text-danger">
                                <i class="fa-solid fa-thumbs-down"></i> Weekness
                            </h4>
                            <ul class="pros-cons-list">${consList}</ul>
                        </div>
                    </div>

                    <div class="review-conclusion">
                        <span>${app.conclusion}</span>
                    </div>
                </div>

                <div class="app-footer-action">
                    <a href="${app.link}" target="_blank" rel="noopener noreferrer" class="btn-read-review">
                        Kunjungi Website <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>
            </div>
        `;
  }).join("");
}

// ==========================================
// 6. TOAST SYSTEM
// ==========================================

function showToast(msg) {
  toastBox.textContent = msg;
  toastBox.classList.add("show");

  setTimeout(() => {
    toastBox.classList.remove("show");
  }, 3200);
}

// ==========================================
// 7. LIGHTBOX
// ==========================================

function openLightbox(src) {
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  img.src = src;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Close with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// ==========================================
// 8. INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  renderReviews();
});
