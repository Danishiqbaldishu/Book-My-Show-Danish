import React, { useState } from "react";

const SeatBookingModal = ({ show, onClose, onSubmit }) => {
  // State to manage selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Dummy data for available seats (can be fetched from an API)
  const availableSeats = [
    { id: 1, row: "A", number: 1 },
    { id: 2, row: "A", number: 2 },
    { id: 3, row: "A", number: 3 },
    { id: 4, row: "A", number: 4 },
    { id: 5, row: "A", number: 5 },
    { id: 6, row: "A", number: 6 },
    { id: 7, row: "A", number: 7 },
    { id: 8, row: "A", number: 8 },
    { id: 9, row: "B", number: 1 },
    { id: 10, row: "B", number: 2 },
    { id: 11, row: "B", number: 3 },
    { id: 12, row: "B", number: 4 },
    { id: 13, row: "B", number: 5 },
    { id: 14, row: "B", number: 6 },
    { id: 15, row: "B", number: 7 },
    { id: 16, row: "B", number: 8 },
    // Add more seats as needed
  ];

  // Function to handle seat selection
  const handleSeatSelect = (seat) => {
    // Toggle selection of the seat
    const isSelected = selectedSeats.some((s) => s.id === seat.id);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // Function to check if a seat is already booked
  const isSeatBooked = (seat) => {
    return selectedSeats.some((s) => s.id === seat.id);
  };

  // Function to handle confirmation
  const handleConfirm = () => {
    // Pass the selected seats to the parent component
    onSubmit(selectedSeats);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${
        show ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-2">Select Seats</h2>
        <div className="flex flex-wrap justify-center">
          {availableSeats.map((seat) => (
            <button
              key={seat.id}
              className={`m-1 p-2 text-sm rounded ${
                isSeatBooked(seat) ? "bg-gray-400 cursor-not-allowed text-gray-700" : "bg-gray-200 hover:bg-gray-300 text-gray-900"
              }`}
              onClick={() => handleSeatSelect(seat)}
            //   disabled={isSeatBooked(seat)}
            >
              {seat.row}{seat.number}
            </button>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
            onClick={handleConfirm}
            disabled={selectedSeats.length === 0}
          >
            Confirm
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatBookingModal;
