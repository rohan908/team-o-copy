import { Popover, Button, Title, Badge, CloseButton } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import NameEntrySR from '../service-request/components/NameEntrySR.tsx';
import React from 'react';
// import context
import { useFilterContext } from '../contexts/FilterContext.tsx';

function Filter() {
    const [name, setName] = React.useState('');
    // initializes consts for context
    const { filterNames, addName } = useFilterContext();

    const handleAddName = (val: string) => {
        if (val.trim() && !filterNames.includes(val)) {
            addName(val);
            setName(''); // clear field
        }
    };

    return (
        // Change to keep filter open when clicking on autocomplete
        <Popover
            width={300}
            trapFocus={false}
            position="bottom"
            withArrow
            shadow="md"
            radius="md"
            arrowSize={15}
            offset={{ mainAxis: 10, crossAxis: 50 }}
            closeOnClickOutside={true}
        >
            <Popover.Target>
                <Button
                    leftSection={<IconFilter />}
                    radius="md"
                    bg="yellowAccent.4"
                    fw="400"
                    m="xs"
                    c="primaryBlues.5"
                >
                    Filter
                </Button>
            </Popover.Target>
            <Popover.Dropdown>
                <NameEntrySR
                    value={name}
                    onChange={(val) => {
                        handleAddName(val);
                    }}
                />
            </Popover.Dropdown>
        </Popover>
    );
}

export default Filter;
