import React, { useRef } from 'react';
import { useMantineTheme, Box, Container, Title, Text } from '@mantine/core';
import WaveAnimation from './waveAnimation'; // Import the new WaveAnimation component

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


      <Container
        style={{
          position: 'relative',
          zIndex: 1,
          color: 'white',
          textAlign: 'center',
          padding: '2rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          style={{
            backgroundColor: theme.colors.blueBase?.[4], opacity: 0.9,
            padding: '3rem',
            borderRadius: theme.radius.lg,
            backdropFilter: 'blur(5px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
          }}
        >
          <Title
            order={1}
            style={{
              fontSize: theme.fontSizes.xxxl,
              fontWeight: 900,
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
              letterSpacing: '1px',
              color: theme.colors.terquAccet?.[0] || 'white'
            }}
          >
            Welcome To Mass Brigham & Women's Hospital
          </Title>
          <Text
            style={{
              fontSize: theme.fontSizes.xxl,
              maxWidth: '800px',
              margin: '0 auto',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)',
              fontWeight: 500,
              color: theme.colors.terquAccet?.[1] || 'white'
            }}
          >
            Login to access the system
          </Text>
          {/* Add additional content (buttons, links, etc.) as needed */}
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
