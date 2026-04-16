// export default function TimeSlots({ slots, onSelect }) {
//   return (
//     <div>
//       <h3>Select Time</h3>

//       {slots.map((s, i) => (
//         <button key={i} onClick={() => onSelect(s)}>
//           {s}
//         </button>
//       ))}
//     </div>
//   );
// }

import { useState } from "react";

export default function TimeSlots({ slots, onSelect }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="timeslots">
      <h3 className="timeslots-title">Select Time</h3>

      {slots.length === 0 ? (
        <div className="timeslots-empty">
          <p>No time slots available</p>
          <span>Please select another date</span>
        </div>
      ) : (
        <div className="timeslots-grid">
          {slots.map((s, i) => (
            <button
              key={i}
              className={`timeslot ${
                selected === i ? "active" : ""
              }`}
              onClick={() => {
                setSelected(i);
                onSelect(s);
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}