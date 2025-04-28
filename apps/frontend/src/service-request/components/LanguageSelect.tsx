import { Flex, Box, Select, SelectProps } from '@mantine/core';
import ISO6391 from 'iso-639-1';
import React from 'react';
import SpeechToText from '../../Buttons/SpeechToText.tsx';

const languageOptions = [
    { value: 'asl', label: 'ASL (American Sign Language)' },
    ...ISO6391.getAllCodes().map((code) => ({
        value: code,
        label: ISO6391.getName(code),
    })),
];

interface LanguageSelectProps extends SelectProps {
  value: string | null;
  onChange: (value: string | null, option?: { value: string; label: string }) => void;
}


const LanguageSelect: React.FC<LanguageSelectProps> = ({value, onChange, ...props }) => {
    const handleSpeechResult = (text: string) => {
        const matchedLanguage = languageOptions.find((option) =>
            option.label.toLowerCase().includes(text.toLowerCase())
        );
        if (matchedLanguage) {
            onChange(matchedLanguage.value);
        } else {
            alert('No matching language found');
        }
    };
    return (
      <Flex align="center" gap="sm">

      <Select
            label="Choose the Language Needed"
            placeholder="Select a Language"
            searchable
            data={languageOptions}
            value={value}
            onChange={(val, option) => onChange(val, option)}
            nothingFoundMessage="Language not found"
            radius="sm"
            mb="md"
            size="xs"
            required
            w="240px"

            c={'#285CC6'}
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

export default LanguageSelect;
