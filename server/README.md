# ⚙️ QuoBlog Server

Backend API for **QuoBlog**, a modern AI-powered blogging platform.
This server handles authentication, blog management, image uploads, email services, and AI content generation.

---

## 🚀 Features

* 🔐 JWT Authentication
* 📝 Blog CRUD APIs
* 🤖 AI Blog Generation (Google GenAI)
* 🖼️ Image Upload (ImageKit + Multer)
* 📧 Email Service (Nodemailer)
* 🛡️ Security (Helmet, CORS)
* 🌍 Geo Location Tracking
* 🍪 Cookie-based authentication
* 📦 Request Compression
* 📍 IP detection
* ✅ Request validation using Joi
* 🗄️ MongoDB Database (Mongoose)

---

## 🛠️ Tech Stack

* Node.js
* Express.js 5
* MongoDB
* Mongoose
* Google GenAI
* ImageKit
* Nodemailer
* JWT Authentication
* Joi Validation

---

## 🔐 Authentication

* JWT Token based authentication
* Token stored in cookies
* Protected routes using middleware

---

## 📝 API Features

### Auth APIs

* Register User
* Login User
* Logout User
* Verify User

### Blog APIs

* Create Blog
* Get All Blogs
* Get Single Blog
* Update Blog
* Delete Blog

### AI APIs

* Generate Blog Content
* Generate Title
* Generate Summary

---

## 🖼️ Image Upload

* Multer for file handling
* ImageKit for cloud storage
* Supports:

  * Blog cover image
  * Editor images

---

## 🛡️ Security

* Helmet for secure headers
* CORS protection
* Cookie parser
* Request validation using Joi
* Compression for performance

---

## 🌍 Additional Features

* Geo location detection
* IP address tracking
* Request compression
* Rate-safe middleware ready

---

## 👨‍💻 Author

**Shubham Tiwari**

---

⭐ If you like this project, give it a star!
