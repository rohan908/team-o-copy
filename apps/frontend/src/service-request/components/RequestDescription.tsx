import { Textarea, TextareaProps, Flex, Box } from '@mantine/core';
import React, { useState } from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';

const RequestDescription: React.FC<TextareaProps> = (props) => {
  const [value, setValue] = useState('');

  const handleSpeechResult = (text: string) => {
    const newText = value ? `${value} ${text}` : text;
    setValue(newText);
    props.onChange?.(newText);
  };
  return (
    <Flex align="center" gap="sm">

    <Textarea
            {...props}
            label="Additional Details"
            placeholder="Specify additional details here"
            radius="sm"
            autosize
            minRows={2}
            mb="md"
            size="xs"
            c={"#285CC6"}
            flex={1}
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value);
              props.onChange?.(e);
            }}
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

export default RequestDescription;
