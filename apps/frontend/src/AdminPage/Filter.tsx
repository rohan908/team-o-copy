import { Popover, Button, Title, Badge, CloseButton } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import NameEntrySR from '../common-compoents/NameEntrySR.tsx';
import React from 'react';
// import context
import { useFilterContext } from '../contexts/FilterContext.tsx';
import PriorityFilter from '../common-compoents/PriorityFilter.tsx';

function Filter() {
    const [filter, setFilter] = React.useState('');
    // initializa consts for context
    const { currentFilters, addFilter, removeFilter } = useFilterContext();

    const handleAddName = (val: string) => {
        if (val.trim() && !currentFilters.includes(val)) {
            addFilter(val);
            setFilter(''); // clear field
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
            closeOnClickOutside={false}
        >
            <Popover.Target>
                <Button
                    leftSection={<IconFilter />}
                    radius="md"
                    bg="yellowAccent.4"
                    fw="400"
                    fz="xs"
                    m="xs"
                    c="primaryBlues.5"
                >
                    Filter
                </Button>
            </Popover.Target>
            <Popover.Dropdown>
                <NameEntrySR
                    value={filter}
                    onChange={(val) => {
                        handleAddName(val);
                    }}
                />
                <PriorityFilter
                    value={filter}
                    onChange={(val) => {
                        handleAddName(val);
                    }}
                />
            </Popover.Dropdown>
        </Popover>
    );
}

export default Filter;
