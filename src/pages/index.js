// components/SeatBooking.js
import React, { useState } from "react";
import styles from "@/styles/home.module.css";

const SeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatChange = (seat) => {
    const index = selectedSeats.indexOf(seat);
    if (index === -1) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    }
  };

  const renderSeats = () => {
    const rows = [
      { row: "A", totalSeats: 5, bookedSeats: 3 },
      { row: "B", totalSeats: 3, bookedSeats: 1 },
      { row: "C", totalSeats: 5, bookedSeats: 0 },
    ];

    return rows.map((row) => {
      const availableSeats = row.totalSeats - row.bookedSeats;
      const seats = Array.from(
        { length: row.totalSeats },
        (_, index) => `${row.row}${index + 1}`
      );
      const bookedSeats = seats.slice(0, row.bookedSeats);
      const availableSeatRange = seats.slice(row.bookedSeats);

      return (
        <div key={row.row} className={styles.row}>
          <div className={styles.rowLabel}>{row.row}</div>
          <div className={styles.seatRow}>
            {bookedSeats.map((seat) => (
              <div key={seat} className={`${styles.seat} ${styles.booked}`}>
                {seat}
              </div>
            ))}
            {availableSeatRange.map((seat) => {
              const isSelected = selectedSeats.includes(seat);
              const seatStyle = isSelected ? styles.selected : styles.available;
              return (
                <div
                  key={seat}
                  className={`${styles.seat} ${seatStyle}`}
                  onClick={() => handleSeatChange(seat)}
                >
                  {seat}
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., sending data to server
    console.log("Selected seats:", selectedSeats);
  };

  return (
    <form className={styles["seat-booking-container"]} onSubmit={handleSubmit}>
      <div className={styles["seats-grid"]}>{renderSeats()}</div>
      <div className={styles.bottomRow}>
        <button type='submit'>Book Selected Seats</button>
      </div>
    </form>
  );
};

export default SeatBooking;
