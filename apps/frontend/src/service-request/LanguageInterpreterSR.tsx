import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  Title,
  Paper,
  Box,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import ISO6391 from 'iso-639-1';

import TimeEntry from './components/TimeEntry';
import DateInputForm from './components/DateEntry';
import RoomNumberInput from './components/RoomEntry';
import RequestDescription from './components/RequestDescription';
import LanguageSelect from './components/LanguageSelect';

interface RequestData {
  language: string;
  date: string;
  room: string;
  time: string;
  description: string;
}

function Language() {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const form = useForm<RequestData>({
    initialValues: {
      language: '',
      date: '',
      room: '',
      time: '',
      description: '',
    },
  });

  const handleSubmit = async () => {
    const RequestData = form.values;
    const label =
      RequestData.language === 'asl'
        ? 'ASL (American Sign Language)'
        : ISO6391.getName(RequestData.language);

    try {
      const response = await fetch('/api/languageSR', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label,
          selectedDate: RequestData.date,
          selectedTime: RequestData.time,
          roomNumber: RequestData.room,
          description: RequestData.description,
        }),
      });

      if (response.ok) {
        navigate('/submission', {
          state: {
            requestData: {
              label,
              selectedDate: RequestData.date,
              selectedTime: RequestData.time,
              roomNumber: RequestData.room,
              description: RequestData.description,
            },
          },
        });
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  return (
    <Flex justify="center" align="center" style={{ width: '100vw', padding: '2rem' }}>
      <Paper
        bg="gray.2"
        p="xl"
        shadow="xl"
        radius="md"
        style={{
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Title order={2} ta="center" mb="lg">
            Interpreter Request Form
          </Title>

          <Flex gap="lg" wrap="wrap" mb="md">
            <Box style={{ flex: 1, minWidth: '300px' }}>
              <LanguageSelect required {...form.getInputProps('language')} />
              <Box mt="md">
                <DateInputForm required {...form.getInputProps('date')} />
              </Box>
            </Box>

            <Box style={{ flex: 1, minWidth: '300px' }}>
              <TimeEntry required {...form.getInputProps('time')} />
              <Box mt="md">
                <RoomNumberInput required {...form.getInputProps('room')} />
              </Box>
            </Box>
          </Flex>

          <Box mt="md">
            <RequestDescription {...form.getInputProps('description')} />
          </Box>

          <Flex mt="xl" justify="left" gap="md">
            <Button
              type="submit"
              color="blueBase.5"
              style={{ width: '200px' }}
            >
              Submit Request
            </Button>

            <Button
              type="button"
              variant="outline"
              color="blueBase.5"
              style={{ width: '200px' }}
              onClick={() => form.reset()}
            >
              Clear Form
            </Button>
          </Flex>
        </form>
      </Paper>
    </Flex>
  );
}

export default Language;
