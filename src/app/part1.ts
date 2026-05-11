// API Configuration
const API = 'https://kenneth-italic-sql-lamb.trycloudflare.com/api';
const api = {
  get: (url: string) => fetch(API + url, { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` } }).then(r => r.json()),
  post: (url: string, data?: any) => fetch(API + url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }, body: JSON.stringify(data) }).then(r => r.json()),
};
