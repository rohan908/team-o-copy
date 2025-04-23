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
        bg="#1C43A7" pos = "fixed" left = "93%" bottom = "2%"
        m="3px"
        style={{
          borderRadius: "20px",
          zIndex: 999,
          transition: 'all 0.4s ease-in-out',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.7)',
        }}
      >
        <Box m="6px" p="2px" bg="blueBase.6" style={{ borderRadius: "20px" }}>
          <SegmentedControl
            orientation="vertical"
            withItemsBorders={false}
            fullWidth
            size="md"
            m="3px"
            color="blueBase.6"
            value={floor.toString()}
            onChange={(value) => setFloor(parseInt(value))}
            data={[
              { label: '4', value: '4' },
              { label: '3', value: '3' },
              { label: '1', value: '1' },
            ]}
            styles={{
              root: {
                borderRadius: 20,
                backgroundColor: '#1C43A7',
              },
              label: {
                fontWeight: 600,
                color: 'white',
              },
              indicator: {
                borderRadius: 20,
              },
            }}
          />
        </Box>
      </Box>
    );
  } else if (building === 'admin'){
    return (
      <Box
        bg="#1C43A7" pos = "fixed" left = "93%" bottom = "2%"
        m="3px"
        style={{
          borderRadius: "20px",
          zIndex: 999,
          transition: 'all 0.4s ease-in-out',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.7)',
        }}
      >
        <Box m="6px" p="2px" bg="blueBase.6" style={{ borderRadius: "20px" }}>
          <SegmentedControl
            orientation="vertical"
            withItemsBorders={false}
            fullWidth
            size="md"
            m="3px"
            color="blueBase.6"
            value={floor.toString()}
            onChange={(value) => setFloor(parseInt(value))}
            data={[
              { label: 'FK', value: '6'},
              { label: 'CH', value: '5'},
              { label: '4', value: '4' },
              { label: '3', value: '3' },
              { label: '1', value: '1' },
            ]}
            styles = {{
              root: {
                borderRadius: 20,
                backgroundColor: '#1C43A7',
              },
              label: {
                fontWeight: 600,
                color: 'white',
              },
              indicator: {
                borderRadius: 8,
              }
              }}
          />
        </Box>
      </Box>
    );
  }
};

export default FloorSwitchBox;
