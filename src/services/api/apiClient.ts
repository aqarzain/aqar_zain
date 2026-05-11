const API_BASE = 'https://kenneth-italic-sql-lamb.trycloudflare.com/api';

export const api = {
  get: (url: string) => fetch(API_BASE + url, {
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
  }).then(r => r.json()),
};
