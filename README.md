# Airbnb-Clone 🏡

## Tech Stack 🚀
- **Frontend:** Next.js, Tailwind CSS 🎨
- **Backend:** Python, Django, FastAPI ⚙️
- **Database:** MySQL 🗄️
- **Scraper:** Scrapy 🕷️

---

## Project Overview 🌍
This Airbnb Clone is a full-stack application that replicates core functionalities of Airbnb. The project consists of:
- A **Django REST Framework (DRF) backend** for managing listing data. 🛠️
- A **web scraper** using Scrapy to extract Airbnb listing data. 🔍
- A **Next.js frontend** styled with Tailwind CSS to display listings. 🏠

---

## Backend (Django REST Framework) 🔧
### API Endpoints
#### 1. GET API 📥
- Retrieves Airbnb listing data from the MySQL database and returns it as a response.

#### 2. POST API 📤
- Accepts a request to insert new Airbnb listing data into the MySQL database.

#### 3. Additional APIs ➕
- More endpoints can be added as needed for extended functionalities.

---

## Scraper (Scrapy) 🕵️‍♂️
A Scrapy-based web scraper is implemented to gather Airbnb listings directly from the Airbnb website.

### Data Fields Collected 📋
The scraper extracts the following details from Airbnb listings:
- 🏠 Listing Title
- 📍 Location
- 🏢 Address
- 💲 Price per night
- 💱 Currency
- 🏷️ Total Price
- 🖼️ Image URLs
- ⭐ Ratings
- 📝 Description
- 🗣️ Number of Reviews
- ✅ Available Amenities
- 👤 Host Information
- 🏡 Property Type

### Input Parameters 🎯
- 📌 Location
- 📆 Check-in Date
- 📆 Check-out Date
- 👥 Number of Guests

### Handling Pagination & API Calls 🔄
- The scraper is designed to handle pagination effectively.
- It identifies and utilizes Airbnb’s API calls to optimize data retrieval.

### POST Request to Backend 🔗
Once the scraper gathers listing data, it sends a POST request to the Django backend to store it in the MySQL database.

## Frontend (Next.js with Tailwind CSS) 🎨
### User Interface 💻
- Developed using **Next.js** and styled with **Tailwind CSS**.
- The UI aims to closely resemble the Airbnb website.

### Pages Implemented 📄
1. **🔎 Search Results Page**
2. **📑 Listing Details Page**

### Features ✨
- Displays Airbnb listings retrieved from the backend via a **GET request**.
- Users can search for listings using:
  - 📌 Location
  - 📆 Check-in Date
  - 📆 Check-out Date
  - 👥 Number of Guests
  - 💰 Price Range
  - ⭐ Ratings

### Notes 📝
- ❌ No map integration is required.
- 🏗️ The interface is designed for an optimal user experience with structured data presentation.

---

## Installation & Setup ⚙️
### Prerequisites 📌
- 📦 Node.js & npm (for the frontend)
- 🐍 Python & pip (for the backend and scraper)
- 🗄️ MySQL (for the database)

### Backend Setup 🔧
1. 📂 Clone the repository
2. 📁 Navigate to the backend directory
3. 📦 Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. 🔄 Run migrations:
   ```bash
   python manage.py migrate
   ```
5. ▶️ Start the Django server:
   ```bash
   python manage.py runserver
   ```

### Scraper Setup 🕷️
1. 📁 Navigate to the scraper directory
2. 📦 Install dependencies:
   ```bash
   pip install scrapy
   ```
3. ▶️ Run the scraper:
   ```bash
   scrapy crawl airbnb_spider
   ```

### Frontend Setup 🖥️
1. 📁 Navigate to the frontend directory
2. 📦 Install dependencies:
   ```bash
   npm install
   ```
3. ▶️ Run the Next.js development server:
   ```bash
   npm run dev
   ```

---

## Conclusion 🎯
This Airbnb Clone is a scalable full-stack application with a robust backend, an efficient web scraper, and an intuitive frontend. Future improvements can include user authentication, booking functionality, and more detailed search filters. 🚀
