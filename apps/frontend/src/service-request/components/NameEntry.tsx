import { TextInputProps, TextInput, Flex, Box } from '@mantine/core';
import React, { useState } from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx'

const NameEntry: React.FC<TextInputProps> = (props) => {
  const [value, setValue] = useState('');

  const handleSpeechResult = (text: string) => {
    setValue(text);
  };
  return (
      <Flex align="center" gap="sm">
        <TextInput
          {...props}
          label="Enter Employee Name"
          placeholder="Enter Name"
          radius="sm"
          mb='md'
          size="xs"
          required
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          c="#285CC6"
          w="240px"
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

export default NameEntry;
