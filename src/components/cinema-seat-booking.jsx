import React from "react";

const CinemaSeatBooking = ({
  layout = {
    rows: 8,
    seatsPerRow: 12,
    aislePosition: 5,
  },
  seatType = {
    regular: { name: "Regular", price: 150, rows: [0, 1, 2] },
    premium: { name: "Premium", price: 250, rows: [3, 4, 5] },
    vip: { name: "VIP", price: 350, rows: [6, 7] },
  },
  bookedSeats = [],
  currency = "₹",
  onBookingComplete = () => {},
  title = "Cinema Hall Booking",
  subtitle = "Select your preferred seats",
}) => {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      {/* Title  */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-center mb-2 text-gray-800">
          {title}
        </h1>
        <p className="text-center text-gray-600 mb-6">{subtitle}</p>
      </div>

      {/* Screen  */}
      {/* Seat Map  */}
      {/* Legend  */}
      {/* Summary  */}
      {/* Booking Button  */}
    </div>
  );
};

export default CinemaSeatBooking;
