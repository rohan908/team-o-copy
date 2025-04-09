// components/LanguageSelect.tsx
import { Select, useMantineTheme } from '@mantine/core';
import ISO6391 from 'iso-639-1';

interface LanguageSelectProps {
  value: string;
  setLanguageName: (value: string) => void;
}

const languageOptions = [
  { value: 'asl', label: 'ASL (American Sign Language)' },
  ...ISO6391.getAllCodes().map((code) => ({
    value: code,
    label: ISO6391.getName(code),
  })),
];

const LanguageSelect: React.FC<LanguageSelectProps> = ({ value, setLanguageName }) => {
  const theme = useMantineTheme();
  return (
    <Select
      label="Choose the Language Needed:*"
      placeholder="--Select a Language--"
      searchable
      nothingFoundMessage="Language not found"
      data={languageOptions}
      value={value === 'Error' ? '' : value}
      onChange={(val) => setLanguageName(val ?? 'Error')}
      radius="sm"
      styles={{
        label: {
          fontSize: theme.fontSizes.sm,
        },
        input: {
          borderColor: 'black',
          borderRadius: theme.radius.sm,
          textAlign: 'left',
        },
      }}
    />
  );
};

export default LanguageSelect;
