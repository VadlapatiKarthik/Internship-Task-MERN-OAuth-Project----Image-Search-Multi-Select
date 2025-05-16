# Image Search & Multi-Select App

A MERN stack application with OAuth login and Unsplash image search, plus multi-select and search history.

---

## Table of Contents

1. [Features](#features)  
2. [Prerequisites](#prerequisites)  
3. [Setup & Installation](#setup--installation)  
4. [Folder Structure](#folder-structure)  
5. [Environment Variables](#environment-variables)  
6. [Running the App](#running-the-app)  
7. [API Endpoints](#api-endpoints)  
8. [cURL Examples](#curl-examples)  

---

## Features

- OAuth via Google, Facebook, GitHub  
- Unsplash photo search (20 images per query)  
- Multi-select images with checkboxes  
- Personal search history  
- Top-5 global search terms banner  

---

## Prerequisites

- Node.js & npm  
- MongoDB (local or Atlas)  
- OAuth credentials for Google, Facebook, GitHub  
- Unsplash API Access Key  

---

## Setup & Installation

1. **Clone repo**  
   
   git clone https://github.com/<your-username>/image-search-app.git
   cd image-search-app

2. **Server**
    
cd server
cp .env.example .env
# Edit .env with your credentials (see below)
npm install
npm run dev
# Server: http://localhost:

3. **Client**

cd ../client
npm install
npm start
# App: http://localhost:3000


image-search-app/
├── client/     # React front-end
│   ├── public/   # index.html
│   └── src/      # Components and API calls
└── server/     # Express back-end
    ├── config/    # Passport OAuth strategies
    ├── models/    # Mongoose schemas
    └── routes/    # Auth & search API endpoints

