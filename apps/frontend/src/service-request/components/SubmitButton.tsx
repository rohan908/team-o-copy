import {Button} from '@mantine/core'
import React, { useState } from 'react';


interface SubmitButtonProps {
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({onClick}) => {

  return (
    <Button
      type="button"
      onClick={onClick}
      color="dark"
      bg="black"
      radius="xl"
    >
      Submit Request
    </Button>
  );
}

export default SubmitButton;
