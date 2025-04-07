import React from 'react';
import { Box, TextInput, Button, Group, useMantineTheme, Title, Flex, Text} from '@mantine/core';
//import {IconArrowRight } from '@tabler/icons-react';



const LogInBox = () => {
    const theme = useMantineTheme();
    return (
        <Flex
          w="100%"
          h="100vh"
          justify="center"
          align="center"
          pl={{md: '20%', sm: '0%'}}
          order = {1}
        >
             {/*background box*/}
        <Box
          bg="white"
          p={{ base: 'xl', sm: '2rem', md: '3rem' }}
          w="100%"
          maw={{ base: '90%', sm: '70%', md: '600px' }}
          pos = "relative"
          style={{
            opacity: 0.85,
            borderRadius: theme.radius.lg,
            backdropFilter: 'blur(5px)',
          }}
        >
          <Title
            order={1}
            mb={{ base: 'md', sm: 'lg', md: 'xl' }}
            c="black"
            ta="left"
            fw={700}
            fz={{sm: 'xl', md: 'xxxl'}}
          >
            Let's get started
          </Title>
          
          <Text mb="md" ta="left">
            Looking for directions?
          </Text>
          
          <Flex gap="md" wrap="wrap" mb={{ base: 'lg', md: 'xl' }}>
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
          
          <Box mb="md" ta="left">
            Login here for Staff:
            <TextInput
              placeholder="Username"
              fz={{base: "xs", sm: "sm", md: "md"}}
              size={{base: "sm", md: "md"}}
              mt="md"
              mb="md"
            />
            
            <TextInput
              placeholder="Password"
              type="password"
              fz={{base: "xs", sm: "xs", md: "md"}}
              size={{base: "sm", xs: "xs", md: "md"}}
              mb="lg"
            />
            
          </Box>
          <Group justify="flex-start" w="100%">
              <Button 
                size="md" 
                color="dark"
                fw = '600'
                bg = 'black'
                //leftSection={<IconArrowRight size={14} />}
                style={{
                  borderRadius: '50px',
                  transition: 'all 0.3s ease',
                }}
              >
                Login
              </Button>
            </Group>
        </Box>
      </Flex>
    )
}

export default LogInBox;
