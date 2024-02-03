import React, { useEffect, useState } from 'react';

const InvestorDashboard = () => {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    // Fetch startup data from the server
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/assignment/src/pages/InvesterDashboard');
        const data = await response.json();
        setStartups(data);
      } catch (error) {
        console.error('Error fetching startup data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h1>Investor Dashboard</h1>
      {startups.map((startup) => (
        <div key={startup._id} className="card" style={{ border: '2px solid #3498db', padding: '20px', borderRadius: '10px', margin: '20px' }}>
          <h3>Company Name: {startup.companyName}</h3>
          <p>Revenue: {startup.revenue}</p>
          <p>Description: {startup.businessDescription}</p>
          <button>Intrested</button>
        </div>
      ))}
    </div>
  );
};

export default InvestorDashboard;
