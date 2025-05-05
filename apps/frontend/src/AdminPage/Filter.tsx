import { Popover, Button, Title, Badge, CloseButton, Group, Flex } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import NameEntrySR from '../common-compoents/FilterComponents/NameEntrySR.tsx';
import PriorityFilter from '../common-compoents/FilterComponents/PriorityFilter.tsx';
import React from 'react';
import DisplayBadges from '../common-compoents/DisplayBadges';
// import context
import { useFilterContext } from '../contexts/FilterContext.tsx';

function Filter() {
    const [name, setName] = React.useState('');
    const [priority, setPriority] = React.useState('');

    // initializa consts for context
    const { addFilter, removeFilter, clearFilters, filters, opened, setOpened } =
        useFilterContext();

    // const handleAddName  = (val: string) => {
    //     if (val.trim() && !nameFilters.includes(val)) {
    //         addNameFilter(val);
    //         setName(''); // clear field
    //     }
    // };
    // const handleAddPriority = (val: string) => {
    //     if (val.trim() && !priorityFilters.includes(val)) {
    //         addPriorityFilter(val);
    //         setPriority(''); // clear field
    //     }
    // };
    // const allFilters = [...nameFilters, ...priorityFilters];

    return (
        // Change to keep filter open when clicking on autocomplete
        <Popover
            trapFocus={false}
            width={320}
            opened={opened}
            position="bottom"
            withArrow
            shadow="md"
            radius="md"
            arrowSize={15}
            offset={{ mainAxis: 10, crossAxis: 50 }}
            closeOnClickOutside={false}
            withinPortal={false}
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
                    onClick={() => setOpened((opened) => !opened)}
                >
                    Filter
                    {/*{allFilters.length > 0 && (*/}
                    {/*    <Badge size="sm" variant="filled" color="primaryBlues.5" ml="xs">*/}
                    {/*        {allFilters.length}*/}
                    {/*    </Badge>*/}
                    {/*)}*/}
                </Button>
            </Popover.Target>
            <Popover.Dropdown>
                <NameEntrySR
                    value={filters.employeeName || []}
                    onChange={(val) => val && addFilter('employeeName', val)} // Fixed filter key
                />
                <DisplayBadges
                    filterList={filters.employeeName || []}
                    onRemove={(val) => removeFilter('employeeName', val)}
                />
                {/*<Priori  tyFilter*/}
                {/*    value={priority}*/}
                {/*    onChange={(val) => {*/}
                {/*        handleAddPriority(val);*/}
                {/*    }}*/}
                {/*/>*/}
                {/*<DisplayBadges filterList={priorityFilters} onRemove={removePriorityFilter} />*/}
            </Popover.Dropdown>
        </Popover>
    );
}

export default Filter;
