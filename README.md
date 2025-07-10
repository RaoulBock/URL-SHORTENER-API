# 🔗 URL Shortener with Expiry - Node.js, Express, MongoDB

A simple and powerful URL shortener built with Node.js, Express, and MongoDB.  
Supports custom short URLs that automatically expire after a specified time — like `30m`, `2h`, or `3d`.

---

## 🚀 Features

- ✅ Shorten any long URL
- 🕒 Set custom expiry (e.g. 10s, 5m, 2h, 3d)
- 🔁 Auto-redirect to original URL when short URL is visited
- 🗑️ Expired links are automatically deleted using MongoDB TTL

---

## 🛠 Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- `nanoid` for short ID generation
- `ms` for parsing human-readable expiry durations

---

## 📦 Installation

```bash
git clone https://github.com/raoulbock/url-shortener.git
cd url-shortener
npm install
