import React, { useState, useEffect } from 'react';

interface timeEntryProps {
  onTimeChange: (time: string) => void;
}


const TimeInput: React.FC<timeEntryProps> = ({onTimeChange}) => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [period, setPeriod] = useState('AM');

  // Validate hours (1-12 for 12-hour format)
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (/^\d{1,2}$/.test(value) && parseInt(value) > 0 && parseInt(value) <= 12)) {
      setHours(value);
    }
  };

  // Validate minutes (0-59)
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (/^\d{1,2}$/.test(value) && parseInt(value) < 60)) {
      setMinutes(value);
    }
  };

  // Handle period change (AM/PM)
  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value);
  };

  // Update parent component whenever time changes
  useEffect(() => {
    if (hours && minutes) {
      const formattedHours = hours.padStart(2, '0');
      const formattedMinutes = minutes.padStart(2, '0');
      const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
      onTimeChange(formattedTime);
    } else {
      onTimeChange('');
    }
  }, [hours, minutes, period, onTimeChange]);

  return (
    <div className=" mx-auto">
      <label className="block mb-2 "style={{fontSize: '20px'}}>Enter Time:*</label>

      <div className="flex items-center space-x-2">
        <div>
          <input
            type="text"
            inputMode="numeric"
            placeholder="HH"
            value={hours}
            onChange={handleHoursChange}
            className="h-10 w-16 p-2 border rounded text-center"
            maxLength={2}
            aria-label="Hour"
          />


        <span className="text-xl font-bold">:</span>


          <input
            type="text"
            inputMode="numeric"
            placeholder="MM"
            value={minutes}
            onChange={handleMinutesChange}
            className="h-10 w-16 p-2 border rounded text-center"
            maxLength={2}
            aria-label="Minute"
          />
        </div>

        <div>
          <select
            value={period}
            onChange={handlePeriodChange}
            className="w-16 p-2 border rounded text-center h-10"
            aria-label="AM/PM"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TimeInput;
