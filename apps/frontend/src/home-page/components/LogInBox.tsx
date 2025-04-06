import React from 'react';
import { Box, TextInput, Button, Group, Container, useMantineTheme, Title, Flex, Text } from '@mantine/core';


const LogInBox = () => {

    const theme = useMantineTheme();
    return (
        <Container
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '2rem',
          marginBottom: '1rem',
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        <Box
          style={{
            backgroundColor: 'white',
            opacity: 0.85,
            padding: '6rem',
            borderRadius: theme.radius.lg,
            backdropFilter: 'blur(5px)',
            minWidth: '450px',
            color: 'black',
            position: 'relative',
          }}
        >
          <Title
            order={1}
            style={{
              fontSize: theme.fontSizes.xxxl,
              fontWeight: 700,
              marginBottom: '2rem',
              color: 'black',
              textAlign: 'left',
            }}
          >
            Let's get started
          </Title>
          
          <Text style={{ marginBottom: '1rem', textAlign: 'left' }}>
            Looking for directions?
          </Text>
          
          <Flex gap="md" wrap="wrap" style={{ marginBottom: '2rem' }}>
            <Button variant="outline" color="dark" style={{ borderRadius: '20px', transition: 'all 0.3s ease' }}>
              Click Here to Continue as a Guest
            </Button>
          </Flex>
          
          <Box style={{ marginBottom: '1rem', textAlign: 'left' }}>
            Login here for Staff:
            <TextInput
              placeholder="Username"
              size="md"
              style={{ marginBottom: '1rem', marginTop: '1rem' }}
            />
            
            
            <TextInput
              placeholder="Password"
              size="md"
              style={{ marginBottom: '1.5rem' }}
            />
            
          </Box>
          <Group position="right" style={{ width: '100%' }}>
              <Button 
                size="md" 
                color="dark"
                style={{
                  fontWeight: 600,
                  padding: '10px 25px',
                  borderRadius: '50px',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'black',
                }}
              >
                Send
              </Button>
            </Group>
        </Box>
      </Container>
    )
}

export default LogInBox;
