import { Popover, Button, Title, Badge, CloseButton } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import NameEntrySR from '../service-request/components/NameEntrySR.tsx';
import React from 'react';
// import context
import { useFilterContext } from '../contexts/FilterContext.tsx';

function Filter() {
    const [name, setName] = React.useState('');
    // initializa consts for context
    const { filterNames, addName, removeName } = useFilterContext();

    const handleFilterState = () => {
        // add name to context
        if (name.trim()) {
            addName(name);
            setName('');
        }
    };

    return (
        // Change to keep filter open when clicking on autocomplete
        <Popover
            width={300}
            trapFocus
            position="bottom"
            withArrow
            shadow="md"
            offset={{ mainAxis: 4, crossAxis: 50 }}
            closeOnClickOutside={false}
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
                <Title>Filter by Employee Name</Title>
                <NameEntrySR value={name} onChange={(val: string) => setName(val)} />
                <Button onClick={handleFilterState} mt="sm">
                    Add
                </Button>
                {filterNames.map((n) => (
                    <Badge key={n} mr="xs">
                        {n} <CloseButton size="xs" onClick={() => removeName(n)} />
                    </Badge>
                ))}
            </Popover.Dropdown>
        </Popover>
    );
}

export default Filter;
