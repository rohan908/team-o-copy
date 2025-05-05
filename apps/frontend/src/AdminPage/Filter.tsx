import { Popover, Button, Title, Badge, CloseButton, Group, Flex } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import NameEntrySR from '../common-compoents/FilterComponents/NameEntrySR.tsx';
import PriorityFilter from '../common-compoents/FilterComponents/PriorityFilter.tsx';
import React, { useState } from 'react';
import DisplayBadges from '../common-compoents/DisplayBadges';
// import context
import { useFilterContext } from '../contexts/FilterContext.tsx';
import SanitationFilter from '../common-compoents/FilterComponents/SanitationFilter.tsx';
import LanguageFilter from '../common-compoents/FilterComponents/LanguageFilter.tsx';
import MaintenanceFilter from '../common-compoents/FilterComponents/MaintenanceFilter.tsx';
import SecurityFilter from '../common-compoents/FilterComponents/SecurityFilter.tsx';
import HospitalFilter from '../common-compoents/FilterComponents/HospitalFilter.tsx';
import StatusFilter from '../common-compoents/FilterComponents/StatusFilter.tsx';
import { HoverUnderline } from '../common-compoents/HoverUnderline.tsx';

interface FilterProps {
    requestType: string;
}

function Filter({ requestType }: FilterProps) {
    const [hovered, setHovered] = useState(false);

    // initializa consts for context
    const { allFilters, addFilter, removeFilter, filters, opened, setOpened } = useFilterContext();

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
                    onClick={(e) => setOpened((opened) => !opened)}
                >
                    Filter
                    {allFilters.length > 0 && (
                        <Badge size="sm" variant="filled" color="primaryBlues.5" ml="xs">
                            {allFilters.length}
                        </Badge>
                    )}
                </Button>
            </Popover.Target>
            <Popover.Dropdown pt="lg">
                <HoverUnderline mb="sm">
                    <Title mb="0px" c="secondaryBlues.7">
                        Filter By:
                    </Title>
                </HoverUnderline>
                <NameEntrySR
                    value={filters.employeeName || []}
                    onChange={(val) => val && addFilter('employeeName', val)} // Fixed filter key
                />
                <DisplayBadges
                    filterList={filters.employeeName || []}
                    onRemove={(val) => removeFilter('employeeName', val)}
                />
                <PriorityFilter
                    value={filters.priority || []}
                    onChange={(val) => val && addFilter('priority', val)} // Fixed filter key
                />
                <DisplayBadges
                    filterList={filters.priority || []}
                    onRemove={(val) => removeFilter('priority', val)}
                />
                <StatusFilter
                    value={filters.status || []}
                    onChange={(val) => val && addFilter('status', val)} // Fixed filter key
                />
                <DisplayBadges
                    filterList={filters.status || []}
                    onRemove={(val) => removeFilter('status', val)}
                />
                {requestType === 'Sanitation' && (
                    <>
                        <SanitationFilter
                            value={filters.cleanupType || []}
                            onChange={(val) => val && addFilter('cleanupType', val)}
                        />
                        <DisplayBadges
                            filterList={filters.cleanupType || []}
                            onRemove={(val) => removeFilter('cleanupType', val)}
                        />
                    </>
                )}
                {requestType === 'Language' && (
                    <>
                        <LanguageFilter
                            value={filters.language || []}
                            onChange={(val) => val && addFilter('language', val)}
                        />
                        <DisplayBadges
                            filterList={filters.language || []}
                            onRemove={(val) => removeFilter('language', val)}
                        />
                    </>
                )}
                {requestType === 'Maintenance' && (
                    <>
                        <MaintenanceFilter
                            value={filters.maintenanceType || []}
                            onChange={(val) => val && addFilter('maintenanceType', val)}
                        />
                        <DisplayBadges
                            filterList={filters.maintenanceType || []}
                            onRemove={(val) => removeFilter('maintenanceType', val)}
                        />
                    </>
                )}
                {requestType === `Security` && (
                    <>
                        <SecurityFilter
                            value={filters.security || []}
                            onChange={(val) => val && addFilter('security', val)}
                        />
                        <DisplayBadges
                            filterList={filters.security || []}
                            onRemove={(val) => removeFilter('security', val)}
                        />
                    </>
                )}
                <HospitalFilter
                    value={filters.hospital || []}
                    onChange={(val) => val && addFilter('hospital', val)} // Fixed filter key
                />
                <DisplayBadges
                    filterList={filters.hospital || []}
                    onRemove={(val) => removeFilter('hospital', val)}
                />
            </Popover.Dropdown>
        </Popover>
    );
}

export default Filter;
