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
    <div>
      {/* Title  */}

      {/* Screen  */}
      {/* Seat Map  */}
      {/* Legend  */}
      {/* Summary  */}
      {/* Booking Button  */}
    </div>
  );
};

export default CinemaSeatBooking;
