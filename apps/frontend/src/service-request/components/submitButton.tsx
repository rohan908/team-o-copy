import {Button} from '@mantine/core'
import React, { useState } from 'react';


interface SubmitButtonProps {
  language: string;
  selectedDate: string;
  selectedTime: string;
  roomNumber: string;
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = (
  {
    language,
    selectedDate,
    selectedTime,
    roomNumber,
    onClick,}) => {

  return (
    <Button
      type="button"
      onClick={onClick}
      color="dark"
      bg="black"
      radius="xl"
      disabled={
        language === 'Error' ||
        !selectedDate.trim() ||
        !selectedTime.trim() ||
        !roomNumber.trim()
      }
    >
      Submit Request
    </Button>
  );
}

export default SubmitButton;
