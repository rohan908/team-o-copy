import { Select } from "@mantine/core";

//need to change this to actual api call autocomplete later
const hospitalOptions = [
    { value: '20 Patriot Pl', label: '20 Patriot Pl' },
    { value: '22 Patriot Pl', label: '22 Patriot Pl' },
    { value: 'Chestnut Hill', label: 'Chestnut Hill' },
];

export function GmapsStartSelector({props}: {props: any}) {
    return (
        <Select
            label="Choose your starting location"
            placeholder="--Input a Location--"
            searchable
            data={hospitalOptions}
            nothingFoundMessage="Location Not Available"
            radius="sm"
            mb="sm"
            size = "xs"

            {...props}

        />
    );
}