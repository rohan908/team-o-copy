import React, { useState, useEffect } from 'react';
import { Box, Text, Input, Select, Flex } from '@mantine/core';

interface TimeEntryProps {
  onTimeChange: (time: string) => void;
}

const TimeInput: React.FC<TimeEntryProps> = ({ onTimeChange }) => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (/^\d{1,2}$/.test(value) && parseInt(value) > 0 && parseInt(value) <= 12)) {
      setHours(value);
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (/^\d{1,2}$/.test(value) && parseInt(value) < 60)) {
      setMinutes(value);
    }
  };

  const handlePeriodChange = (value: 'AM' | 'PM') => {
    setPeriod(value);
  };

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
    <Box>
      <Text
        component="label"
        fz={{ base: 'sm', md: 'md', sm: 'sm', xs: 'xs' }}
        mb={4}
        display="block">
        Enter Time:*
      </Text>
      <Flex gap="xs" align="center">
        {/* Hours */}
        <Input
          type="text"
          inputMode="numeric"
          placeholder="HH"
          value={hours}
          onChange={handleHoursChange}
          maxLength={2}
          aria-label="Hour"
          maw="4rem"
          radius="sm"
          styles={{
            input: {
              textAlign: 'center',
              padding: '0.25rem',
              borderColor: 'black'
            },
          }}
        />

        <Text size="xl" fw={600}>:
        </Text>

        {/* Minutes */}
        <Input
          type="text"
          inputMode="numeric"
          placeholder="MM"
          value={minutes}
          onChange={handleMinutesChange}
          maxLength={2}
          aria-label="Minute"
          maw="4rem"
          radius="sm"
          styles={{
            input: {
              textAlign: 'center',
              padding: '0.25rem',
              borderColor: 'black'
            },
          }}
        />

        {/* AM/PM */}
        <Select
          data={['AM', 'PM']}
          value={period}
          onChange={(val) => handlePeriodChange(val as 'AM' | 'PM')}
          aria-label="AM/PM"
          maw="5rem"
          radius="sm"
          styles={{
            input: {
              textAlign: 'center',
              padding: '0.5rem',
              borderColor: 'black'
            },
          }}
        />
      </Flex>
    </Box>
  );
};

export default TimeInput;
