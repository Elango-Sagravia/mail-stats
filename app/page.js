"use client";

import BarChartComponent from "@/components/BarChartComponent";
import DatePickerWithRange from "@/components/DatePickerWithRange";
import React, { useState } from "react";

async function getData(startDate, endDate) {
  const response = await fetch(
    `/api/dashboard?start_date=${startDate}&end_date=${endDate}`
  );
  return await response.json();
}

function Homepage() {
  // Lift `date` state up to `Homepage`
  const [date, setDate] = useState({
    from: new Date(2024, 9, 12), // Start date: October 12, 2024
    to: new Date(), // End date: Today's date
  });

  const [dashboardData, setDashboardData] = useState(null); // State to store dashboard data
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  // Fetch data based on the selected date range
  const fetchData = async (startDate, endDate) => {
    setIsLoading(true); // Set loading to true when fetching starts

    try {
      const data = await getData(startDate, endDate);
      setDashboardData(data); // Store fetched data in state
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading to false when fetching completes
    }
  };

  // Custom logic to perform when the popover closes
  const handlePopoverClose = () => {
    if (date?.from && date?.to) {
      console.log("Popover closed. Selected date range:", date);

      // Format the dates as YYYY-MM-DD
      const formattedStartDate = date.from.toISOString().split("T")[0];
      const formattedEndDate = date.to.toISOString().split("T")[0];

      // Call fetchData with the new date range
      fetchData(formattedStartDate, formattedEndDate);
    }
  };

  return (
    <div>
      <DatePickerWithRange
        date={date}
        setDate={setDate}
        onPopoverClose={handlePopoverClose} // Pass the function to handle popover close
      />

      {/* Show loading indicator while fetching */}
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        // Display fetched data
        dashboardData && (
          <div>
            <BarChartComponent data={dashboardData} />
          </div>
        )
      )}
    </div>
  );
}

export default Homepage;
