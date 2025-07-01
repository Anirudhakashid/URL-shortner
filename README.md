# 🔗 BitSnip — Smart URL Shortener

BitSnip is a modern and responsive URL shortener built with React, Vite, Tailwind, and Shadcn UI.  
It allows users to shorten URLs, generate QR codes, and track analytics — with added security using Google's Safe Browsing API.

---

## ✨ Features

- 🔗 Paste any URL and get a short link instantly  
- 📱 Responsive UI built with React + Tailwind + Shadcn UI  
- 📸 QR Code generation for every shortened URL  
- 📥 Downloadable QR Code for sharing or printing  
- 📊 View analytics: total clicks, device type, location, etc.  
- 🚨 **Google Safe Browsing check to block malicious or phishing URLs**

---

## 🔒 URL Safety with Google Safe Browsing

To protect users and prevent abuse, BitSnip integrates with the [Google Safe Browsing API](https://developers.google.com/safe-browsing).  
Before shortening any URL, the app checks it against Google’s threat database for:

- Malware  
- Phishing (Social Engineering)  
- Unwanted Software  
- Potentially Harmful Applications  

If a URL is flagged, users will see an error, and the short link will **not be created**.

✅ This feature is active in both development and production.

---

## 🧪 Test It Yourself

Try this **dummy malicious URL** (provided by Google for testing): http://malware.testing.google.test/testing/malware/ on the live **App** [https://bitsnip.vercel.app/](https://bitsnip.vercel.app/)

