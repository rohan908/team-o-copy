import React, { useRef } from 'react';
import { useMantineTheme, Box, Container, Title, Text, TextInput, PasswordInput, Button, Group, Flex, CloseButton } from '@mantine/core';
import WaveAnimation from './waveAnimation'; // Import the new WaveAnimation component
import LogInBox from "./LogInBox";

const HeroSection = () => {
  const theme = useMantineTheme();
  const canvasRef = useRef(null);

  return (
    <Box
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
      }}
    >

      <WaveAnimation id="waveCanvas" />


      <LogInBox />
    </Box>
  );
};

export default HeroSection;
