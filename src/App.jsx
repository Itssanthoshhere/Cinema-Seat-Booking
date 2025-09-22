import "./App.css";
import CinemaSeatBooking from "./components/cinema-seat-booking";

// Main App component
function App() {
  return (
    // Render the CinemaSeatBooking component with props
    <CinemaSeatBooking
      layout={{
        rows: 8, // Number of seat rows
        seatsPerRow: 12, // Number of seats per row
        aislePosition: 5, // Position of the aisle (after seat 5)
      }}
      seatTypes={{
        regular: { name: "Regular", price: 150, rows: [0, 1, 2] }, // Rows A-C
        premium: { name: "Premium", price: 250, rows: [3, 4, 5] }, // Rows D-F
        vip: { name: "VIP", price: 350, rows: [6, 7] }, // Rows G-H
      }}
      bookedSeats={["C2", "C4"]} // Pre-booked seats
      onBookingComplete={(booking) => console.log(booking)} // Callback for booking completion
    />
  );
}

export default App;
