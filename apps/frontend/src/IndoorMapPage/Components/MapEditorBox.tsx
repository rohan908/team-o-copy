import React, { useContext, useState } from 'react';
import { ActionIcon, Tooltip, Box, Stack } from '@mantine/core';
import {
    IconDeviceFloppy,
    IconCirclePlus,
    IconVectorBezier2,
    IconHandMove,
} from '@tabler/icons-react';
import { MapContext } from '../MapEditor.tsx';
import { useAllNodesContext } from '../../contexts/DirectoryContext.tsx';
import axios from 'axios';

const MapEditorBox = () => {
    const mapProps = useContext(MapContext);
    const allNodes = useAllNodesContext();
    const [saveLabel, setSaveLabel] = useState(false);

    const SaveAllNodes = async () => {
        await axios.post('api/directory/import/direct', { data: allNodes });
        setSaveLabel(true);
        setTimeout(() => setSaveLabel(false), 1500);
    };

    return (
        <Box
            pos="fixed"
            top="83%"
            left={20}
            style={{ transform: 'translateY(-50%)', zIndex: 999 }}
        >
            <Stack spacing="sm">
                <Tooltip label="Move Tool" position="right">
                    <ActionIcon
                        size="xl"
                        variant="filled"
                        color="#285CC6"
                        style={{
                            border: '2px solid #1C43A7',
                        }}
                        onClick={() => mapProps.setSelectedTool('pan')}
                    >
                        <IconHandMove />
                    </ActionIcon>
                </Tooltip>

                <Tooltip label="Add Node" position="right">
                    <ActionIcon
                        size="xl"
                        variant="filled"
                        color="#285CC6"
                        style={{
                            border: '2px solid #1C43A7',
                        }}
                        onClick={() => mapProps.setSelectedTool('add-node')}
                    >
                        <IconCirclePlus />
                    </ActionIcon>
                </Tooltip>

                <Tooltip label="Add Edge" position="right">
                    <ActionIcon
                        size="xl"
                        variant="filled"
                        color="#285CC6"
                        style={{
                            border: '2px solid #1C43A7',
                        }}
                        onClick={() => mapProps.setSelectedTool('add-edge')}
                    >
                        <IconVectorBezier2 />
                    </ActionIcon>
                </Tooltip>

                <Tooltip label="Save Changes" position="right" withArrow>
                    <ActionIcon
                        size="xl"
                        variant="filled"
                        color={saveLabel ? 'green' : '#285CC6'}
                        style={{
                            border: '2px solid #1C43A7',
                        }}
                        onClick={SaveAllNodes}
                    >
                        <IconDeviceFloppy />
                    </ActionIcon>
                </Tooltip>
            </Stack>
        </Box>
    );
};

export default MapEditorBox;
