import { getCurrentUser, getCurrentEmoji, signOut } from './supabase.js';

export const NAV_ITEMS = [
  {
    section: 'The Voyage',
    items: [
      { label: 'Home', desc: 'Countdown & overview', href: 'home.html', icon: '🏠' },
      { label: 'Itinerary', desc: 'Day by day plan', href: 'itinerary.html', icon: '🗓' },
      { label: 'Flights', desc: 'All flight details', href: 'home.html#flights', icon: '✈️' },
      { label: 'M/Y R23', desc: 'Yacht info & crew', href: 'yacht.html', icon: '🛥' },
      { label: 'Map', desc: 'Our voyage route', href: 'map.html', icon: '📍' },
      { label: '☀️ Weather', desc: 'Amalfi Coast forecast', href: 'weather.html', icon: '☀️' },
    ]
  },
  {
    section: 'The Family',
    items: [
      { label: 'The Crew', desc: 'Meet the family', href: 'group.html', icon: '🎭' },
      { label: 'Photo Album', desc: 'Share your moments', href: 'photos.html', icon: '📸' },
      { label: 'Journal', desc: 'Trip notes & thoughts', href: 'journal.html', icon: '📝' },
      { label: 'Packing List', desc: "Don't forget a thing", href: 'packing.html', icon: '🧳' },
    ]
  },
  {
    section: 'For Marshall 🤴',
    items: [
      { label: 'Letters to Marshall', desc: 'Read at his birthday dinner', href: 'letters.html', icon: '💌', hideFromMarshall: true },
      { label: "Marshall's Memories", desc: 'Stories from those who love him', href: 'memories.html', icon: '🧠', hideFromMarshall: true },
      { label: 'Game', desc: 'Family fun & trivia', href: 'game.html', icon: '🎯' },
    ]
  },
  {
    section: 'Explore',
    items: [
      { label: 'Shopping Guide', desc: 'What to buy & where', href: 'shopping.html', icon: '💸' },
      { label: 'Playlist', desc: "Marshall's Way soundtrack", href: 'playlist.html', icon: '🎵' },
    ]
  }
];

export function renderNav(activePage = '') {
  const user = getCurrentUser();
  const emoji = getCurrentEmoji();
  const isMarshall = user === 'Marshall';

  const drawerSections = NAV_ITEMS.map(section => {
    const items = section.items
      .filter(item => !(isMarshall && item.hideFromMarshall))
      .map(item => {
        const isActive = item.href === activePage ? 'active' : '';
        return `
          <a href="${item.href}" class="drawer-item ${isActive}">
            <span class="drawer-item-icon">${item.icon}</span>
            <div class="drawer-item-text">
              <div class="drawer-item-label">${item.label}</div>
              <div class="drawer-item-desc">${item.desc}</div>
            </div>
          </a>`;
      }).join('');

    return `
      <div class="drawer-section-label">${section.section}</div>
      ${items}`;
  }).join('');

  const navHTML = `
    <nav class="nav">
      <div class="nav-inner">
        <div class="nav-left">
          <button class="nav-hamburger" id="hamburger" onclick="toggleDrawer()" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
        <a href="home.html" class="nav-logo">
          <img src="images/logo.png" alt="Marshall's Way">
          <span class="nav-logo-text">Marshall's <span>Way</span></span>
        </a>
        <div class="nav-right">
          <div class="nav-user">
            <div class="nav-user-avatar">${emoji}</div>
            <span>${user || 'Guest'}</span>
          </div>
        </div>
      </div>
    </nav>

    <div class="nav-overlay" id="navOverlay" onclick="closeDrawer()"></div>

    <div class="nav-drawer" id="navDrawer">
      <div class="drawer-header">
        <div class="drawer-avatar">${emoji}</div>
        <div>
          <div class="drawer-user-name">${user || 'Guest'}</div>
          <div class="drawer-user-sub">Aboard M/Y R23</div>
        </div>
      </div>
      <nav class="drawer-nav">
        ${drawerSections}
      </nav>
      <div class="drawer-footer">
        <button class="drawer-signout" onclick="handleSignOut()">
          🚪 &nbsp; Sign Out
        </button>
      </div>
    </div>

    <div class="nav-spacer"></div>
  `;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
}

window.toggleDrawer = function() {
  const drawer = document.getElementById('navDrawer');
  const overlay = document.getElementById('navOverlay');
  const hamburger = document.getElementById('hamburger');
  drawer.classList.toggle('open');
  overlay.classList.toggle('open');
  hamburger.classList.toggle('open');
};

window.closeDrawer = function() {
  document.getElementById('navDrawer').classList.remove('open');
  document.getElementById('navOverlay').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
};

window.handleSignOut = async function() {
  await signOut();
};

// Close drawer on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') window.closeDrawer();
});