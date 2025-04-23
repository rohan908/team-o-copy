import { useState, useEffect } from 'react';
import { Card, Image, Text, Badge, Box, Container, Group, Portal, Transition } from '@mantine/core';
import { FaDeleteLeft } from 'react-icons/fa6';
export function PopupTooltip() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 3000);
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
                duration={1000}
                exitDelay={1}
                timingFunction="ease"
            >
                {(transitionStyle) => (
                    <Box pos="fixed" top={10} left="50%" style={{ transform: 'translateX(-50%)' }}>
                        <Container size="xs" px="md">
                            <Card
                                shadow="sm"
                                bg="#285CC6"
                                padding="sm"
                                radius="xl"
                                style={transitionStyle}
                            >
                                <Text size="sm" c="#EBF2FF">
                                    Tip: Use backspace to delete nodes
                                </Text>
                            </Card>
                        </Container>
                    </Box>
                )}
            </Transition>
        </Portal>
    );
}

export default PopupTooltip;
