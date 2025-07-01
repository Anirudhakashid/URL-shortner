# URL Shortener

A full-stack URL shortener built with React, Tailwind CSS, Shadcn UI, and Supabase.

## Features

- Paste any URL and get a short link instantly  
- Responsive UI with React + Tailwind + Shadcn UI  
- QR Code generation for each shortened URL  
- Downloadable QR Code image for sharing or printing  
- View URL insights like total click count, device information etc.  
- 🚨 Google Safe Browsing check to block malicious or phishing URLs  

## 🔒 URL Safety Check with Google Safe Browsing API

To enhance user safety, the app integrates Google Safe Browsing API.  
Before shortening a URL, it is checked against Google's threat database for:

- Malware
- Social Engineering (Phishing)
- Unwanted Software
- Potentially Harmful Applications

If a URL is flagged as unsafe, users will receive an error message, and the short link will not be created.

> This feature is active in both development and production environments.  
> The Google API key is secured via environment variables and referrer restrictions.


  
## Tech Stack

**Frontend:** React.js, TailwindCSS, Shadcn UI

**Backend:** Supabase (Backend-as-a-Service)

**Database:**  Supabase PostgreSQL

## Demo

https://bitsnip.vercel.app/
