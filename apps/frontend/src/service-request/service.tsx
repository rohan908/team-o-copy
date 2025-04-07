import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import ServiceRequestButton from './components/servicebutton';
import ServiceRequestPopUp from "./components/servicepopup";
import DateEntryForm from './components/dateEntry.tsx';
import RoomNumberInput from './components/roomEntry.tsx'
import TimeInput from './components/timeEntry';
import dateEntry from "./components/dateEntry.tsx";
import { useMantineTheme } from '@mantine/core';
import { Button } from '@mantine/core';
import ISO6391 from 'iso-639-1';
import { Select } from '@mantine/core';




function ServiceRequestPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [deviceName, setLanguageName] = useState('Error');
    const [selectedDate, setSelectedDate] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [requestDescription, setRequestDescription] = useState('');
    const [requestStatus, setRequestStatus] = useState('');
    const [showRequestFeedback, setShowRequestFeedback] = useState(false);
    const theme = useMantineTheme();


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
    // to get access to all languages using premade ISO6391 list, and adding ASL to it
    const languageOptions = [
        { value: 'asl', label: 'ASL (American Sign Language)' },
        ...ISO6391.getAllCodes().map((code) => ({
            value: code,
            label: ISO6391.getName(code),
        })),
    ];


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
        <div style={{ color: theme.colors.blueBase[7] }}>
            <ServiceRequestButton onClick={handleOpenPopup} variant={'primary'} disabled={false}>
                Language Interpreter Request
            </ServiceRequestButton>

            <ServiceRequestPopUp isOpen={isPopupOpen} onClose={handleClosePopup} title="Language Interpreter Request">
                <form onSubmit={e => e.preventDefault()}>
                    <Select
                        label = "Choose the Language Needed:"
                        placeholder = "--Select a Language--"
                        searchable
                        nothingFoundMessage = "Language not found"
                        data={languageOptions}
                        value ={deviceName === 'Error' ? ' ' : deviceName}
                        onChange={(value) => setLanguageName(value ?? 'Error')}
                    ></Select>
                    <br/>
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
                    <Button
                        type="button"
                        onClick={handleRequestSubmit}
                        color="blueBase"
                        disabled={!requestDescription.trim()}
                    >
                        Submit Request
                    </Button>
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