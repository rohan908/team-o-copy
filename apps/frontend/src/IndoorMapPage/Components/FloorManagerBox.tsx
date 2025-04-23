import React, { useState, useEffect, useContext } from 'react';
import { Box, useMantineTheme, SegmentedControl } from '@mantine/core';
import {MantineProvider} from '@mantine/core';

interface FloorSwitchBoxProps {
  floor: number;
  setFloor: (floor: number) => void;
  onCollapseChange?: (isCollapsed: boolean) => void;
  building: string;
}

const FloorSwitchBox: React.FC<FloorSwitchBoxProps> = ({
    floor,
    setFloor,
    building,
}) => {
  const theme = useMantineTheme();

  // TODO: In the future these should re-suse a react component.
  if (building === '22 Patriot Pl' || building == '20 Patriot Pl') {
    return (
      <Box
        bg="themeGold.5" pos = "fixed" left = "93%" bottom = "2%"
        style={{
          zIndex: 999,
          transition: 'all 0.4s ease-in-out',
        }}
      >
        <SegmentedControl
          orientation="vertical"
          fullWidth
          size="md"
          color="#FCB024"
          value={floor.toString()}
          onChange={(value) => setFloor(parseInt(value))}
          data={[
            { label: '4', value: '4' },
            { label: '3', value: '3' },
            { label: '1', value: '1' },
          ]}
          styles={{
            root: {
              borderRadius: 10,
              backgroundColor: '#164EC5',
            },
            label: {
              fontWeight: 600,
              color: 'white',
            },
            indicator: {
              borderRadius: 5,
            },
          }}
        />
      </Box>
    );
  } else if (building === 'admin'){
    return (
      <Box
    pos = "fixed"
    left = "93%"
    bottom = "2%"
    style={{
      zIndex: 999,
      transition: 'all 0.4s ease-in-out',
    }}
  >
        <SegmentedControl
          orientation="vertical"
          size="md"
          color = "#FCB024"
          value={floor.toString()}
          onChange={(value) => setFloor(parseInt(value))}
          data={[
            { label: 'CH', value: '5'},
            { label: '4', value: '4' },
            { label: '3', value: '3' },
            { label: '1', value: '1' },
          ]}
          styles = {{
            root: {
              borderRadius: 30,
              backgroundColor: '#164EC5',
            },
            label: {
              fontWeight: 600,
              color: 'white',
            },
            indicator: {
              borderRadius: 50,
            }
            }}
        />
      </Box>
    );
  }
};

export default FloorSwitchBox;
