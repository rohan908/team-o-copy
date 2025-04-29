import { Select, SelectProps, Flex, Box } from '@mantine/core';
import React from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';
import { notifications } from '@mantine/notifications';

interface HospitalSelectProps extends SelectProps {
    value: string;
    onChange: (value: string) => void;
}

const HospitalSelect: React.FC<HospitalSelectProps> = ({ value, onChange, ...props }) => {
  const hospitalData = ['20 Patriot Place', '22 Patriot Place', 'Chestnut Hill', 'Falkner Hospital', 'Brigham Hospital'];
  const handleSpeechResult = (text: string) => {
    const matchedHospital = hospitalData.find(hospital =>
      hospital.toLowerCase().includes(text.toLowerCase())
    );
    if (matchedHospital) {
      onChange(matchedHospital);
    } else {
      notifications.show({
        title: 'Speech Error',
        message: 'No Matching Hospital Found',
        color: 'red',
      });    }
  };
    return (
      <Flex align="center" gap="sm">

      <Select
            label="Choose the Hospital Needed"
            placeholder="Select a Hospital"
            data={hospitalData}
            value={value}
            onChange={(val) => onChange(val || '')} // fallback for null values
            nothingFoundMessage="Hospital not found"
            radius="sm"
            mb="md"
            size="xs"
            required
            c={"#285CC6"}
            w="240px"
            {...props}
            styles={{
                label: {
                    fontSize: '18px',
                    fontWeight: 350,
                },
            }}

        />
        <Box mt={14}>
          <SpeechToText OnResult={handleSpeechResult} />
        </Box>
      </Flex>
    );
};

export default HospitalSelect;
