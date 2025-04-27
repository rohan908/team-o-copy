import {Flex, Box, Text, Stack, Tooltip, ActionIcon, Grid, Title} from "@mantine/core";
import IconCloud from "./IconCloudComponent.tsx";
import { Link } from "react-router-dom";

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
    <div className="relative flex items-center justify-center overflow-hidden" style={{ height: "100vh", width: "100vw" }}>
      <IconCloud images={images} />
    </div>
  );
}

function CreditPage() {
  const jiraImage = `https://cdn.simpleicons.org/jira/jira`;
  const discordImage = `https://cdn.simpleicons.org/discord/discord`;
  const githubImage = `https://cdn.simpleicons.org/github/github`;
  const webstormImage = `https://cdn.simpleicons.org/webstorm/webstorm`;
  const mantineImage = `https://cdn.simpleicons.org/mantine/mantine`;
  const viteImage = `https://cdn.simpleicons.org/vite/vite`;
  const postgresqlImage = `https://cdn.simpleicons.org/postgresql/postgresql`;
  const expressImage = `https://cdn.simpleicons.org/express/express`;
  const reactImage = `https://cdn.simpleicons.org/react/react`;
  const nodeImage = `https://cdn.simpleicons.org/nodedotjs/nodedotjs`;

  return (
    <Box h="100vh" w="100vw">
      <Flex direction="row" align="center" justify="flex-start" h="100vh" p="md">
        <Text style={{ position: "absolute", top: "0%", left: "40%"}}>Onyx Onis' Software Credits</Text>
        <Grid align="flex-start" spacing="sm" style={{ position: "absolute", top: "17%", zIndex: 10 }}>
          <Tooltip label="PostgreSQL">
            <Link to="">
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
            <Link to="">
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
            <Link to="">
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
        </Grid>
        <Stack align="flex-start" spacing="sm" style={{ position: "absolute", top: "50%", left: 25, zIndex: 10 }}>
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
              <img src={jiraImage} alt="jira" style={{objectFit: "contain"}}/>
            </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip label="Discord">
            <Link to="https://discord.com/">
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
                <img src={discordImage} alt="jira" style={{objectFit: "contain"}}/>
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip label="GitHub">
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
                <img src={githubImage} alt="jira" style={{objectFit: "contain"}}/>
              </ActionIcon>
            </Link>
          </Tooltip>
        </Stack>
        <Stack align="flex-start" spacing="sm" style={{ position: "absolute", top: "50%", right: 0, zIndex: 10 }}>
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
                <img src={webstormImage} alt="jira" style={{objectFit: "contain"}}/>
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip label="Vite">
            <Link to="https://vite.dev/">
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
                <img src={viteImage} alt="jira" style={{objectFit: "contain"}}/>
              </ActionIcon>
            </Link>
          </Tooltip>
        </Stack>
        <IconCloudDemo />
      </Flex>
    </Box>
  );
}

export default CreditPage;
