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
import HospitalSelect from "./components/HospitalEntry.tsx";
import PriorityButtons from "./components/PriorityButtons.tsx";
import StatusSelect from "./components/StatusSelect.tsx"

interface RequestData {
  status: string;
  date: string;
  room: string;
  time: string;
  priority: string;
  hospital: string;
  description: string;
  maintenanceType: string;
}

function Maintenance() {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const form = useForm<RequestData>({
    initialValues: {
      status: '',
      date: '',
      room: '',
      time: '',
      hospital: '',
      priority: '',
      description: '',
      maintenanceType: '',
    },
  });

  const handleSubmit = async () => {
    const RequestData = form.values;
    const label = RequestData.maintenanceType;
    try {
      const response = await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label,
          selectedDate: RequestData.date,
          selectedTime: RequestData.time,
          roomNumber: RequestData.room,
          priority: RequestData.priority,
          hospital: RequestData.hospital,
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
              priority: RequestData.priority,
              hospital: RequestData.hospital,
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
        w="65%"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Title order={2} ta="center" mb="lg">
            Maintenance Request Form
          </Title>
          <Title order={5} ta="center" mb="lg">
            Yanding Mario and Connor Daly
          </Title>


          <Flex gap="lg" wrap="wrap" mb="md">
            <Box flex="1" miw = "300px">  {/*< column 1!!!*/}
              <HospitalSelect required {...form.getInputProps("hospital")} />
              <PriorityButtons {...form.getInputProps('priority')} />
            </Box>

            <Box flex="1" miw = "300px"> {/* column 2!!!*/}
              <DateInputForm required {...form.getInputProps('date')} />
              <TimeEntry required {...form.getInputProps('time')} />
              <RoomNumberInput required {...form.getInputProps('room')} />
              <StatusSelect required {...form.getInputProps('status')} />
            </Box>
          </Flex>

          <Box mt="md">
            <RequestDescription {...form.getInputProps('description')} />
          </Box>

          <Flex mt="xl" justify="left" gap="md">

            <Button
              type="button"
              variant="outline"
              color="blueBase.5"
              style={{ width: '200px' }}
              onClick={() => form.reset()}
            >
              Clear Form
            </Button>

            <Button
              type="submit"
              color="blueBase.5"
              style={{ width: '200px' }}
            >
              Submit Request
            </Button>

          </Flex>
        </form>
      </Paper>
    </Flex>
  );
}

export default Maintenance;
