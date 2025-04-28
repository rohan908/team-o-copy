import { useState } from 'react';
import {
    Button,
    Container,
    Text,
    Image,
    Group,
    Stack,
    Box,
    Paper,
    useMantineTheme,
} from '@mantine/core';
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
        image: 'public/TeamPhotos/Hudson.png',
    },
    {
        name: 'Rohan Inamdar',
        role: 'Assistant Lead Software Engineer',
        image: 'public/TeamPhotos/Rohan.png',
    },
    {
        name: 'Owen Hart',
        role: 'Assistant Lead Software Engineer',
        image: 'public/TeamPhotos/Owen.png',
    },
    {
        name: 'Yanding Mario',
        role: 'Assistant Lead Software Engineer',
        image: 'public/TeamPhotos/Yanding.png',
    },
    {
        name: 'Camden Brayton',
        role: 'Full-Time Software Engineer',
        image: 'public/TeamPhotos/Camden.png',
    },
    {
        name: 'Joseph Abata',
        role: 'Full-Time Software Engineer',
        image: 'public/TeamPhotos/Joe.png',
    },
    {
        name: 'Conner Daly',
        role: 'Full-Time Software Engineer',
        image: 'public/TeamPhotos/conner.png',
    },
    {
        name: 'Adam Blanchard',
        role: 'Scrum Master',
        image: 'public/TeamPhotos/Adam.png',
    },
    {
        name: 'Ethan Ramoth',
        role: 'Documentation',
        image: 'public/TeamPhotos/Ethan.png',
    },
];

export function AboutPage() {
    const theme = useMantineTheme();
    const [active, setActive] = useState(0);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % teamMembers.length);
    };

    const handlePrevious = () => {
        setActive((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    };

    const member = teamMembers[active];

    return (
        <Box bg={theme.colors.primaryBlues[0]} mih="100vh" py="xl">
            <Container size="lg" py="xl">
                <Stack align="center" gap="lg">
                    <Text ta="center" fz="xl" fw="bold" c={theme.colors.secondaryBlues[7]}>
                        Thank you to Brigham and Women's Hospital and their representative, Andrew
                        Shinn!
                    </Text>

                    <Group align="center" justify="center" mt="md" gap="xl" wrap="nowrap">
                        {/* Left side - Text content */}
                        <Stack gap={0} align="flex-start" w={300} style={{ alignSelf: 'center' }}>
                            <Text c={theme.colors.secondaryBlues[7]} fz="md">
                                WPI Computer Science Department
                            </Text>
                            <Text c={theme.colors.secondaryBlues[7]} fz="md">
                                CS3733-D25 Software Engineering, Prof. Wilson Wong
                            </Text>
                            <Text c={theme.colors.secondaryBlues[7]} fz="md">
                                Team Coach: Matt Hagger
                            </Text>
                        </Stack>

                        {/* Right side - Carousel */}
                        <Stack align="center" gap="sm" style={{ alignSelf: 'center' }}>
                            <Box pos="relative" w={250} h={250}>
                                {/* Background Image Stuff */}
                                <Paper
                                    pos="absolute"
                                    top={10}
                                    left={10}
                                    w="100%"
                                    h="100%"
                                    bg={theme.colors.secondaryBlues[7]}
                                    radius="lg"
                                    style={{ transform: 'rotate(5deg)', zIndex: 1 }}
                                />
                                <Paper
                                    pos="absolute"
                                    top={5}
                                    left={5}
                                    w="100%"
                                    h="100%"
                                    bg={theme.colors.secondaryBlues[5]}
                                    radius="lg"
                                    style={{ transform: 'rotate(-5deg)', zIndex: 2 }}
                                />

                                {/* Active Member image */}
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    radius="lg"
                                    width={250}
                                    height={250}
                                    fit="cover"
                                    style={{ position: 'relative', zIndex: 3 }}
                                />
                            </Box>

                            <Group justify="center" mt="sm">
                                <Button
                                    variant="light"
                                    color="blue"
                                    radius="xl"
                                    onClick={handlePrevious}
                                >
                                    <IconChevronLeft />
                                </Button>
                                <Button
                                    variant="light"
                                    color="blue"
                                    radius="xl"
                                    onClick={handleNext}
                                >
                                    <IconChevronRight />
                                </Button>
                            </Group>

                            <Stack gap={0} align="center" mt="sm">
                                <Text size="lg" fw={500} c={theme.colors.secondaryBlues[7]}>
                                    {member.name}
                                </Text>
                                <Text size="sm" c={theme.colors.secondaryBlues[7]}>
                                    {member.role}
                                </Text>
                            </Stack>
                        </Stack>
                    </Group>

                    <Text
                        ta="center"
                        mt="xl"
                        size="sm"
                        c={theme.colors.secondaryBlues[7]}
                        maw={500}
                    >
                        The Brigham & Women's Hospital maps and data used in this application are
                        copyrighted and provided for the sole use of educational purposes.
                    </Text>
                </Stack>
            </Container>
        </Box>
    );
}

export default AboutPage;
