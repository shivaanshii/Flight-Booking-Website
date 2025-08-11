import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bgplane.jpg";

function SearchForm() {
  const [tripType, setTripType] = useState("round"); 
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travelClass, setTravelClass] = useState("Economy");
  const navigate = useNavigate();

  
  function formatDate(inputDate) {
    const d = new Date(inputDate);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function handleSearch(e) {
    e.preventDefault(); 
    navigate("/searchresult", {
      state: {
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        date: departure, 
        returnDate: tripType === "round" ? formatDate(returnDate) : null,
        travelClass,
        tripType
      }
    });
  }

  return (
    <div className=" relative min-h-screen flex w-full justify-center items-center">
      <div
          className="absolute inset-0 bg-cover bg-center opacity-50 bg-fixed"
          style={{ backgroundImage: `url(${bgImage})` }}>
    </div>
    <form
      onSubmit={handleSearch}
      className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-lg text-gray-800 w-full max-w-3xl mx-auto "
    > 
    
    <div className="flex justify-center gap-6 mb-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="tripType"
            value="round"
            checked={tripType === "round"}
            onChange={() => setTripType("round")}
          />
          Round-trip
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="tripType"
            value="oneway"
            checked={tripType === "oneway"}
            onChange={() => setTripType("oneway")}
          />
          One-way
        </label>
    </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4 ">
        <input
          type="text"
          placeholder="From (e.g. DEL)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="p-2 rounded border focus:outline-none focus:ring-1 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          value={departure}
          placeholder="Select the departure date"
          onFocus={(e) => (e.target.type = 'date')}
          onChange={(e) => setDeparture(e.target.value)}
          className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <input
          type="text"
          placeholder="To (e.g. BOM)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        {tripType==="round" && (
          <input
            type="text"
            value={returnDate}
            placeholder="Select the return date"
            onFocus={(e) => (e.target.type = 'date')}
            onChange={(e) => setReturnDate(e.target.value)}
            className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        )}
        <select
          value={travelClass}
          onChange={(e) => setTravelClass(e.target.value)}
          className={`p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-300 ${ tripType === "round" ? "md:mx-[25%] md:col-span-2" : ""}`}
        >
          <option>Economy</option>
          <option>Business</option>
          <option>First Class</option>
        </select>
      </div>
      
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold cursor-pointer "
        >
          Search Flights
        </button>
      </div>
    </form>
    </div>
  );
}

export default SearchForm