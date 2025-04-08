// components/RequestDescription.tsx
import { Textarea, useMantineTheme } from '@mantine/core';

interface RequestDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

const RequestDescription: React.FC<RequestDescriptionProps> = ({ value, onChange }) => {
  const theme = useMantineTheme();
  return (
    <Textarea
      label="Additional Details:"
      placeholder="Specify additional details here"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autosize
      minRows={3}
      radius="sm"
      styles={{
        label: {
          fontSize: theme.fontSizes.sm,
          fontWeight: 500,
        },
        input: {
          borderColor: 'black',
        },
      }}
    />
  );
};

export default RequestDescription;
