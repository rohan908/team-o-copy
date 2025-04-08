import { useMantineTheme, Box, Text, Input } from '@mantine/core';

interface RoomNumberInputProps {
  value: string;
  onRoomNumberChange: (roomNumber: string) => void;
}

const RoomNumberInput: React.FC<RoomNumberInputProps> = ({ value, onRoomNumberChange }) => {
  const theme = useMantineTheme();
  const handleRoomNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Only allow digits and limit to 3 characters
    if (/^\d{0,3}$/.test(newValue)) {
      onRoomNumberChange(newValue);
    }
  };

  return (
    <Box>
      <Text
        component="label"
        htmlFor="roomNumberInput"
        fz={{ base: 'sm', md: 'md', sm: 'sm', xs: 'xs' }}
        fw={500}
        mb={4}
        display="block"
      >
        Enter the room number for interpreter:*
      </Text>
      <Input
        id="roomNumberInput"
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleRoomNumberChange}
        placeholder="000"
        required
        radius="sm"
        maw="4rem"
        styles={{
          input: {
            textAlign: 'center',
            padding: '0.5rem',
            borderColor: 'black',
          },
        }}
      />
    </Box>
  );
};

export default RoomNumberInput;
