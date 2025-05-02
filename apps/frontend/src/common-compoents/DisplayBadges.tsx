import { Badge, CloseButton, Group } from '@mantine/core';

interface DisplayBadgeProps {
    filterList: string[];
    onRemove: (value: string) => void;
}

function DisplayBadge({ filterList, onRemove }: DisplayBadgeProps) {
    return (
        <>
            {filterList.map((item) => (
                <Badge key={item} p="xs" m="xs" bg="primaryBlues.5" fw="400">
                    <Group gap="0px">
                        {item}
                        <CloseButton size="xs" onClick={() => onRemove(item)} />
                    </Group>
                </Badge>
            ))}
        </>
    );
}
export default DisplayBadge;
