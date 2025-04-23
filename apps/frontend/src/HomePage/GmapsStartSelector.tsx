import { Autocomplete, Select, TextInput, useMantineTheme } from '@mantine/core';
import { IconChevronDown, IconHomeFilled } from '@tabler/icons-react';
import { NavSelectionItem } from '../contexts/NavigationItem.ts';
import { useNavSelectionContext } from '../contexts/NavigationContext';
import { useTimeline } from './TimeLineContext.tsx';
import { useEffect, useRef } from 'react';

export function GmapsStartSelector() {
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const input = useRef<HTMLInputElement>(null);
    const { setUserCoordinates } = useTimeline();
    //initialize only when the box is not collapsed or has input
    useEffect(() => {
        if (!input.current) return;

        //if previous instance of autocompleteRef exits, then clear it for re initialization
        if (autocompleteRef.current) {
            autocompleteRef.current.unbindAll?.();
            autocompleteRef.current = null;
        }
        autocompleteRef.current = new window.google.maps.places.Autocomplete(input.current, {
            types: ['geocode'],
        });

        // .addListener is a callback function that triggers when user selects one location in the autocomplete
        autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current?.getPlace();
            if (place?.geometry?.location) {
                const location = place.geometry.location;
                const latlng = {
                    lat: location.lat(),
                    lng: location.lng(),
                };
                setUserCoordinates(latlng);
            }
        });
    }, []);

    const theme = useMantineTheme();
    return (
        <TextInput
            placeholder="Starting Location"
            rightSection={
                <IconChevronDown size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            leftSection={
                <IconHomeFilled size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            ref={input}
            radius="sm"
            mb="sm"
            size="xs"
            w={{ xl: '350px', lg: '300px', sm: '100%' }}
        />
    );
}
