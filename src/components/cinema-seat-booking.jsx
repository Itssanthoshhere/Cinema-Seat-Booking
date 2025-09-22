import React, { useMemo, useState } from "react";

const CinemaSeatBooking = ({
  layout = {
    rows: 8,
    seatsPerRow: 12,
    aislePosition: 5,
  },
  seatTypes = {
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

  const getSeatType = (row) => {
    // TODO: Implement seat type logic based on row
    const seatTypeEntries = Object.entries(seatTypes);

    for (let i = 0; i < seatTypeEntries.length; i++) {
      const [type, config] = seatTypeEntries[i];

      if (config.rows.includes(row)) {
        const color = colors[i % colors.length];
        return { type, color, ...config };
      }
    }

    const [firstType, firstConfig] = seatTypeEntries[0];
    return { type: firstType, color: colors[0], ...firstConfig };
  };

  const initializeSeats = useMemo(() => {
    const seats = [];
    for (let row = 0; row < layout.rows; row++) {
      const seatRow = [];
      const seatTypeInfo = getSeatType(row);

      for (let seat = 0; seat < layout.seatsPerRow; seat++) {
        const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`; // 65 -> A;

        seatRow.push({
          id: seatId,
          row,
          seat,
          type: seatTypeInfo?.type || "regular",
          price: seatTypeInfo?.price || 150,
          color: seatTypeInfo?.color || "blue",
          status: bookedSeats.includes(seatId) ? "booked" : "available",
          selected: false,
        });
      }

      seats.push(seatRow);
    }
    return seats;
  }, [layout, seatTypes, bookedSeats]);

  const [seats, setSeats] = useState(initializeSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const getColorClass = (colorName) => {
    const colorMap = {
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
    return colorMap[colorName] || colorMap.blue;
  };

  const getSeatClassName = (seat) => {
    const baseClass =
      "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h12 m-1 rounded-t-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center text-xs sm:text-sm font-bold bg-blue-100 border-blue-300 text-blue-800";

    // more conditions...
    if (seat.status === "booked") {
      return `${baseClass} bg-gray-400 border-gray-500 text-gray-600 cursor-not-allowed`;
    }

    if (seat.selected) {
      return `${baseClass} bg-green-500 border-green-600 text-white transform scale-110`;
    }

    return `${baseClass} ${getColorClass(seat.color)}`;
  };

  const handleSeatClick = (rowIndex, seatIndex) => {
    // TODO: Implement seat click logic
  };

  const renderSeatSection = (seatRow, startIndex, endIndex) => {
    return (
      <div className="flex">
        {seatRow.slice(startIndex, endIndex).map((seat, index) => {
          return (
            <div
              className={getSeatClassName(seat)}
              key={seat.id}
              title={`${seat.id} - $ {
            getSeatType(seat.row)?.name || "Regular
            } - ${currency}${seat.price}`}
              onClick={() => handleSeatClick(seat.row, startIndex + index)}
            >
              {startIndex + index + 1}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      {/* Title  */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-center mb-2 text-gray-800">
          {title}
        </h1>
        <p className="text-center text-gray-600 mb-6">{subtitle}</p>

        {/* Screen  */}
        <div className="mb-8">
          <div className="w-full h-4 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-lg mb-2 shadow-inner" />
          <p className="text-center text-sm to-gray-500 font-medium">SCREEN</p>
        </div>

        {/* Seat Map  */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex flex-col items-center min-w-max">
            {seats.map((row, rowIndex) => {
              return (
                <div key={rowIndex} className="flex items-center mb-2">
                  <span className="w-8 text-center font-bold text-gray-600 mr-4">
                    {String.fromCharCode(65 + rowIndex)}
                  </span>
                  {renderSeatSection(row, 0, layout.aislePosition)}
                  {/* Aisle  */}
                  <div className="w-8"></div>
                  {renderSeatSection(
                    row,
                    layout.aislePosition,
                    layout.seatsPerRow
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend  */}
      {/* Summary  */}
      {/* Booking Button  */}
    </div>
  );
};

export default CinemaSeatBooking;
