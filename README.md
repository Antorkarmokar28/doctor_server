# 🏥 Doctor–Patient Appointment Management System (REST API)

This is a role-based REST API built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**, designed to manage doctor–patient appointments. The system enables doctors to register, add services, set availability, and manage appointments, while patients can register, browse doctors, and book appointments.

## 🚀 Live Demo & Resources

- 🔗 **Live Server**: (https://doctor-server-beige.vercel.app/)
- 📮 **Postman Collection**: (https://drive.google.com/file/d/18CgczSC4JqK5qhMm27XmaxEbfhzGBnht/view?usp=sharing)
- 🧑‍💻 **GitHub Repo**: https://github.com/Antorkarmokar28/doctor_server.git

---

## 🧩 Features Overview

### 👨‍⚕️ Doctor Role

- Register/Login
- Add/edit/delete services
- Set availability per service
- View and manage appointment requests

### 👩‍⚕️ Patient Role

- Register/Login
- Browse doctors by hospital, specialization, or service
- View doctor details, availability
- Book appointment
- Track appointment status

### 🛡 Authentication

- JWT-based auth system
- Role-based route protection (Doctor, Patient)
- Passwords hashed with `bcryptjs`

---

## 📦 Tech Stack

| Technology | Description |
|------------|-------------|
| Node.js + Express | Server-side framework |
| TypeScript | Type safety |
| MongoDB + Mongoose | NoSQL database |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Zod | Validation |
| Cloudinary (optional) | Image upload |
| Postman | API testing |

---

## 📁 Project Structure


---

## 🛠️ Installation & Setup

```bash
git clone https://github.com/your-username/doctor-appointment-api.git
cd doctor-appointment-api
npm install

npm run dev    # for development
npm run build  # for production
npm start      # run production build
