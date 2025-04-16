import React, {useState} from 'react';
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
import EnterName from './components/EnterName.tsx';
import DepartmentSelect from './components/DepartmentSelect.tsx';

import {
  ChestnutHill,
  Patriot20,
  Patriot22,
  HospitalDepartment,
} from '../directory/components/directorydata';


interface RequestData {
  employeeName: string;
  department: string;
  priority: string;
  status: string;
  date: string;
  time: string;
  room: string;
  maintenanceType: string;
}

function Maintenance() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [departmentOptions, setDepartmentOptions] = useState<HospitalDepartment[]>([]);
  const form = useForm<RequestData>({
    initialValues: {
      employeeName: '',
      department: '',
      priority: '',
      status: '',
      date: '',
      time: '',
      room: '',
      maintenanceType: '',
    },
  });
  // logic for dependant department slection
  const handleHospitalChange = (hospital: string | null) => {
    form.setFieldValue('Location', hospital || '');


    switch (hospital) {
      case 'Chestnut Hill':
        setDepartmentOptions(ChestnutHill);
        break;
      case '20 Patriot Place':
        setDepartmentOptions(Patriot20);
        break;
      case '22 Patriot Place':
        setDepartmentOptions(Patriot22);
        break;
      default:
        setDepartmentOptions([]);
    }


    form.setFieldValue('department', '');
  };

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
          department: RequestData.department,
          Name: RequestData.employeeName,
          status: RequestData.status,
        }),
      });

      if (response.ok) {
        navigate('/submission', {
          state: {
            requestData:  [
              { title: 'Name', value: RequestData.employeeName },
              { title: 'Hospital', value: RequestData.department },
              { title: 'Date', value: RequestData.date },
              { title: 'Time', value: RequestData.time },
              { title: 'Room', value: RequestData.room },
              { title: 'Priority', value: RequestData.priority },
              { title: 'Status', value: RequestData.status },
              { title: 'Maintenance Type', value: label },
            ],
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
          <Box mt="md">
            <EnterName{...form.getInputProps('employeeName')} />
          </Box>

          <Flex gap="lg" wrap="wrap" mb="md">
            <Box flex="1" miw = "300px">  {/*< column 1!!!*/}
              <HospitalSelect required {...form.getInputProps("Location")}
                              onChange={handleHospitalChange}/>
              <DepartmentSelect
                required
                departments={departmentOptions.map(
                  (department) => department.title
                )}
                {...form.getInputProps('department')}
              />

              <PriorityButtons {...form.getInputProps('priority')} />
            </Box>

            <Box flex="1" miw = "300px"> {/* column 2!!!*/}
              <DateInputForm required {...form.getInputProps('date')} />
              <TimeEntry required {...form.getInputProps('time')} />
              <RoomNumberInput required {...form.getInputProps('room')} />
              <StatusSelect required {...form.getInputProps('status')} />
            </Box>
          </Flex>


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
