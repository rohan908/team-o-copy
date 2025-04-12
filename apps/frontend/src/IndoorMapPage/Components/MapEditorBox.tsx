import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Collapse,
    Button,
    ActionIcon,
    useMantineTheme,
    Title,
    Flex,
} from '@mantine/core';
import {IconArrowBadgeRight, IconArrowBadgeDown} from '@tabler/icons-react'

interface MapEditorBoxProps {
  onCollapseChange?: (isCollapsed: boolean) => void;
}

const MapEditorBox: React.FC<MapEditorBoxProps> = ({onCollapseChange}) => {
    const theme = useMantineTheme();
    const [collapsed, setCollapsed] = useState(false);

    const handleAddNode = () =>
      null;
    const handleAddEdge = () =>
      null;
    const handleRemoveNode = () =>
      null;
    const handleRemoveEdge = () =>
      null;

    useEffect(() => {
      onCollapseChange?.(collapsed);
    }, [collapsed]);

    return (
        <Box
          pos="fixed"
          left={0}
          right={0}
          style={{
              zIndex: 999,
              display: 'flex',
              justifyContent: 'left',
              transition: 'all 0.4s ease-in-out',
              paddingBottom: collapsed ? 0 : '1.5rem',
          }}
      >
        <Box
          bg="white"
          p={collapsed ? 0 : { base: 'xl', sm: '2rem' }}
          w="20%"
          style={{
            maxWidth: collapsed ? '300px' : '80%', // ✅ Collapse mode limits width
            opacity: 0.95,
            borderRadius: theme.radius.lg,
            backdropFilter: 'blur(5px)',
            boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
          }}
        >
          <Collapse in={!collapsed}>
            <Title order={2} mb="md" c="black" ta="left" fw={700} fz={{ sm: 'xl', md: 'xxxl' }}>
              Edit the Map
            </Title>

            <Flex direction="row" justify="sm">
              <Button
                onClick={handleAddNode}
                color="dark"
                fw="600"
                bg="black"
                style={{
                borderRadius: '50px',
                transition: 'all 0.3s ease',
              }}>
                Add Node
              </Button>
              <Button
                onClick={handleAddEdge}
                color="dark"
                fw="600"
                bg="black"
                style={{
                  borderRadius: '50px',
                  transition: 'all 0.3s ease',
                }}>
                Add Edge
              </Button>
            </Flex>
            <Flex direction="row" justify="space-between">
              <Button
                onClick={handleRemoveNode}
                color="dark"
                fw="600"
                bg="black"
                style={{
                  borderRadius: '50px',
                  transition: 'all 0.3s ease',
                }}>
                Remove Node
              </Button>
              <Button
                onClick={handleRemoveEdge}
                color="dark"
                fw="600"
                bg="black"
                style={{
                  borderRadius: '50px',
                  transition: 'all 0.3s ease',
                }}>
                Remove Edge
              </Button>
            </Flex>
            <Flex direction="row" justify="space-between">
              <text>
                x: 1232
              </text>
              <text>
                y: 1232
              </text>
              <text>
                floor: 1
              </text>
            </Flex>


            <ActionIcon size="input-sm" onClick={()=>setCollapsed(true)} aria-label="ActionIcon the same size as inputs">
              <IconArrowBadgeRight/>
            </ActionIcon>



            <Flex justify="flex-end" gap="md">
            </Flex>
          </Collapse>

          {collapsed && (
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Box
                w="100%"
                maw={{ base: '100%', md: '400px' }}
              >
                <text>Map Editor Tools</text>
                <ActionIcon size="input-sm" onClick={()=>setCollapsed(false)} aria-label="ActionIcon the same size as inputs">
                  <IconArrowBadgeDown/>
                </ActionIcon>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    );
};

export default MapEditorBox;
