import { getCurrentUser, getCurrentEmoji, signOut } from './supabase.js';

export const NAV_ITEMS = [
  { label: 'Home', href: 'home.html', icon: '⚓' },
  { label: 'Itinerary', href: 'itinerary.html', icon: '🗓' },
  { label: 'Restaurants', href: 'restaurants.html', icon: '🍝' },
  { label: 'Photos', href: 'photos.html', icon: '📸' },
  { label: 'Group', href: 'group.html', icon: '🎭' },
  { label: 'Packing', href: 'packing.html', icon: '🧳' },
  { label: 'Rooms', href: 'rooms.html', icon: '🛏' },
  { label: 'Game', href: 'game.html', icon: '🎯' },
];

export function renderNav(activePage = '') {
  const user = getCurrentUser();
  const emoji = getCurrentEmoji();

  const linksHTML = NAV_ITEMS.map(item => {
    const isActive = item.href === activePage ? 'active' : '';
    return `<li><a href="${item.href}" class="${isActive}">
      <span class="nav-icon">${item.icon}</span>${item.label}
    </a></li>`;
  }).join('');

  const mobileLinksHTML = NAV_ITEMS.map(item => {
    const isActive = item.href === activePage ? 'active' : '';
    return `<a href="${item.href}" class="${isActive}">
      <span class="nav-icon">${item.icon}</span>${item.label}
    </a>`;
  }).join('');

  const navHTML = `
    <nav class="nav">
      <div class="nav-inner">
        <a href="home.html" class="nav-logo">
          <img src="images/logo.jpg" alt="Marshall's Way">
          <span class="nav-logo-text">Marshall's <span>Way</span></span>
        </a>
        <ul class="nav-links">${linksHTML}</ul>
        <div class="nav-user">
          <div class="nav-user-avatar">${emoji}</div>
          <span>${user || 'Guest'}</span>
        </div>
        <button class="nav-hamburger" onclick="toggleMobileNav()" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav-mobile" id="mobileNav">${mobileLinksHTML}</div>
    </nav>
    <div class="nav-spacer"></div>
  `;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
}

window.toggleMobileNav = function() {
  document.getElementById('mobileNav').classList.toggle('open');
};