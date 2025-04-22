import { Flex, Transition, Text, Box, Button } from '@mantine/core';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function NotFound() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(true);
  }, []);

  return (
    <Box
      mih="100vh"
      style={{
        background: 'linear-gradient(0deg, #D8DFEB , #EBF2FF 100%)',
      }}
    >
      <Flex
        direction="column"
        justify="center"
        align="center"
        mih= "100%"
      >
        <Transition
          mounted={opened}
          transition="slide-right"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <Text style={styles} fz="5rem" fw={700} mt="7rem">
              404: Page Not Found
            </Text>
          )}
        </Transition>

        <Transition
          mounted={opened}
          transition="slide-left"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <Text style={styles} fz="lg">
              Oops, we can't find the page you were looking for. Does it exist?
            </Text>
          )}
        </Transition>

        <Transition
          mounted={opened}
          transition="slide-left"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <Button
              mt = "1rem"
              style={styles}
              component={Link}
              to="/"
            >
              Go Home
            </Button>
          )}
        </Transition>
      </Flex>
    </Box>
  );
}

export default NotFound;
