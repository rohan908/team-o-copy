// components/dateEntry.tsx
import { Box, Input, Text, useMantineTheme } from '@mantine/core';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
}

const DateInputForm: React.FC<DateInputProps> = ({ value, onChange }) => {
  const theme = useMantineTheme();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Box>
      <Text
        component="label"
        htmlFor="date"
        fz={{ base: 'sm', md: 'md', sm: 'sm', xs: 'xs' }}
          mb={theme.spacing.xs}
        style={{
          fontSize: theme.fontSizes.sm,
        }}
      >
        Select a date:*
      </Text>
      <Input
        id="date"
        type="date"
        value={value}
        onChange={handleDateChange}
        radius={theme.radius.sm}
        maw="10rem"
        styles={{
          input: {
            padding: theme.spacing.sm,
            borderColor: 'black',
            textAlign: 'left',
          },
        }}
      />
    </Box>
  );
};

export default DateInputForm;
