import { Box, Button, Flex, SimpleGrid, Title, Stack } from '@mantine/core';
import {
    IconLanguage,
    IconExclamationCircleFilled,
    IconShieldHalf,
    IconTrash,
    IconBellExclamation,
} from '@tabler/icons-react';
import HoverButton from './components/HoverButton.tsx';
import React, { useState } from 'react';
import LanguageInterpreterSR from './LanguageInterpreterSR.tsx';
import SecuritySR from './SecuritySR.tsx';
import SanitationSR from './SanitationSR.tsx';
import MaintenanceSR from './MaintenanceSR.tsx';

type ServiceRequestItem = {
    labelOne: string;
    labelTwo: string;
    icon: React.ReactNode;
    form?: () => React.ReactNode;
    disabled?: boolean | true;
};

interface ServiceRequestPageProps {
  width: string;
  marginRight: string;
  height: string;
  cols: number;
  vSpacing: number;
  hSpacing: number;
  buttonHeight: number;
}

export const ServiceRequestPage = (props: ServiceRequestPageProps) => {
    const [activeFormIndex, setActiveFormIndex] = useState<number | null>(null);

    const ServiceRequestItems: ServiceRequestItem[] = [
        {
            labelOne: 'Interpreter',
            labelTwo: 'Request',
            icon: <IconLanguage size={120} />,
            form: () => <LanguageInterpreterSR onBack={() => setActiveFormIndex(null)} />,
        },
        {
            labelOne: 'Security',
            labelTwo: 'Request',
            icon: <IconShieldHalf size={120} />,
            form: () => <SecuritySR onBack={() => setActiveFormIndex(null)} />,
        },
        {
            labelOne: 'Sanitation',
            labelTwo: 'Request',
            icon: <IconTrash stroke={2} size={120} />,
            form: () => <SanitationSR onBack={() => setActiveFormIndex(null)} />,
        },
        {
            labelOne: 'Maintenance',
            labelTwo: 'Request',
            icon: <IconBellExclamation stroke={2} size={120} />,
            form: () => <MaintenanceSR onBack={() => setActiveFormIndex(null)} />,
        },
        {
            labelOne: 'Type 5',
            labelTwo: '',
            icon: <IconExclamationCircleFilled size={120} />,
            disabled: true,
        },
        {
            labelOne: 'Type 6',
            labelTwo: '',
            icon: <IconExclamationCircleFilled size={120} />,
            disabled: true,
        },
    ];
    // rendering the form to replace the page
    if (activeFormIndex !== null) {
        const item = ServiceRequestItems[activeFormIndex];
        if (item?.form) {
            const FormComponent = item.form;
            return <>{FormComponent()}</>;
        }
    }
    return (
        <div>
            <Box pb="xl">
                <Flex w={props.width} ml = {props.marginRight} mr={props.marginRight} h={props.height} justify="center" align="center">
                    <Stack>
                        {/*<Title order={2} ta="left" c={'#001D4D'} mb="lg">*/}
                        {/*    Select Request Type:*/}
                        {/*</Title>*/}
                        {/* basic grid for button layout*/}
                        <SimpleGrid

                          cols={{base:1, md: props.cols, xxl: 3}}
                          spacing={{base:30, md: props.hSpacing, xxl: 30}}
                          verticalSpacing={{base:20, md: props.vSpacing, xxl: 30}}
                        >
                            {ServiceRequestItems.map((item, index) => (
                                <HoverButton
                                    key={index}
                                    icon={item.icon}
                                    labelOne={item.labelOne}
                                    labelTwo={item.labelTwo}
                                    onClick={() => setActiveFormIndex(index)}
                                    disabled={item.disabled}
                                    buttonHeight={props.buttonHeight}
                                />
                            ))}
                        </SimpleGrid>
                    </Stack>
                </Flex>
            </Box>
        </div>
    );
}
export default ServiceRequestPage;
