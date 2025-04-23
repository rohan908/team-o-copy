import { useState } from 'react';
import { Card, Image, Text, Badge, Button, Group, Transition } from '@mantine/core';

/*
  yo this code is 🔥🔥
  like actually ✅ worthy fr
 */

export function DisclaimerPopup() {
    const [visible, setVisible] = useState(true);

    return (
        <Transition
            mounted={visible}
            transition="fade"
            duration={15000}
            exitDelay={15000}
            onExited={() => setVisible(false)}
        >
            {(transitionStyle) => (
                <Card shadow="sm" padding="lg" radius="md" withBorder style={transitionStyle}>
                    <Card.Section>
                        <Image
                            src="../../../public/DisclaimerImages/waitWaitWait.gif"
                            height={160}
                            alt="Brigham Women's Hospital Picture!!!"
                        />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                        <Text fw={500}>Disclaimer:</Text>
                        <Badge color="F8D261">PLEASE READ</Badge>
                    </Group>

                    <Text size="sm" c="dimmed">
                        This web application is strictly a CS3733-D25 Software Engineering class
                        project for Prof. Wilson Wong at WPI
                    </Text>
                </Card>
            )}
        </Transition>
    );
}

export default DisclaimerPopup;
