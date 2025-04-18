import React from 'react';
import HoverInfoComponent from './HoverInfoComponent.tsx';
import {Box, Title} from "@mantine/core";

export function MapPage() {
    return (
        <Box bg="terquAccet.2">
            <Title order={2} ta="center" mb="lg">
              Map Page
            </Title>
            <HoverInfoComponent></HoverInfoComponent>
        </Box>
    );
}

export default MapPage;
