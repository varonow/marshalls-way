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

// Get current Supabase session
export async function getSession() {
  const { data } = await db.auth.getSession();
  return data.session;
}

// Get current user profile from profiles table
export async function getCurrentProfile() {
  const session = await getSession();
  if (!session) return null;
  const { data } = await db
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
  return data;
}

// Get current user name from localStorage (cached after login)
export function getCurrentUser() {
  return localStorage.getItem('mw_user');
}

export function getCurrentEmoji() {
  return localStorage.getItem('mw_emoji') || '👤';
}

// Check if user is authenticated
export async function isAuthenticated() {
  const session = await getSession();
  return !!session;
}

// Require auth — redirect to login if not authenticated
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    window.location.href = 'index.html';
  }
}

// Sign in with email and password
export async function signIn(email, password) {
  const { data, error } = await db.auth.signInWithPassword({ email, password });
  if (error) throw error;

  // Update last_seen and cache profile locally
  const { data: profile } = await db
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (profile) {
    localStorage.setItem('mw_user', profile.name);
    localStorage.setItem('mw_emoji', profile.emoji);
    await db.from('profiles').update({ last_seen: new Date().toISOString() }).eq('id', data.user.id);
  }

  return data;
}

// Sign out
export async function signOut() {
  await db.auth.signOut();
  localStorage.removeItem('mw_user');
  localStorage.removeItem('mw_emoji');
  window.location.href = 'index.html';
}