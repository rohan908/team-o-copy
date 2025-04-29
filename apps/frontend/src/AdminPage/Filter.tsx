import { Popover, Button, TextInput, Title } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import NameEntry from '../service-request/components/NameEntry.tsx';
import React from 'react';

interface FilterState {
    name: string;
}

function Filter() {
    const [name, setName] = React.useState<string>('');

    const handleFilterState = () => {};

    return (
        <Popover
            width={300}
            trapFocus
            position="bottom"
            withArrow
            shadow="md"
            offset={{ mainAxis: 4, crossAxis: 50 }}
        >
            <Popover.Target>
                <Button
                    leftSection={<IconFilter />}
                    radius="md"
                    bg="yellowAccent.4"
                    fw="400"
                    m="xs"
                    c="secondaryBlues.7"
                >
                    Filter
                </Button>
            </Popover.Target>
            <Popover.Dropdown>
                <Title>Need to add functionality</Title>
                <NameEntry value={name} onChange={(e) => setName(e.target.value)} />
            </Popover.Dropdown>
        </Popover>
    );
}

export default Filter;
