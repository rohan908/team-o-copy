import { Select } from "@mantine/core";

const hospitalOptions = [
    { value: '20 Patriot Pl', label: '20 Patriot Pl' },
    { value: '22 Patriot Pl', label: '22 Patriot Pl' },
    { value: 'Chestnut Hill', label: 'Chestnut Hill' },
];

export function GmapsDestinationSelector({props}: {props: any}) {
    return (
        <Select
            label="Choose your hospital"
            placeholder="--Select a Hospital--"
            searchable
            data={hospitalOptions}
            nothingFoundMessage="Hospital Not Available"
            radius="sm"
            mb="sm"
            size = "xs"

            {...props}

        />
    );
}