// 📂 js/latte-core.js
// -------------------------------------------------------
// THE BRAIN: Firebase Config, API Connections, and Utilities
// -------------------------------------------------------

// 1. FIREBASE CONFIGURATION (The Database Connection)
const firebaseConfig = {
  apiKey: "AIzaSyDybtjN7KOTqUZaDCdHZfdWrp-5uDVdyXo",
  authDomain: "see-you-latte.firebaseapp.com",
  databaseURL: "https://see-you-latte-default-rtdb.firebaseio.com",
  projectId: "see-you-latte",
  storageBucket: "see-you-latte.firebasestorage.app",
  messagingSenderId: "644237340944",
  appId: "1:644237340944:web:ac945789eb288ee4ea7595",
  measurementId: "G-V0724QM00R"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();
const storage = firebase.storage();

// 2. API CONFIGURATION (The Gemini Connection)
const PROXY_URL = 'https://project-thomas-version1.vercel.app/api/chat';
const DEFAULT_PROMPT = ``;

// 3. SHARED UTILITIES (Logic used across pages)

// Generate a unique ID for new rooms
function generateId() {
  return 'room_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Markdown Parser (Used in Chat and Search)
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m];
  });
}

function parseMarkdown(text) {
  if (!text) return '';
  let html = escapeHTML(text);
  
  // ***bold+italic***
  html = html.replace(/\*\*\*([^\*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
  // **bold**
  html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
  // *italic*
  html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
  // `code`
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Images: ![alt](url)
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" onclick="viewImage(event)" class="chat-image">');
  // Links: [text](url)
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

  return html;
}

// Navigation Helper
function navigateTo(url) {
  window.location.href = url;
}