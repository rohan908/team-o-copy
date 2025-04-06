import React from 'react';
import { Box, TextInput, Button, Group, Container, useMantineTheme, Title, Flex, Text } from '@mantine/core';


const LogInBox = () => {

    const theme = useMantineTheme();
    return (
        <Container
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '1rem',
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingLeft: '20%',
          '@media (max-width: 600px)': {
            paddingLeft: '0%',
          },
        }}
      >
             {/*background box*/}
        <Box
          style={{
            backgroundColor: 'white',
            opacity: 0.85,
            padding: theme.spacing.xl,
            borderRadius: theme.radius.lg,
            backdropFilter: 'blur(5px)',
            width: '100%',
            maxWidth: '800px',
            color: 'black',
            position: 'relative',
            margin: '0 auto',
            '@media (max-width: 768px)': {
              padding: theme.spacing.md,
              maxWidth: '90%',
            },
            '@media (max-width: 480px)': {
              padding: theme.spacing.sm,
              maxWidth: '95%',
            }
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
            <Button 
              variant="outline" 
              color="dark" 
              style={{ 
                borderRadius: '20px', 
                transition: 'all 0.3s ease',
                fontSize: 'clamp(12px, 3vw, 18px)',
              }}
            >
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
              type="password"
            />
            
          </Box>
          <Group position="right" style={{ width: '100%' }}>
              <Button 
                size="md" 
                color="dark"
                style={{
                  fontWeight: 600,
                  borderRadius: '50px',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'black',
                }}
              >
                Login
              </Button>
            </Group>
        </Box>
      </Container>
    )
}

export default LogInBox;
