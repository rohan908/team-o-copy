import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { useMantineTheme, Box, Flex, Title, Text, Stack } from '@mantine/core';
import DateInputForm from './components/dateEntry.tsx';
import RoomNumberInput from './components/roomEntry.tsx'
import TimeInput from './components/timeEntry';
import RequestDescription from "./components/requestDescription.tsx";
import LanguageSelect from "./components/LanguageSelect.tsx";
import SubmitButton from './components/submitButton';
import ISO6391 from 'iso-639-1';




function Language() {
    const [language, setLanguageName] = useState('Error');
    const [selectedDate, setSelectedDate] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [description, setSelectedDescription] = useState('');
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
    const handleDescriptionChange = (description: string) => {
      setSelectedDescription(description);
    }

    // to get access to all languages using premade ISO6391 list, and adding ASL to it
    const languageOptions = [
        { value: 'asl', label: 'ASL (American Sign Language)' },
        ...ISO6391.getAllCodes().map((code) => ({
            value: code,
            label: ISO6391.getName(code),
        })),
    ];

    const handleRequestSubmit = () => {
        if (language != "Error" && selectedDate.trim() && selectedTime.trim() && roomNumber.trim()) {
            setRequestStatus("Request Submitted Successfully");
                navigate('/submission', { state: {
                        label: language === 'asl'
                            ? 'ASL (American Sign Language)'
                            : ISO6391.getName(language),
                        selectedDate,
                        selectedTime,
                        roomNumber,
                        description,
                    }
                });
        } else {
            setRequestStatus("Error: Please fill out all required fields.");
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

            <form onSubmit={e => e.preventDefault()}>
              <Stack spacing="md">
                <LanguageSelect value={language} setLanguageName={setLanguageName} />
                <DateInputForm value={selectedDate} onChange={handleDateChange} />
                <TimeInput onTimeChange={handleTimeChange} />
                <RoomNumberInput value={roomNumber} onRoomNumberChange={handleRoomChange} />
                <RequestDescription value={description} onChange={handleDescriptionChange} />
                <SubmitButton
                  language={language}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  roomNumber={roomNumber}
                  onClick={handleRequestSubmit}
                />

              <Box
                bg='greys.1'
                p={{base: '1rem', sm:'1rem', md: '1rem'}}
                style={{
                  opacity: 0.85,
                  borderRadius: theme.radius.lg,
                  backdropFilter: 'blur(5px)',
                }}>
              <Text fz={{base: 'xxs'}}>All required fields are marked with *</Text>

              </Box>
              </Stack>
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
