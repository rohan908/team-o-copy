import {
    Container,
    Text,
    Group,
    Stack,
    Box,
    useMantineTheme,
    Tooltip,
    ActionIcon,
} from '@mantine/core';
import  IconCloud  from "./IconCloudComponent.tsx"
import { Link } from 'react-router-dom';


const slugs = [
    "typescript",
    "javascript",
    "react",
    "html5",
    "css3",
    "nodedotjs",
    "tailwindcss",
    "vite",
    "vitest",
    "webstorm",
    "mantine",
    "express",
    "prisma",
    "amazonwebservices",
    "postgresql",
    "bruno",
    "docker",
    "git",
    "jira",
    "github",
    "figma",
    "discord",
];
function IconCloudDemo() {
    const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);

    return (
        <div className="relative flex items-center justify-center overflow-hidden" style={{ height: "300px", width: "300px" }}>
            <IconCloud images={images} />
        </div>
    );
}

export function CreditPage() {
    const theme = useMantineTheme();
    const jiraImage = `https://cdn.simpleicons.org/jira/jira`;
    const figmaImage = `https://cdn.simpleicons.org/figma/figma`;
    const githubImage = `https://cdn.simpleicons.org/github/github`;
    const webstormImage = `https://cdn.simpleicons.org/webstorm/webstorm`;
    const mantineImage = `https://cdn.simpleicons.org/mantine/mantine`;
    const viteImage = `https://cdn.simpleicons.org/vite/vite`;
    const postgresqlImage = `https://cdn.simpleicons.org/postgresql/postgresql`;
    const expressImage = `https://cdn.simpleicons.org/express/express`;
    const reactImage = `https://cdn.simpleicons.org/react/react`;
    const nodeImage = `https://cdn.simpleicons.org/nodedotjs/nodedotjs`;
    const typescriptImage = `https://cdn.simpleicons.org/typescript/typescript`;
    const prismaImage = `https://cdn.simpleicons.org/prisma/prisma`;
    const phoImage = "./public/Pholicious-Logo-white-wo-bottom-1.png";


    return (
        <Box bg={theme.colors.primaryBlues[0]} mih="100vh" py="md">
            <Container size="lg" py="xl">
                <Stack align="center" gap="lg">
                    <Text ta="center" fz="xl" fw="bold" c={theme.colors.secondaryBlues[7]}>
                        Onyx Onis' Software Credits
                    </Text>
                    <Box bg={theme.colors.yellowAccent[3]} w="100%" h="2px" mb="md" />

                    <Group align="flex-start" justify="center" mt="md" gap="xl" wrap="nowrap">
                        {/* Left side - Text content */}
                        <Stack gap={5} align="center" w={600}>
                            <Text c={theme.colors.secondaryBlues[7]} fz="lg">
                                This project fundamentally relies on the PERN stack:
                            </Text>
                            <Group justify = "center" style={{zIndex: 10 }}>
                                <Tooltip label="PostgreSQL">
                                    <Link to="https://www.postgresql.org/">
                                        <ActionIcon
                                            size="xl"
                                            variant="transparent"
                                            style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 50,
                                                padding: 0
                                            }}
                                        >
                                            <img src={postgresqlImage} alt="PostgreSQL" style={{objectFit: "contain"}}/>
                                        </ActionIcon>
                                    </Link>
                                </Tooltip>
                                <Tooltip label="Express">
                                    <Link to="https://expressjs.com/">
                                        <ActionIcon
                                            size="xl"
                                            variant="transparent"
                                            style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 50,
                                                padding: 0
                                            }}
                                        >
                                            <img src={expressImage} alt="express" style={{objectFit: "contain"}}/>
                                        </ActionIcon>
                                    </Link>
                                </Tooltip>
                                <Tooltip label="React">
                                    <Link to="https://react.dev/">
                                        <ActionIcon
                                            size="xl"
                                            variant="transparent"
                                            style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 50,
                                                padding: 0
                                            }}
                                        >
                                            <img src={reactImage} alt="react" style={{objectFit: "contain"}}/>
                                        </ActionIcon>
                                    </Link>
                                </Tooltip>
                                <Tooltip label="Node.js">
                                    <Link to="https://nodejs.org/">
                                        <ActionIcon
                                            size="xl"
                                            variant="transparent"
                                            style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 50,
                                                padding: 0
                                            }}
                                        >
                                            <img src={nodeImage} alt="Node.js" style={{objectFit: "contain"}}/>
                                        </ActionIcon>
                                    </Link>
                                </Tooltip>
                            </Group>
                            <Text c={theme.colors.secondaryBlues[7]} fz="lg">But this project wouldn't be what it is without:</Text>
                            <Group justify = "center" style={{zIndex: 10 }}>
                            <Tooltip label="Mantine">
                                <Link to="https://mantine.dev/">
                                    <ActionIcon
                                        size="xl"
                                        variant="transparent"
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 50,
                                            padding: 0
                                        }}
                                    >
                                        <img src={mantineImage} alt="Mantine" style={{objectFit: "contain"}}/>
                                    </ActionIcon>
                                </Link>
                            </Tooltip>
                            <Tooltip label="Figma">
                                <Link to="https://www.figma.com/">
                                    <ActionIcon
                                        size="xl"
                                        variant="transparent"
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 50,
                                            padding: 0
                                        }}
                                    >
                                        <img src={figmaImage} alt="figma" style={{objectFit: "contain"}}/>
                                    </ActionIcon>
                                </Link>
                            </Tooltip>
                            <Tooltip label="Jira">
                                <Link to="https://www.atlassian.com/software/jira">
                                    <ActionIcon
                                        size="xl"
                                        variant="transparent"
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 50,
                                            padding: 0
                                        }}
                                    >
                                        <img src={jiraImage} alt="Jira" style={{objectFit: "contain"}}/>
                                    </ActionIcon>
                                </Link>
                            </Tooltip>
                            <Tooltip label="Github">
                                <Link to="https://github.com/">
                                    <ActionIcon
                                        size="xl"
                                        variant="transparent"
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 50,
                                            padding: 0
                                        }}
                                    >
                                        <img src={githubImage} alt="Github" style={{objectFit: "contain"}}/>
                                    </ActionIcon>
                                </Link>
                            </Tooltip>
                            </Group>
                            <Group justify = "center" style={{zIndex: 10 }}>
                            <Tooltip label="Webstorm">
                                <Link to="https://www.jetbrains.com/webstorm/">
                                    <ActionIcon
                                        size="xl"
                                        variant="transparent"
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 50,
                                            padding: 0
                                        }}
                                    >
                                        <img src={webstormImage} alt="Webstorm" style={{objectFit: "contain"}}/>
                                    </ActionIcon>
                                </Link>
                            </Tooltip>
                            <Tooltip label="Vite">
                                <Link to="https://vitejs.dev/">
                                    <ActionIcon
                                        size="xl"
                                        variant="transparent"
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 50,
                                            padding: 0
                                        }}
                                    >
                                        <img src={viteImage} alt="Vite" style={{objectFit: "contain"}}/>
                                    </ActionIcon>
                                </Link>
                            </Tooltip>
                            <Tooltip label="Typescript">
                                <Link to="https://www.typescriptlang.org/">
                                    <ActionIcon
                                        size="xl"
                                        variant="transparent"
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 50,
                                            padding: 0
                                        }}
                                    >
                                        <img src={typescriptImage} alt="Typescript" style={{objectFit: "contain"}}/>
                                    </ActionIcon>
                                </Link>
                            </Tooltip>
                            <Tooltip label="PrismaORM">
                                <Link to="https://www.prisma.io/">
                                    <ActionIcon
                                        size="xl"
                                        variant="transparent"
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 50,
                                            padding: 0
                                        }}
                                    >
                                        <img src={prismaImage} alt="Prisma" style={{objectFit: "contain"}}/>
                                    </ActionIcon>
                                </Link>
                            </Tooltip>
                            </Group>
                            <Tooltip label="PhoLicious">
                                <Link to="https://pholiciousholden.com/">
                                    <ActionIcon
                                        size="xl"
                                        variant="transparent"
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 50,
                                            padding: 0
                                        }}
                                    >
                                        <img src={phoImage} alt="Pho" style={{objectFit: "contain"}}/>
                                    </ActionIcon>
                                </Link>
                            </Tooltip>
                        </Stack>

                        <Stack align="center" gap="sm">
                            <Stack gap={0} align="center">
                                <IconCloudDemo/>
                            </Stack>

                        </Stack>
                    </Group>

                    <Text
                        ta="center"
                        mt="lg"
                        size="sm"
                        c={theme.colors.secondaryBlues[7]}
                        maw={600}
                    >
                        Click an icon to learn more about the technology used in this project.
                    </Text>
                    <Box bg={theme.colors.yellowAccent[3]} w="100%" h="2px" mt="lg" />
                </Stack>
            </Container>
        </Box>
    );
}

export default CreditPage;
