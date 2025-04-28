import { useState } from 'react';
import {Button, Container, Text, Image, Group, Center, Stack, Box, Paper} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

type Member = {
    name: string;
    role: string;
    image: string;
};

const teamMembers: Member[] = [
    {
        name: "Liam O'Driscoll",
        role: 'Project Manager',
        image: 'public/TeamPhotos/liam.png',
    },
    {
        name: 'Logan Winters',
        role: 'Project Owner',
        image: 'public/TeamPhotos/Logan.png',
    },
    {
        name: 'Hudson Kortus',
        role: 'Lead Software Engineer',
        image: 'public/TeamPhotos/HudsonKortus.jpg',
    },
    {
        name: 'Rohan Inamdar',
        role: 'Assistant Lead Software Engineer',
        image: 'public/TeamPhotos/Rohan.jpeg',
    },
    {
        name: 'Owen Hart',
        role: 'Assistant Lead Software Engineer',
        image: 'public/TeamPhotos/Owen.jpeg',
    },
    {
        name: 'Yanding Mario',
        role: 'Assistant Lead Software Engineer',
        image: 'public/TeamPhotos/Yanding.png',
    },
    {
        name: 'Camden Brayton',
        role: 'Full-Time Software Engineer',
        image: 'public/TeamPhotos/Camden.jpg',
    },
    {
        name: 'Joseph Abata',
        role: 'Full-Time Software Engineer',
        image: 'public/TeamPhotos/JoeAbata.JPG',
    },
    {
        name: 'Conner Daly',
        role: 'Full-Time Software Engineer',
        image: 'public/TeamPhotos/conner.png',
    },
    {
        name: 'Adam Blanchard',
        role: 'Scrum Master',
        image: 'public/TeamPhotos/Adam.jpg',
    },
    {
        name: 'Ethan Ramoth',
        role: 'Documentation',
        image: 'public/TeamPhotos/Ethan.png',
    },
];

export function TeamRotation() {
    const [active, setActive] = useState(0);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % teamMembers.length);
    };

    const handlePrevious = () => {
        setActive((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    };

    const member = teamMembers[active];

    return (
        <Container size="lg" py="xl">
            <Stack align="center" gap="lg">
                <Text ta="center" fz="xl" fw="bold" c="blue.8">
                    Thank you to Brigham and Women’s Hospital and their representative, Andrew
                    Shinn!
                </Text>

                <Stack gap={0} align="center" mt="md">
                    <Text ta="center" c="blue.8" fz="md">
                        WPI Computer Science Department
                    </Text>
                    <Text ta="center" c="blue.8" fz="md">
                        CS3733-D25 Software Engineering, Prof. Wilson Wong
                    </Text>
                    <Text ta="center" c="blue.8" fz="md">
                        Team Coach: Matt Hagger
                    </Text>
                </Stack>

                <Box pos="relative" w={250} h={250}>
                  {/*Background Image Stuff*/}
                  <Paper
                    pos="absolute"
                    top={10}
                    left={10}
                    w="100%"
                    h="100%"
                    bg="white"
                    radius="lg"
                    sx={{transform: "rotate(5deg)" }}
                    zIndex={1}
                  />
            </Stack>
        </Container>
    );
}
