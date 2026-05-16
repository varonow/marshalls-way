import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://wqwdigwfowywsyjswjds.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ghdMhXPgLJTVjKl0AcvnlQ_jXK_uUXQ';

export const db = createClient(SUPABASE_URL, SUPABASE_KEY);

export const GROUP_MEMBERS = [
  { name: 'Victoria', emoji: '👸' },
  { name: 'Marshall', emoji: '🤴' },
  { name: 'Danielle', emoji: '😂' },
  { name: 'Mac', emoji: '🏒' },
  { name: 'Jacob', emoji: '🏋️' },
  { name: 'Ginger', emoji: '💎' },
  { name: 'Kimberly', emoji: '🎨' },
  { name: 'Moshe', emoji: '⚓' },
  { name: 'Stephanie', emoji: '💄' },
  { name: 'Joyce', emoji: '🍸' },
  { name: 'Mousa', emoji: '👔' },
  { name: 'Selly', emoji: '💅' },
];

export const SITE_PASSWORD = 'marshallsway2026';

export function getCurrentUser() {
  return localStorage.getItem('mw_user');
}

export function setCurrentUser(name) {
  localStorage.setItem('mw_user', name);
}

export function isAuthenticated() {
  return localStorage.getItem('mw_auth') === 'true';
}

export function authenticate() {
  localStorage.setItem('mw_auth', 'true');
}

export function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = 'index.html';
  }
}