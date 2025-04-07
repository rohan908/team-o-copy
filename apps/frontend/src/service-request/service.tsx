import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import ServiceRequestButton from './components/servicebutton';
import ServiceRequestPopUp from "./components/servicepopup";
import DateEntryForm from './components/dateEntry.tsx';
import RoomNumberInput from './components/roomEntry.tsx'
import TimeInput from './components/timeEntry';
import dateEntry from "./components/dateEntry.tsx";

function ServiceRequestPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [deviceName, setDeviceName] = useState('Error');
    const [selectedDate, setSelectedDate] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [requestDescription, setRequestDescription] = useState('');
    const [requestStatus, setRequestStatus] = useState('');
    const [showRequestFeedback, setShowRequestFeedback] = useState(false);

    const navigate = useNavigate();  // Initialize navigate function

    // Getters (handlers) for child components outside of this component
    const handleRoomChange = (room: string) => {
        setRoomNumber(room);
    };
    const handleTimeChange = (time: string) => {
        setSelectedTime(time);
    };
    const handleDateChange = (date: string) => {
        setSelectedDate(date);
    };

    // Create a formatted description from all inputs
    const getFormattedDescription = () => {
        return `
Device: ${deviceName} | 
Date: ${selectedDate} | 
Time: ${selectedTime} | 
Room: ${roomNumber} | 
Details: ${requestDescription}
        `.trim();
    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setRequestDescription('');
    };

    const handleRequestSubmit = () => {
        if (requestDescription && deviceName != "Error") {
            setRequestStatus("Request Submitted Successfully");
            navigate('/submission', { state: { description: getFormattedDescription() } });
            setRequestDescription("")
            setIsPopupOpen(false);
        } else {
            setRequestStatus("Error: Please specify a device");
            setShowRequestFeedback(true);
        }
        setIsPopupOpen(false);
    };


    return (
        <div>
            <ServiceRequestButton onClick={handleOpenPopup} variant={'primary'} disabled={false}>
                Language Interpreter Request
            </ServiceRequestButton>

            <ServiceRequestPopUp isOpen={isPopupOpen} onClose={handleClosePopup} title="Language Interpreter Request">
                <form onSubmit={e => e.preventDefault()}>
                    <label htmlFor="dropdown">Choose the Language Needed:</label><br/>
                    <select id="deviceSelection" onChange={(e)=> setDeviceName(e.target.value)}>
                        <option value="Error">-- Select a Language --</option>
                        <option value="ASL">ASL</option>
                        <option value="Spanish">Spanish</option>
                        <option value="German">German</option>
                    </select><br/>
                    <DateEntryForm value={selectedDate} onChange={handleDateChange}/><br/>
                    <TimeInput onTimeChange={handleTimeChange}/><br/>
                    <RoomNumberInput value={roomNumber} onRoomNumberChange={handleRoomChange}/><br/>
                    <textarea
                        placeholder="Specify additional details here:"
                        value={requestDescription}
                        onChange={(e) => setRequestDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                        required={false}
                    />
                    <button
                        type="button"
                        onClick={handleRequestSubmit}
                        className={`mt-4 px-4 py-2 rounded ${
                            requestDescription.trim()
                                ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
                                : 'bg-gray-300 text-gray-400 cursor-not-allowed opacity-50'
                        }`}
                        disabled={!requestDescription.trim()}
                    >
                        Submit Request
                    </button>
                </form>
            </ServiceRequestPopUp>

            <ServiceRequestPopUp isOpen={showRequestFeedback} onClose={() => setShowRequestFeedback(false)} title="Request Status">
                <div className={`p-4 text-center rounded-md font-semibold ${
                    requestStatus.startsWith("Error") ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                    {requestStatus}
                </div>
            </ServiceRequestPopUp>
        </div>
    );
}

export default ServiceRequestPage;