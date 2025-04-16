import React, { useState, useEffect, useContext } from 'react';
import { Box, useMantineTheme, SegmentedControl } from '@mantine/core';

interface FloorSwitchBoxProps {
    floor: number;
    setFloor: (floor: number) => void;
    onCollapseChange?: (isCollapsed: boolean) => void;
    building: string;
}

const FloorSwitchBox: React.FC<FloorSwitchBoxProps> = ({
    floor,
    setFloor,
    onCollapseChange,
    building,
}) => {
    const theme = useMantineTheme();
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        onCollapseChange?.(collapsed);
    }, [collapsed]);
    // TODO: In the future these should re-suse a react component.
    if (building === '22 Patriot Pl' || building == '20 Patriot Pl') {
        return (
            <Box
                pos="fixed"
                top={450}
                left={1250}
                style={{
                    zIndex: 999,
                    display: 'flex',
                    justifyContent: 'left',
                    transition: 'all 0.4s ease-in-out',
                }}
            >
                <SegmentedControl
                    orientation="vertical"
                    fullWidth
                    size="md"
                    color="dark"
                    value={floor.toString()}
                    onChange={(value) => setFloor(parseInt(value))}
                    data={[
                        { label: '4', value: '4' },
                        { label: '3', value: '3' },
                        { label: '1', value: '1' },
                    ]}
                    styles={{
                        root: {
                            borderRadius: 8,
                            backgroundColor: '#164EC5',
                        },
                        label: {
                            fontWeight: 600,
                            color: 'white',
                        },
                        indicator: {
                            backgroundColor: '#FCB024',
                            borderRadius: 5,
                        },
                    }}
                />
            </Box>
        );
    }
};

export default FloorSwitchBox;
