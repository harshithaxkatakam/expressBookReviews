# 📚 Online Book Review Application  

## 🚀 Project Overview  
This is a **Node.js & Express.js**-based **RESTful web service** designed for an **online bookstore** where users can browse, search, and review books.  
This project was built as part of the **IBM Full Stack Software Developer Professional Certificate** and focuses on **backend development, authentication, and CRUD operations**.  

🔗 **Live API Demo (If Hosted):** [YOUR_DEPLOYMENT_URL]  
🔗 **GitHub Repository:** [YOUR_GITHUB_REPO_URL]  

## 📌 Features & Capabilities  

### ✅ General Users:  
- 📖 Retrieve a **list of all books** available in the store  
- 🔍 Search for books **by ISBN, author, or title**  
- 📝 View **book reviews**  

### ✅ Registered Users:  
- 🔑 **Register/Login** to access additional features  
- 🖊️ **Add/Edit/Delete book reviews** (only for their own reviews)  

### ✅ Backend Development Focus:  
- 📡 **RESTful API** built using **Node.js & Express.js**  
- 🔐 **JWT & Session Authentication** for user access control  
- ⚡ Uses **Async/Await & Promises** for non-blocking operations  
- 📂 **Preloaded book database** for seamless API functionality  
- 🤝 **Multi-user support** for simultaneous review management  

## 🛠️ Technologies Used  
- **Node.js & Express.js** – Backend framework  
- **MongoDB (or JSON File/Local Storage)** – Data storage  
- **JWT & Session Authentication** – Secure user authentication  
- **Axios & Fetch API** – Handling API requests  
- **Postman** – API testing  

## 📂 API Endpoints & Implementation  

### 🔹 Public Routes (General Users)  

| HTTP Method | Endpoint               | Description                          |
|------------|-----------------------|--------------------------------------|
| **GET**    | `/books`               | Retrieve the list of all books       |
| **GET**    | `/books/isbn/:isbn`    | Retrieve book details by ISBN        |
| **GET**    | `/books/author/:author`| Get all books by a specific author   |
| **GET**    | `/books/title/:title`  | Get all books matching a title       |
| **GET**    | `/books/review/:isbn`  | Get book reviews for a specific ISBN |

### 🔹 Authentication Routes  

| HTTP Method | Endpoint    | Description               |
|------------|------------|---------------------------|
| **POST**   | `/register` | Register a new user       |
| **POST**   | `/login`    | Login a registered user   |

### 🔹 Protected Routes (Requires Authentication)  

| HTTP Method | Endpoint               | Description                                  |
|------------|-----------------------|----------------------------------------------|
| **POST**   | `/books/review/:isbn`  | Add a new book review                        |
| **PUT**    | `/books/review/:isbn`  | Modify an existing review (Only own review)  |
| **DELETE** | `/books/review/:isbn`  | Delete a review (Only own review)            |

## ⚙️ Installation & Setup  

### **1️⃣ Clone the Repository**  
```sh
git clone YOUR_GITHUB_REPO_URL
cd expressBookReviews
