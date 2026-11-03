# BlogSphere

A full-stack MERN blogging platform with JWT authentication, blog CRUD, image URLs, likes, comments, search and categories.

## Requirements
- Node.js 20+ and npm
- MongoDB Atlas database (or local MongoDB)

## Setup
1. Configure `backend/.env` using `backend/.env.example`.
2. Configure `frontend/.env` using `frontend/.env.example`.
3. In one terminal: `cd backend && npm install && npm run dev`
4. In another terminal: `cd frontend && npm install && npm run dev`
5. Open the Vite URL .

Backend runs on port  by default. Frontend API URL defaults to.

## Notes
- Blog cover images and profile images use publicly accessible image URLs.
- JWT is stored in localStorage for this learning project. For production, consider secure, httpOnly cookies and additional security hardening.
- Never commit `.env` files or expose your MongoDB URI/JWT secret.
