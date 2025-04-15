import { Box, Flex, Select, Title } from '@mantine/core';
import { BlackButton } from '../common-compoents/commonButtons.tsx';
import React from 'react';
import { Collapse, Text, Divider, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export function GmapsSelectBox(): React.ReactElement {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <Box>
            <Text ta="left" mb="sm" fw={500}>
                Insert Starting Location:
            </Text>
            <TextInput mb="md" />
            <Text ta="left" mb="sm" fw={500}>
                Select Hospital:
            </Text>
            <Select
                color="gray"
                placeholder="Hospital"
                data={[
                    { value: '20 Patriot Pl', label: '20 Patriot Pl' },
                    { value: '22 Patriot Pl', label: '22 Patriot Pl' },
                    { value: 'Chestnut Hill', label: 'Chestnut Hill' },
                ]}
                mb="md"
            />

            <Text ta="left" mb="sm" fw={500}>
                Select Department:
            </Text>
            <Select
                color="gray"
                placeholder="Department"
                data={departmentOptions}
                value={department}
                onChange={setDepartment}
                mb="md"
                disabled={!hospital || departmentOptions.length === 0}
            />
            <Text ta="left" mb="sm" fw={500}>
                Select Navigation Method:
            </Text>
            <Select
                color="gray"
                placeholder="Navigation Method"
                data={[
                    { value: google.maps.TravelMode.WALKING, label: 'Walking' },
                    { value: google.maps.TravelMode.TRANSIT, label: 'Public Transportation' },
                    { value: google.maps.TravelMode.DRIVING, label: 'Driving' },
                ]}
                value={navigationMethod}
                onChange={(value) => {
                    setNavigationMethod(value);
                }}
                mb="md"
                disabled={!hospital}
            />

            <Flex justify="flex-end" gap="md">
                <BlackButton onClick={handleFindPath}>Find Path</BlackButton>
            </Flex>
        </Box>
    );
}
