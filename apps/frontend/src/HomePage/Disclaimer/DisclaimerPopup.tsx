import { useState, useEffect } from 'react';
import { Card, Image, Text, Badge, Box, Container, Group, Portal, Transition } from '@mantine/core';

/*
  yo this code is 🔥🔥
  like actually ✅ worthy fr
 */

export function DisclaimerPopup() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 3500);
        /*
         this is for deleting the timer after the page dismounts
         */
        return () => clearTimeout(timer);
    }, []);

    return (
        <Portal>
            <Transition
                mounted={visible}
                transition="fade"
                duration={500}
                exitDelay={1}
                timingFunction="ease"
            >
                {(transitionStyle) => (
                    <Box
                        pos="fixed"
                        top={20}
                        left="50%"
                        style={{ transform: 'translateX(-50%)', zIndex: '10000' }}
                    >
                        <Container size="xs" px="md">
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                style={transitionStyle}
                            >
                                <Card.Section>
                                    <Image
                                        src="DisclaimerImages/WPI_IMAGE_RED.png"
                                        height={160}
                                        alt="✅ WPI L🔥G🔥 PICTURE (🔥FFICIAL) ✅"
                                    />
                                </Card.Section>

                                <Group justify="space-between" mt="md" mb="xs">
                                    <Text fw={500}>Disclaimer</Text>
                                    <Badge color="yellow">IMPORTANT</Badge>
                                </Group>

                                <Text size="sm" c="dimmed">
                                    This web application is strictly a CS3733-D25 Software
                                    Engineering class project for Prof. Wilson Wong at WPI
                                </Text>
                            </Card>
                        </Container>
                    </Box>
                )}
            </Transition>
        </Portal>
    );
}

export default DisclaimerPopup;
