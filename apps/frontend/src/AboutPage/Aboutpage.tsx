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
    MantineTheme,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

type Member = {
    name: string;
    role: string;
    image: string;
    quote: string;
};

const teamMembers: Member[] = [
    {
        name: "Liam O'Driscoll",
        role: 'Project Manager',
        quote: '"How much of his voice would we need to make the tts him?"',
        image: 'public/TeamPhotos/liam.png',
    },
    {
        name: 'Logan Winters',
        role: 'Project Owner',
        quote: '"Stay hard "- David Goggins',
        image: 'public/TeamPhotos/Logan.png',
    },
    {
        name: 'Hudson Kortus',
        role: 'Lead Software Engineer',
        quote: '"rm fr ./*"',
        image: 'public/TeamPhotos/Hudson.png',
    },
    {
        name: 'Rohan Inamdar',
        role: 'Assistant Lead Software Engineer',
        quote: '"I never recovered from the JD Honey"',
        image: 'public/TeamPhotos/Rohan.png',
    },
    {
        name: 'Owen Hart',
        role: 'Assistant Lead Software Engineer',
        quote: '"you\'re on the wong page"',
        image: 'public/TeamPhotos/Owen.png',
    },
    {
        name: 'Yanding Mario',
        role: 'Assistant Lead Software Engineer',
        quote: '"Yanding-Submit-Bug"',
        image: 'public/TeamPhotos/Yanding.png',
    },
    {
        name: 'Camden Brayton',
        role: 'Full-Time Software Engineer',
        quote: '"In the beginning the Universe was created. This has made a lot of people very angry and been widely regarded as a bad move."',
        image: 'public/TeamPhotos/Camden.png',
    },
    {
        name: 'Joseph Abata',
        role: 'Full-Time Software Engineer',
        quote: '',
        image: 'public/TeamPhotos/Joe.png',
    },
    {
        name: 'Conner Daly',
        role: 'Full-Time Software Engineer',
        quote: '"RIP PR-2447313140: by Mario-Runner, 2024-2024"',
        image: 'public/TeamPhotos/conner.png',
    },
    {
        name: 'Adam Blanchard',
        role: 'Scrum Master',
        quote: '"Give me empty quotes, I don\'t say anything"',
        image: 'public/TeamPhotos/Adam.png',
    },
    {
        name: 'Ethan Ramoth',
        role: 'Documentation',
        quote: '"I want to do a cartwheel, but real casual-like. Not make a big deal about it, but I know everybody saw it. One stunning, gorgeous cartwheel."',
        image: 'public/TeamPhotos/Ethan.png',
    },
];

const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
};

interface AnimatedTooltipProps {
    children: React.ReactNode;
    member: Member;
    theme: MantineTheme;
}

const AnimatedTooltip = ({ children, member, theme }: AnimatedTooltipProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const springConfig = { stiffness: 100, damping: 5 };
    const x = useMotionValue(0);
    const rotate = useSpring(useTransform(x, [-100, 100], [-15, 15]), springConfig);
    const translateX = useSpring(useTransform(x, [-100, 100], [-10, 10]), springConfig);
    const handleMouseMove = (event: any) => {
        const halfWidth = event.currentTarget.offsetWidth / 2;
        x.set(event.nativeEvent.offsetX - halfWidth);
    };

    const bubbleColor = theme.colors.secondaryBlues[5];

    return (
        <div
            className="group relative"
            onMouseEnter={() => setHoveredIndex(1)}
            onMouseLeave={() => setHoveredIndex(null)}
        >
            <div onMouseMove={handleMouseMove}>{children}</div>

            <AnimatePresence mode="popLayout">
                {hoveredIndex !== null && member.quote && (
                    <motion.div
                        initial={{ opacity: 0, x: -10, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: 1,
                            transition: {
                                type: 'spring',
                                stiffness: 300,
                                damping: 20,
                            },
                        }}
                        exit={{ opacity: 0, x: -10, scale: 0.95 }}
                        style={{
                            translateX: translateX,
                            rotate: rotate,
                            backgroundColor: bubbleColor,
                        }}
                        className="absolute left-full top-1/2 z-50 flex flex-col items-center justify-center rounded-xl px-5 py-3 shadow-xl ml-3 min-w-[180px] max-w-[220px]"
                    >
                        <div
                            className="absolute -left-1.5 top-1/2 w-3 h-3 transform -translate-y-1/2 rotate-45"
                            style={{ backgroundColor: bubbleColor }}
                        />
                        <div className="relative z-30 text-sm text-white text-center leading-snug">
                            {member.quote}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

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

    const isActive = (index: number) => {
        return index === active;
    };

    return (
        <Box bg={theme.colors.primaryBlues[0]} mih="100vh" py="xl">
            <Container size="lg" py={0} px={0}>
                <Stack align="center" gap="lg">
                    <Text mt="xl" ta="center" fz="xl" c={theme.colors.secondaryBlues[7]}>
                        Thank you to Brigham and Women's Hospital and their representative, Andrew
                        Shinn!
                    </Text>

                    <Box w="100%" bg={theme.colors.yellowAccent[3]} h="2px" />

                    <Group align="center" justify="center" mt="md" gap="xl" wrap="nowrap" px="md">
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

                        <Stack align="center" gap="sm" style={{ alignSelf: 'center' }}>
                            <Box pos="relative" w={250} h={250}>
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

                                <AnimatePresence>
                                    {teamMembers.map((member, index) => (
                                        <motion.div
                                            key={member.image}
                                            initial={{
                                                opacity: 0,
                                                scale: 0.9,
                                                z: -100,
                                                rotate: randomRotateY(),
                                            }}
                                            animate={{
                                                opacity: isActive(index) ? 1 : 0,
                                                scale: isActive(index) ? 1 : 0.95,
                                                z: isActive(index) ? 0 : -100,
                                                rotate: isActive(index) ? 0 : randomRotateY(),
                                                zIndex: isActive(index)
                                                    ? 40
                                                    : teamMembers.length + 2 - index,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.9,
                                                z: 100,
                                                rotate: randomRotateY(),
                                            }}
                                            transition={{
                                                duration: 0.4,
                                                ease: 'easeInOut',
                                            }}
                                            className="absolute inset-0 origin-bottom"
                                            style={{ zIndex: isActive(index) ? 3 : 0 }}
                                        >
                                            <AnimatedTooltip member={member} theme={theme}>
                                                <Image
                                                    src={member.image}
                                                    alt={member.name}
                                                    radius="lg"
                                                    width={250}
                                                    height={250}
                                                    fit="cover"
                                                    style={{ position: 'relative' }}
                                                />
                                            </AnimatedTooltip>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
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

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active}
                                    initial={{
                                        y: 20,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        y: 0,
                                        opacity: 1,
                                    }}
                                    exit={{
                                        y: -20,
                                        opacity: 0,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: 'easeInOut',
                                    }}
                                >
                                    <Stack gap={0} align="center" mt="sm">
                                        <Text
                                            size="lg"
                                            ta="center"
                                            fw={500}
                                            c={theme.colors.secondaryBlues[7]}
                                        >
                                            {member.name}
                                        </Text>
                                        <Text
                                            size="sm"
                                            ta="center"
                                            c={theme.colors.secondaryBlues[7]}
                                        >
                                            {member.role}
                                        </Text>
                                    </Stack>
                                </motion.div>
                            </AnimatePresence>
                        </Stack>
                    </Group>

                    <Box w="100%" bg={theme.colors.yellowAccent[3]} h="2px" />

                    <Text ta="center" mt="md" size="sm" c={theme.colors.secondaryBlues[7]} px="md">
                        The Brigham & Women's Hospital maps and data used in this application are
                        copyrighted and provided for the sole use of educational purposes.
                    </Text>
                </Stack>
            </Container>
        </Box>
    );
}

export default AboutPage;
