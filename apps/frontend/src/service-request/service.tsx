import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { useMantineTheme, Box, Button, Flex, Title, Text, Select, Textarea } from '@mantine/core';
import ServiceRequestButton from './components/servicebutton';
import ServiceRequestPopUp from "./components/servicepopup";
import DateEntryForm from './components/dateEntry.tsx';
import RoomNumberInput from './components/roomEntry.tsx'
import TimeInput from './components/timeEntry';
import ISO6391 from 'iso-639-1';




function Language() {
    const [language, setLanguageName] = useState('Error');
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
Language: ${language} | 
Date: ${selectedDate} | 
Time: ${selectedTime} | 
Room: ${roomNumber} | 
Details: ${requestDescription}
        `.trim();
            };

    const handleRequestSubmit = () => {
        if (requestDescription && language != "Error") {
            setRequestStatus("Request Submitted Successfully");
            navigate('/submission', { state: { description: getFormattedDescription() } });
        } else {
            setRequestStatus("Error: Please specify a device");
            setShowRequestFeedback(true);
        }
    };



    return (
      <Flex
          w-="100%"
          h="100%"
          justify="center"
          align="center"
        >
          <Box
            bg="white"
            p={{base: 'xl', sm:'2rem', md: '3rem'}}
            w="100%"
            maw={{base: '90%', sm:'70%', md: '750px' }}
            style={{
              opacity: 0.85,
              borderRadius: theme.radius.lg,
              backdropFilter: 'blur(5px)',
            }}
          >
            <Title order={1} mb = "xs" c="black">Interpreter Request</Title>
            <Text fz ="xs" mb="xs">Please fill out the following form to request for a language interpreter</Text>

            <br/>
            <form onSubmit={e => e.preventDefault()}>
              <Select
                label="Choose the Language Needed:"
                placeholder="--Select a Language--"
                searchable
                nothingFoundMessage="Language not found"
                data={languageOptions}
                value={language === 'Error' ? '' : language}
                onChange={(value) => setLanguageName(value ?? 'Error')}
                mb="md"
                styles={{
                  input: {
                    borderColor: 'black',
                  },
                }}
              />
              <DateEntryForm value={selectedDate} onChange={handleDateChange} />
              <TimeInput onTimeChange={handleTimeChange} />
              <RoomNumberInput value={roomNumber} onRoomNumberChange={handleRoomChange} />

              <Textarea
                placeholder="Specify additional details here:"
                value={requestDescription}
                onChange={(e) => setRequestDescription(e.target.value)}
                autosize
                minRows={3}
                mt="md"
                mb="md"
                styles={{
                  input: {
                    borderColor: 'black',
                  },
                }}
              />

              <Button
                type="button"
                onClick={handleRequestSubmit}
                color="dark"
                bg="black"
                radius="xl"
                disabled={!requestDescription.trim()}
              >
                Submit Request
              </Button>
            </form>

            {showRequestFeedback && (
              <Box mt="lg" p="md" bg={requestStatus.startsWith("Error") ? 'red.1' : 'green.1'} c={requestStatus.startsWith("Error") ? 'red.8' : 'green.8'} style={{ borderRadius: 8 }}>
                {requestStatus}
              </Box>
            )}
          </Box>
      </Flex>
    );
}

export default Language;
