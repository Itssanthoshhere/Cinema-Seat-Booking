<div align="center"> <br /> 
<a href="https://github.com/Itssanthoshhere/Cinema-Seat-Booking" target="_blank"> 
<img src="/public/cinemaThumbnail.png" alt="Project Banner"> 
</a> <br /> 
<div>
<img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
<img src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
</div>

<div align="center"> 
<h3>🎬 Cinema Seat Booking – Interactive React Component</h3> 
A <b>modern and responsive seat booking system</b> with dynamic layouts, seat categories, pricing, and booking flow built using <b>React.js and TailwindCSS</b>.<br/> 
<i>Perfect for cinema halls, events, and theater seat reservation systems.</i> 
</div> <br />

<a href="https://cinemaseatbooking.vercel.app/" target="_blank"> 
<img src="https://img.shields.io/badge/🚀%20Live%20Demo-brightgreen?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /> 
</a> 
<br /> 
</div>

---

## 📋 Table of Contents

1. ✨ [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🧱 [Project Structure](#project-structure)
6. 📝 [Customization](#customization)
7. 🤝 [Contribution](#contribution)
8. 🔗 [Contacts](#contacts)
9. 📄 [License](#license)
10. 🙏 [Acknowledgements](#acknowledgements)

---

## ✨ Introduction

**CinemaSeatBooking** is an interactive and customizable seat booking component built in **React**. It features:

- **Seat selection with categories (Regular, Premium, VIP)**
- **Dynamic pricing and booking summary**
- **Aisle separation and booked seat management**
- **Customizable layout, seat pricing, and booking callbacks**

It’s ideal for use in **cinema halls, theater reservations, or event booking platforms**.

---

## ⚙️ Tech Stack

#### ⚡ Core Technologies

- **React.js** – Component-based UI
- **TailwindCSS** – Modern utility-first styling
- **JavaScript (ES6+)** – State management and interactivity

#### 🧹 Tooling

- **Vite / CRA** – Fast development with hot reload
- **VS Code** – Development environment

---

## 🔋 Features

- 🎟️ **Dynamic Seat Map** – Rows, seats per row, and aisle separation
- 🎨 **Seat Categories** – Regular, Premium, VIP (customizable)
- 💸 **Booking Summary** – Selected seats, seat count, and total price
- 🚫 **Booked Seat Handling** – Disable unavailable seats
- ⚡ **Interactive UI** – Click-to-select seats with animations
- 📱 **Responsive Design** – Works across devices
- 🟢 **Inline Notifications** – Shows success/error messages instead of alerts
- ✅ **Post-Booking Status** – Button shows booked seat IDs after completion

---

## 🤸 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Clone the Project

```bash
git clone https://github.com/Itssanthoshhere/Cinema-Seat-Booking.git
cd Cinema-Seat-Booking
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

---

## 🧱 Project Structure

| File/Folder             | Description                              |
| ----------------------- | ---------------------------------------- |
| `App.jsx`               | Entry point with demo usage              |
| `components/`           | Contains the CinemaSeatBooking component |
| `CinemaSeatBooking.jsx` | Main seat booking component              |
| `assets/`               | Images or thumbnails                     |
| `README.md`             | Documentation                            |

---

## 📝 Customization

- Change **seat layout** (rows, seats per row, aisle position):

```jsx
layout={{
  rows: 8,
  seatsPerRow: 12,
  aislePosition: 5,
}}
```

- Update **seat categories and pricing**:

```jsx
seatTypes={{
  regular: { name: "Regular", price: 150, rows: [0, 1, 2] },
  premium: { name: "Premium", price: 250, rows: [3, 4, 5] },
  vip: { name: "VIP", price: 350, rows: [6, 7] },
}}
```

- Predefine **booked seats**:

```jsx
bookedSeats={["C2", "C4"]}
```

- Capture **booking completion**:

```jsx
onBookingComplete={(booking) => console.log(booking)}
```

---

## 🤝 Contribution

Contributions are welcome! You can:

1. Fork the repo
2. Create a new branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Commit (`git commit -m 'feat: my feature'`)
5. Push (`git push origin feature/my-feature`)
6. Create a Pull Request

---

## 🔗 Contacts

- GitHub: [Itssanthoshhere](https://github.com/Itssanthoshhere)
- LinkedIn: [Santhosh VS](https://www.linkedin.com/in/thesanthoshvs/)

---

## 📄 License

This project is for **educational and portfolio purposes**.
All rights for logos, assets, and branding belong to their respective owners.

---

## 🙏 Acknowledgements

- [React](https://reactjs.org/) – For the component-based UI
- [TailwindCSS](https://tailwindcss.com/) – For styling utilities
- [Vercel](https://vercel.com/) – For live deployment

---

#### ⭐ Show Your Support

If you liked this project, **give it a ⭐** and share it with your network!

---
