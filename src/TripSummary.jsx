import React from "react";

const trips = [
  {
    time: "12:24",
    date: "18/02/25",
    status: "Moving",
    duration: "9m",
    distance: "5 km",
  },
  {
    time: "12:14",
    date: "18/02/25",
    status: "Stop",
    duration: "3m",
    location: "Gurugram, Haryana",
  },
  {
    time: "12:14",
    date: "18/02/25",
    status: "Stop",
    duration: "3m",
    location: "Gurugram, Haryana Gurugram, Haryana",
  },
  {
    time: "12:12",
    date: "18/02/25",
    status: "Moving",
    duration: "2h 22m",
    distance: "75.5 km",
  },
  {
    time: "12:12",
    date: "18/02/25",
    status: "Moving",
    duration: "2h 22m",
    distance: "75.5 km",
  },
  {
    time: "12:12",
    date: "18/02/25",
    status: "Moving",
    duration: "2h 22m",
    distance: "75.5 km",
  },
];

const TripSummary = () => {
  return (
    <div className="w-1/3 min-w-[300px] h-screen bg-white shadow-lg rounded-lg p-4 overflow-auto fixed left-0 top-0">
      <div className="flex justify-around border-b pb-2">
        <button className="bg-transparent text-black px-3 py-1 rounded border">
          Today ▼
        </button>
        <button className="bg-blue-500 text-white px-3 py-1 rounded">
          Reports ▼
        </button>
        <button className="bg-transparent text-black px-2 py-1 rounded">
          X
        </button>
      </div>
      <h4 className="text-lg text-left font-semibold mt-4">Summary - HR55Y0512</h4>
      <div className="grid grid-cols-2 text-sm text-left mt-2">
        <div>
          <p className="font-semibold">15</p>
          <p className="text-gray-500">Total Stoppages</p>
        </div>
        <div>
          <p className="font-semibold">5h 14m</p>
          <p className="text-gray-500">Total Stoppages Time</p>
        </div>
        <div>
          <p className="font-semibold">15</p>
          <p className="text-gray-500">Total Runnings</p>
        </div>
        <div>
          <p className="font-semibold">251.9</p>
          <p className="text-gray-500">Total Kms</p>
        </div>
      </div>
      <div className="flex justify-start">
        <button className="bg-transparent border px-4 py-2 text-left font-semibold mt-2">
          Trips
        </button>
      </div>
      <div className="border-t pt-2 relative">
        {trips.map((trip, index) => (
          <div key={index} className="relative flex gap-4 py-2">
            {/* Left time & date */}
            <div>
              <p className="text-sm font-semibold">{trip.time}</p>
              <p className="text-xs text-gray-500">{trip.date}</p>
            </div>

            {/* Vertical line connecting dots */}
            <div className="relative">
              {/* Line */}
              {index !== trips.length - 1 && (
                <div
                  className="absolute left-1/2 top-4 w-1 h-full"
                  style={{ backgroundColor: trip.status === "Stop" ? "red" : "green" }}
                ></div>
              )}
              {/* Dot */}
              <div
                className="w-4 h-4 rounded-full bg-white border-2 absolute left-1/2 top-1 -translate-x-1/2"
                style={{ borderColor: trip.status === "Stop" ? "red" : "green" }}
              ></div>
            </div>

            {/* Trip details */}
            <div>
              <p
                className={`font-semibold text-left ${
                  trip.status === "Stop" ? "text-red-500" : "text-green-500"
                }`}
              >
                {trip.status}
              </p>
              <p className="text-sm text-left">
                {trip.duration} {trip.distance ? `• ${trip.distance}` : ""}
              </p>
              {trip.location && <p className="text-xs text-gray-500">{trip.location}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripSummary;
