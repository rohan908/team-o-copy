import { Popover, Button, TextInput, Title } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';

function Filter() {
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
                <TextInput label="Name" placeholder="Name" size="xs" />
                <TextInput label="Email" placeholder="john@doe.com" size="xs" mt="xs" />
            </Popover.Dropdown>
        </Popover>
    );
}

export default Filter;
