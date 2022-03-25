import React, { useState, useEffect } from "react"
import "../App.css"
import styles from "../styles/TimeSlots.module.css"

const TimeSlots = () => {
  const crmTimeSlots = [
    { id: "0800", isEnabled: 1, slot: "8:00AM-10:00AM" },
    { id: "0801", isEnabled: 0, slot: "9:00AM-11:00AM" },
    { id: "0802", isEnabled: 1, slot: "10:00AM-12:00PM" },
    { id: "0803", isEnabled: 0, slot: "12:15PM-1:45PM" },
    { id: "0804", isEnabled: 1, slot: "12:00PM-2:00PM" },
  ]
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [newDayTimeSlots, setNewDayTimeSlots] = useState([])

  const dayTimeSlots = () => {
    let date = selectedDate
    let tomorrow = new Date()
    let ineligibleSlots = []
    let eligableSlots = []
    let filteredSlots = []
    let hours = date.getHours()

    crmTimeSlots.map((timeSlot) => {
      if (timeSlot.isEnabled === 1) {
        if (
          (selectedDate.toDateString() === tomorrow.toDateString() &&
            hours >= 15) ||
          date.getDay() === 5 ||
          date.getDay() === 6 ||
          date.getDay() === 0
        ) {
          if (timeSlot.id === "0800") {
            ineligibleSlots.push(timeSlot)
          } else {
            eligableSlots.push(timeSlot)
          }
        }

        if (ineligibleSlots.length > 0) {
          setNewDayTimeSlots(eligableSlots)
        } else {
          filteredSlots.push(timeSlot)
          setNewDayTimeSlots(filteredSlots)
        }
        else {
          if(timeSlot.isEnabled === 1){
            filteredSlots.push(timeSlot)
            setNewDayTimeSlots(filteredSlots)
          }
      }
      if (ineligibleSlots.length > 0) {
        console.log("Ineligible", ineligibleSlots)
      }
    })
  }
  useEffect(() => {
    dayTimeSlots()
  }, [selectedDate])

  console.log(newDayTimeSlots)

  const handleSelectDate = (e) => {
    setSelectedDate(new Date(`${e.target.value}T00:00`))
  }
  let i = 0
  const handleSelectedTimeSlot = () => {
    console.log("clicked", i++)
  }
  console.log("timeslot ", newDayTimeSlots.slot)

  return (
    <div className="App">
      <div className={styles.timeSlotCard}>
        <h2>Available Time Slots</h2>

        <div className="mt-4">
          <input
            className="border border-black"
            type="date"
            onChange={handleSelectDate}
          />
        </div>
        <div className="mt-4">
          <input
            className="border border-black"
            type="email"
            placeholder="email"
          />
        </div>
        <div>
          <div className="px-2 flex flex-col justify-center">
            <div>
              <div className="flex justify-center items-center flex-col ">
                {newDayTimeSlots.map((timeSlot) => (
                  <div
                    className={`mt-2 py-2 border border-gray-500 rounded `}
                    key={timeSlot.id}
                  >
                    <button onClick={handleSelectedTimeSlot}>
                      {timeSlot.slot}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeSlots
