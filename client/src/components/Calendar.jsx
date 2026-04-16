// import dayjs from "dayjs";

// export default function Calendar({ onSelect }) {
//   const days = [];

//   for (let i = 0; i < 7; i++) {
//     days.push(dayjs().add(i, "day"));
//   }

//   return (
//     <div>
//       <h3>Select Date</h3>

//       {days.map((d, i) => (
//         <button key={i} onClick={() => onSelect(d)}>
//           {d.format("DD MMM")}
//         </button>
//       ))}
//     </div>
//   );
// }


import dayjs from "dayjs";
import { useState } from "react";

export default function Calendar({ onSelect }) {
  const [selected, setSelected] = useState(null);
  const days = [];

  for (let i = 0; i < 9; i++) {
    days.push(dayjs().add(i, "day"));
  }

  return (
    <div className="calendar">
      <h3 className="calendar-title">Select Date</h3>

      <div className="calendar-grid">
        {days.map((d, i) => (
          <button
            key={i}
            className={`calendar-day ${
              selected === i ? "active" : ""
            }`}
            onClick={() => {
              setSelected(i);
              onSelect(d);
            }}
          >
            <span className="day-name">
              {d.format("ddd")}
            </span>
            <span className="day-date">
              {d.format("DD")}
            </span>
            <span className="day-month">
              {d.format("MMM")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}