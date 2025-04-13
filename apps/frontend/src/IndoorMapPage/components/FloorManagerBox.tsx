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


interface FloorSwitchBoxProps {
  floor: number;
  setFloor: (floor: number) => void;
  onCollapseChange?: (isCollapsed: boolean) => void;
}


const FloorSwitchBox: React.FC<FloorSwitchBoxProps> = ({ floor, setFloor, onCollapseChange}) => {
  const theme = useMantineTheme();
  const [collapsed, setCollapsed] = useState(false);


  const floor1 = () => setFloor(1);

  const floor3 = () =>
    setFloor(3);

  useEffect(() => {
    onCollapseChange?.(collapsed);
  }, [collapsed]);

  return (
    <Box
      pos="fixed"
      top={57}
      left={250}
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
          maxWidth: collapsed ? '300px' : '80%',
          opacity: 0.95,
          borderRadius: theme.radius.lg,
          backdropFilter: 'blur(5px)',
          boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <Collapse in={!collapsed}>
          <Title order={2} mb="md" c="black" ta="left" fw={700} fz={{ sm: 'md', md: 'xl' }}>
            Select a Floor
          </Title>

          <Flex direction="row" justify="sm">
            <Button
              onClick={floor1}
              color="dark"
              fw="600"
              bg="black"
              style={{
                borderRadius: '50px',
                transition: 'all 0.3s ease',
              }}>
              1
            </Button>
            <Button
              onClick={floor3}
              color="dark"
              fw="600"
              bg="black"
              style={{
                borderRadius: '50px',
                transition: 'all 0.3s ease',
              }}>
              3
            </Button>
          </Flex>
          <Flex>
            <text>
              Current Floor: {floor}
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
              <text>Floor Selection</text>
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

export default FloorSwitchBox;
