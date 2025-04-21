import {Flex, Transition, Text, Box, Button} from '@mantine/core';
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom';

function NotFound() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(true);
    }, [])

  return (
    <Box
      style={{
      minHeight: '100vh',
      background:'linear-gradient(0deg, #D8DFEB , #EBF2FF 100%)',
    }}>
    <Transition
      mounted={opened}
      transition="slide-right"
      duration={400}
      timingFunction="ease"
    >
      {(styles) =>
        <Flex
        top = "35%"
        pos = "fixed"
        >
        <Text style={styles} fz = '5rem' fw = {700} ff = "Roboto, sans-serif">404: Page Not Found</Text>
        </Flex>}
    </Transition>
    <Transition
    mounted={opened}
    transition="slide-left"
    duration={400}
    timingFunction="ease">
      {(styles) =>
        <Flex
          top = "55%"
          pos = "fixed"
        >
          <Text style={styles} fz = "lg" ff = "Roboto, sans-serif">Oops, we can't find the page you were looking for. Does it exist?</Text>
        </Flex>}
    </Transition>
      <Transition
        mounted={opened}
        transition="slide-left"
        duration={400}
        timingFunction="ease">
        {(styles) =>
          <Flex
            pos = "fixed"
            top = "63%"
            left = "20%"
          >
            <Button style={styles} component = {Link} to="/" >
              Go Home
            </Button>
          </Flex>}
      </Transition>
  </Box>
  );
}

export default NotFound;


