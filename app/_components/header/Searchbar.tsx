"use client"
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FaUserFriends } from "react-icons/fa";

const Searchbar = ({ placeholder }: { placeholder?: string }) => {
    const [input, setInput] = useState<string>("");
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
    
    const selectionRange = {
        startDate,
        endDate,
        key: "selection"
    };

    const handleSelect = (ranges: RangeKeyDict) => {
        setStartDate(ranges.selection.startDate as Date);
        setEndDate(ranges.selection.endDate as Date);
    };

    const handleSearch = () => {
        if (!input || !startDate || !endDate) return;
        window.location.href = `/search?location=${input}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&numberOfGuests=${numberOfGuests}`;
        setInput("");
    };

    return (
        <>
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input
                    type='text'
                    placeholder={placeholder || 'Start your search'}
                    className='text-sm text-gray-600 placeholder-gray-400 flex-grow pl-5 bg-transparent outline-none'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <IoIosSearch className="hidden md:inline-flex h-8 w-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
            </div>
            {input && <div className="absolute top-full left-0 w-full sm:left-1/2 sm:w-auto sm:max-w-md md:max-w-lg lg:max-w-xl transform sm:-translate-x-1/2 bg-white shadow-lg rounded-lg z-50 flex flex-col">
  {/* Date Picker */}
  <DateRangePicker
    ranges={[selectionRange]}
    onChange={handleSelect}
    rangeColors={["#FD5861"]}
    minDate={new Date()}
    className="w-full"
  />

  {/* Guests Selector */}
  <div className="flex items-center justify-between p-4 border-b">
    <h2 className="text-lg sm:text-xl font-semibold flex-grow">Number of Guests</h2>
    <FaUserFriends className="h-5 sm:h-6 ml-2" />
    <input
      type="number"
      className="w-12 pl-2 text-lg outline-none text-red-400"
      value={numberOfGuests}
      min={1}
      onChange={(e) => setNumberOfGuests(+e.target.value)}
    />
  </div>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row">
    <button
      className="flex-1 text-gray-500 hover:text-gray-700 p-4 border-t sm:border-t-0 sm:border-r"
      type="button"
      onClick={() => setInput("")}
    >
      Cancel
    </button>
    <button
      onClick={handleSearch}
      className="flex-1 text-red-400 font-semibold hover:text-red-500 p-4"
    >
      Search
    </button>
  </div>
            </div>}
        </>
    );
};

export default Searchbar;