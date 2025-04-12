// Redesigned Language.tsx form page using Mantine's useForm and consistent, clean layout

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextInput,
  Select,
  Textarea,
  Button,
  Flex,
  Title,
  Paper,
  Text,
  Box,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import ISO6391 from 'iso-639-1';

import TimeEntry from './components/timeEntry';
import DateInputForm from './components/dateEntry';
import RoomNumberInput from './components/roomEntry';
import RequestDescription from './components/requestDescription';
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
    validate: {
      language: (val) => (!val || val === 'Error' ? 'Language is required' : null),
      date: (val) => (!val ? 'Date is required' : null),
      time: (val) => (!val ? 'Time is required' : null),
      room: (val) => (!val ? 'Room is required' : null),
    },
  });

  const handleSubmit = async () => {
    const values = form.values;
    const label =
      values.language === 'asl'
        ? 'ASL (American Sign Language)'
        : ISO6391.getName(values.language);

    try {
      const response = await fetch('api/languageSR/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label,
          selectedDate: values.date,
          selectedTime: values.time,
          roomNumber: values.room,
          description: values.description,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate('/submission', {
          state: {
            label,
            selectedDate: values.date,
            selectedTime: values.time,
            roomNumber: values.room,
            description: values.description,
          },
        });
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  return (
    <Flex justify="center" align="center" style={{ width: '100vw' }}>
      <Paper bg="gray.2" p="xl" shadow="xl" radius="md" w="35%">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Title order={2} ta="center" mb="md">
            Interpreter Request Form
          </Title>

          <LanguageSelect required {...form.getInputProps('language')} />
          <DateInputForm required {...form.getInputProps('date')} />
          <TimeEntry required {...form.getInputProps('time')} />
          <RoomNumberInput required {...form.getInputProps('room')} />
          <RequestDescription {...form.getInputProps('description')} />


          <Flex mt="lg">
            <Button type="submit" fullWidth mr="sm">
              Submit Request
            </Button>
            <Button fullWidth ml="sm" onClick={() => form.reset()}>
              Clear Form
            </Button>
          </Flex>
        </form>
      </Paper>
    </Flex>
  );
}

export default Language;
