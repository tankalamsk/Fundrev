import React, { useState } from 'react';
import csvtojson from 'csvtojson';

export default function StartupDashboard(props) {
  const [csvFile, setCsvFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCsvFile(file);
  };

  const handleUpload = async () => {
    try {
      if (!csvFile) {
        return alert('Please select a CSV file');
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const csvData = e.target.result;
        const jsonArray = await csvtojson().fromString(csvData);

        // Now jsonArray contains the CSV data in JSON format
        console.log(jsonArray);

        // Continue with sending jsonArray to the server...
      };

      reader.readAsText(csvFile);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='StartupDashboard'>
      <label className="custom-file-upload" htmlFor="csvFileInput">
        <div className="icon">
          {/* Your SVG icon */}
        </div>
        <div className="text">
          <span>Click to upload CSV</span>
        </div>
        <input type="file" id="csvFileInput" onChange={handleFileChange} />
      </label>
      <button onClick={handleUpload}>Upload CSV</button>
    </div>
  );
}



