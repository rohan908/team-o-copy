import { useContext, useState, useEffect } from 'react';
import {
    useMantineTheme,
    Box,
    Flex,
    TextInput,
    Menu,
    Collapse,
    NativeSelect,
    Modal,
    ActionIcon,
    Input,
    Stack,
    Text,
    Button,
    MantineProvider,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { MapContext, MapEditorProps } from '../MapEditor.tsx';
import { IconArrowBadgeRight, IconArrowBadgeDown } from '@tabler/icons-react';
import { BlackButton } from '../../common-compoents/commonButtons.tsx';

const NodeInfoBox = () => {
    const mapProps = useContext(MapContext);
    const theme = useMantineTheme();

    return (
        <Box
            p="sm"
            style={{
                width: 'auto',
                minWidth: '300px',
                backgroundColor: '#285CC6',
                border: '2px solid #1C43A7',
                borderRadius: 24,
            }}
        ></Box>
    );
};

export default NodeInfoBox;
