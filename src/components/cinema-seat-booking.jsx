import React, { useMemo, useState } from "react";

const CinemaSeatBooking = ({
  layout = { rows: 8, seatsPerRow: 12, aislePosition: 5 }, // Default layout: 8 rows, 12 seats per row, aisle after 5 seats
  seatTypes = {
    regular: { name: "Regular", price: 150, rows: [0, 1, 2] },
    premium: { name: "Premium", price: 250, rows: [3, 4, 5] },
    vip: { name: "VIP", price: 350, rows: [6, 7] },
  },
  bookedSeats = [], // Array of seat IDs already booked
  currency = "₹", // Currency symbol
  onBookingComplete = () => {}, // Callback after booking
  title = "Cinema Hall Booking",
  subtitle = "Select your preferred seats",
}) => {
  // Tailwind colors to differentiate seat types
  const colors = [
    "blue",
    "purple",
    "yellow",
    "green",
    "red",
    "indigo",
    "pink",
    "gray",
  ];

  // State to store seat grid, selected seats, last booking info, and messages
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [lastBooking, setLastBooking] = useState(null);
  const [message, setMessage] = useState(null); // For inline notifications

  // Function to determine seat type for a row
  const getSeatType = (row) => {
    const entries = Object.entries(seatTypes);
    for (let i = 0; i < entries.length; i++) {
      const [type, config] = entries[i];
      if (config.rows.includes(row))
        return { type, color: colors[i % colors.length], ...config };
    }
    // Default to first type if no match
    const [firstType, firstConfig] = entries[0];
    return { type: firstType, color: colors[0], ...firstConfig };
  };

  // Initialize seat grid
  const initializeSeats = useMemo(() => {
    const grid = [];
    for (let row = 0; row < layout.rows; row++) {
      const seatRow = [];
      const seatTypeInfo = getSeatType(row);

      for (let seat = 0; seat < layout.seatsPerRow; seat++) {
        const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`; // Seat ID like "A1", "B3"
        seatRow.push({
          id: seatId,
          row,
          seat,
          type: seatTypeInfo.type,
          price: seatTypeInfo.price,
          color: seatTypeInfo.color,
          status: bookedSeats.includes(seatId) ? "booked" : "available", // mark as booked if in bookedSeats array
          selected: false, // initially not selected
        });
      }

      grid.push(seatRow);
    }
    return grid;
  }, [layout, seatTypes, bookedSeats]);

  // Populate seat grid state when component mounts
  React.useEffect(() => {
    setSeats(initializeSeats);
  }, [initializeSeats]);

  // Tailwind color classes mapping
  const getColorClass = (color) => {
    const map = {
      blue: "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200",
      purple:
        "bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200",
      yellow:
        "bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200",
      green: "bg-green-100 border-green-300 text-green-800 hover:bg-green-200",
      red: "bg-red-100 border-red-300 text-red-800 hover:bg-red-200",
      indigo:
        "bg-indigo-100 border-indigo-300 text-indigo-800 hover:bg-indigo-200",
      pink: "bg-pink-100 border-pink-300 text-pink-800 hover:bg-pink-200",
      gray: "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200",
    };
    return map[color] || map.blue;
  };

  // Return class names for each seat based on its status
  const getSeatClassName = (seat) => {
    const base =
      "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 m-1 rounded-t-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center text-xs sm:text-sm font-bold";

    if (seat.status === "booked")
      return `${base} bg-gray-400 border-gray-500 text-gray-600 cursor-not-allowed`;
    if (seat.selected)
      return `${base} bg-green-500 border-green-600 text-white transform scale-110`;

    return `${base} ${getColorClass(seat.color)}`;
  };

  // Handle seat click to select/deselect
  const handleSeatClick = (rowIndex, seatIndex) => {
    const seat = seats[rowIndex][seatIndex];
    if (seat.status === "booked") return; // cannot select booked seat

    // Toggle selection in seats state
    setSeats((prev) =>
      prev.map((row, rIdx) =>
        row.map((s, sIdx) =>
          rIdx === rowIndex && sIdx === seatIndex
            ? { ...s, selected: !s.selected }
            : s
        )
      )
    );

    // Add/remove seat in selectedSeats array
    if (!seat.selected) setSelectedSeats((prev) => [...prev, seat]);
    else setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
  };

  // Render a section of seats (used to split by aisle)
  const renderSeatSection = (seatRow, start, end) => (
    <div className="flex">
      {seatRow.slice(start, end).map((seat, idx) => (
        <div
          key={seat.id}
          className={getSeatClassName(seat)}
          title={`${seat.id} - ${getSeatType(seat.row).name} - ${currency}${
            seat.price
          }`}
          onClick={() => handleSeatClick(seat.row, start + idx)}
        >
          {start + idx + 1}
        </div>
      ))}
    </div>
  );

  // Generate legend for seat types
  const uniqueSeatTypes = Object.entries(seatTypes).map(
    ([type, config], idx) => ({
      type,
      color: colors[idx % colors.length],
      ...config,
    })
  );

  // Calculate total price for selected seats
  const getTotalPrice = () =>
    selectedSeats.reduce((total, seat) => total + seat.price, 0);

  // Handle booking confirmation
  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      setMessage({ type: "error", text: "Please select at least one seat" }); // inline error
      return;
    }

    const bookingDetails = {
      seats: selectedSeats,
      totalPrice: getTotalPrice(),
      seatIds: selectedSeats.map((s) => s.id),
    };

    // Mark seats as booked
    setSeats((prev) =>
      prev.map((row) =>
        row.map((seat) =>
          bookingDetails.seatIds.includes(seat.id)
            ? { ...seat, status: "booked", selected: false }
            : seat
        )
      )
    );

    // Call booking callback, reset selection, show success message
    onBookingComplete(bookingDetails);
    setLastBooking(bookingDetails);
    setSelectedSeats([]);
    setMessage({
      type: "success",
      text: `Successfully booked ${bookingDetails.seats.length} seat(s) for ${currency}${bookingDetails.totalPrice}`,
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Title & Subtitle */}
        <h1 className="text-2xl lg:text-3xl font-bold text-center mb-2 text-gray-800">
          {title}
        </h1>
        <p className="text-center text-gray-600 mb-6">{subtitle}</p>

        {/* Screen Representation */}
        <div className="mb-8">
          <div className="w-full h-4 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-lg mb-2 shadow-inner" />
          <p className="text-center text-sm text-gray-500 font-medium">
            SCREEN
          </p>
        </div>

        {/* Seat Grid */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex flex-col items-center min-w-max">
            {seats.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center mb-2">
                <span className="w-8 text-center font-bold text-gray-600 mr-4">
                  {String.fromCharCode(65 + rowIndex)}
                </span>
                {renderSeatSection(row, 0, layout.aislePosition)}
                <div className="w-8"></div>
                {renderSeatSection(
                  row,
                  layout.aislePosition,
                  layout.seatsPerRow
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Inline Message for Success/Error */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
          {uniqueSeatTypes.map((seatType) => (
            <div key={seatType.type} className="flex items-center">
              <div
                className={`w-6 h-6 border-2 rounded-t-lg mr-2 ${getColorClass(
                  seatType.color
                )}`}
              ></div>
              <span className="text-sm">
                {seatType.name} ({currency}
                {seatType.price})
              </span>
            </div>
          ))}
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 border-2 border-green-600 rounded-t-lg mr-2"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-400 border-2 border-gray-500 rounded-t-lg mr-2"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h3 className="font-bold text-lg mb-2">Booking Summary</h3>
          {selectedSeats.length > 0 ? (
            <div>
              <p className="mb-2">
                Selected Seats:{" "}
                <span className="font-medium">
                  {selectedSeats.map((s) => s.id).join(", ")}
                </span>
              </p>
              <p className="mb-2">
                Number of Seats:{" "}
                <span className="font-medium">{selectedSeats.length}</span>
              </p>
              <p className="text-xl font-bold text-green-600">
                Total: {currency}
                {getTotalPrice()}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No seats selected</p>
          )}
        </div>

        {/* Book Button */}
        <button
          onClick={handleBooking}
          disabled={selectedSeats.length === 0}
          className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all duration-200 ${
            selectedSeats.length > 0
              ? "bg-green-500 hover:bg-green-600 text-white transform hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {selectedSeats.length > 0
            ? `Book ${
                selectedSeats.length
              } Seat(s) - ${currency}${getTotalPrice()}`
            : lastBooking
            ? `Booked ${lastBooking.seatIds.join(", ")} ✅`
            : "Select Seats to Book"}
        </button>
      </div>
    </div>
  );
};

export default CinemaSeatBooking;
