import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mockFlights from "../data/mockFlights"; 

function SearchResult() {
  const location = useLocation();
  const state = location?.state;
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  function formatTime(dateString) {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };
    return date.toLocaleString("en-IN", options);
  }

  function getFallbackFlights(from, to, date) {
    const selectedDate = new Date(date).toDateString();
    return mockFlights
      .filter(f => {
        const flightDate = new Date(f.departure.scheduled).toDateString();
        return (
          f.departure.iata === from &&
          f.arrival.iata === to &&
          flightDate === selectedDate
        );
      })
      .map(f => ({
        ...f,
        price: Math.floor(Math.random() * 3000) + 3000,
      }));
  }


  useEffect(() => {
    if (state?.from && state?.to && state?.date) {
      const fallbackFlights =  getFallbackFlights(state.from, state.to, state.date);
      setFlights(fallbackFlights);
      setLoading(false);
    }
  }, [state?.from, state?.to, state?.date]);

  if (!state?.from || !state?.to || !state?.date) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">No Search Data</h2>
          <p>Please start your search from the home page.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Go to Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-4 text-center p-2 text-blue-950">Available Flights</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading flights...</p>
      ) : flights.length === 0 ? (
        <p className="text-center text-gray-700">No flights found for your route.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {flights.map((flight) => (
            <div
              key={flight.flight.iata + flight.flight.number}
              className="bg-white m-4 p-4 rounded-xl shadow-md flex flex-col justify-between hover:scale-102 hover:shadow-[0_0_20px_4px_rgba(147,197,253,0.8)] transition duration-300 cursor-default"
            >
              <div>
                <h3 className="text-2xl font-bold py-2 text-blue-800">{flight.airline.name}</h3>
                <p>
                  {flight.departure.iata} → {flight.arrival.iata}
                </p>
                <p>Departure Time: {formatTime(flight.departure.scheduled)}</p>
                <p>Arrival Time: {formatTime(flight.arrival.scheduled)}</p>
                <p>Flight Number: {flight.flight.iata}</p>
                <p>Flight Price: ₹{flight.price?.toLocaleString("en-IN")}</p>
              </div>
              <button
                onClick={() => navigate("/book", { state: flight })}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SearchResult;