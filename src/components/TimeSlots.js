import React, { useState, useEffect, useMemo } from "react";

const TimeSlots = () => {
    
  const crmTimeSlots = [
    { id: "0800", isEnabled: 1, slot: "9:00AM-9:30AM" },
    { id: "0801", isEnabled: 0, slot: "12:00PM-12:30PM" },
    { id: "0802", isEnabled: 1, slot: "1:15PM-1:45PM" },
    { id: "0803", isEnabled: 0, slot: "4:15PM-4:45PM" },
    { id: "0804", isEnabled: 1, slot: "6:30PM-7:30PM" },
  ];
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dayTimeSlots = useMemo(() => {
    let date = selectedDate;
    let tomorrow = new Date()
    let ineligibleSlots = [];
    let eligableSlots = [];
    let hours = date.getHours()

    crmTimeSlots.map((timeSlot) => {
        if (timeSlot.isEnabled !== 1) return;

      //A bit confused on what's going on here
      if (
        (selectedDate.toDateString() === tomorrow.toDateString() && hours >= 15) ||
        date.getDay() === 5 ||
        date.getDay() === 6 ||
        date.getDay() === 0
      ) {
        if (timeSlot.id === "0800") {
          ineligibleSlots.push(timeSlot);
        } else {
          eligableSlots.push(timeSlot);
        }
      } else {
        eligableSlots.push(timeSlot);
      }
    })

    if (ineligibleSlots.length > 0) {
      console.log("Ineligible", ineligibleSlots);
    }

    return eligableSlots;
  }, [selectedDate, crmTimeSlots]);

  const handleSelectDate = (e) => {
    setSelectedDate(new Date(`${e.target.value}T00:00`));
  };
  useEffect(() => {
      dayTimeSlots()
  }, [selectedDate])
  return (
    <div className="App">
      <h2>Available Time Slots</h2>
      <input type="date" onChange={handleSelectDate} />
      <div>
        {dayTimeSlots.length > 0 ? (
          dayTimeSlots.map((timeSlot) => (
            <p key={timeSlot.slot}>{timeSlot.slot}</p>
          ))
        ) : (
          <p>No Available Slots for Selected Date</p>
        )}
      </div>
    </div>
  );
};

export default TimeSlots;
