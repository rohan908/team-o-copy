// DisplayBadges.tsx
import { Badge, CloseButton, Group } from '@mantine/core';

interface DisplayBadgesProps {
    filterList: string[];
    onRemove: (value: string) => void;
}

export const DisplayBadges = ({ filterList, onRemove }: DisplayBadgesProps) => {
    return (
        <Group gap="xs">
            {filterList.map((item) => (
                <Badge
                    key={item}
                    variant="filled"
                    color="primaryBlues.5"
                    pr={3}
                    rightSection={
                        <CloseButton onClick={() => onRemove(item)} size={16} color="white" />
                    }
                >
                    {item}
                </Badge>
            ))}
        </Group>
    );
};
