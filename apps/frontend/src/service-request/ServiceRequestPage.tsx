import { Box, Flex, SimpleGrid, Stack, Modal, useMantineTheme } from '@mantine/core';
import { IconLanguage, IconShieldHalf, IconTrash, IconBellExclamation } from '@tabler/icons-react';
import HoverButton from './components/HoverButton.tsx';
import React, { useState } from 'react';
import LanguageInterpreterSR from './LanguageInterpreterSR.tsx';
import SecuritySR from './SecuritySR.tsx';
import SanitationSR from './SanitationSR.tsx';
import MaintenanceSR from './MaintenanceSR.tsx';
import { Link } from 'react-router-dom';

type ServiceRequestItem = {
    labelOne: string;
    labelTwo: string;
    icon: React.ReactNode;
    form?: React.ReactNode;
    disabled?: boolean;
};

interface ServiceRequestPageProps {
    width: string;
    marginRight: string;
    height: string;
    cols: number;
    vSpacing: number;
    hSpacing: number;
    buttonHeight: number;
    onHomePage: boolean;
}

export const ServiceRequestPage = (props: ServiceRequestPageProps) => {
    const [opened, setOpened] = useState(false);
    const [activeForm, setActiveForm] = useState<React.ReactNode | null>(null);
    const theme = useMantineTheme();

    const ServiceRequestItems: ServiceRequestItem[] = [
        {
            labelOne: 'Interpreter',
            labelTwo: 'Request',
            icon: <IconLanguage size={120} />,
            form: <LanguageInterpreterSR onBack={() => setOpened(false)} />,
        },
        {
            labelOne: 'Security',
            labelTwo: 'Request',
            icon: <IconShieldHalf size={120} />,
            form: <SecuritySR onBack={() => setOpened(false)} />,
        },
        {
            labelOne: 'Sanitation',
            labelTwo: 'Request',
            icon: <IconTrash stroke={2} size={120} />,
            form: <SanitationSR onBack={() => setOpened(false)} />,
        },
        {
            labelOne: 'Maintenance',
            labelTwo: 'Request',
            icon: <IconBellExclamation stroke={2} size={120} />,
            form: <MaintenanceSR onBack={() => setOpened(false)} />,
        },
    ];

    const handleButtonClick = (form: React.ReactNode) => {
        setActiveForm(form);
        setOpened(true);
    };

    return (
        <Box pb="xl" bg="#ebf2ff" h="100vh">
            <Flex
                w={props.width}
                ml={props.marginRight}
                mr={props.marginRight}
                h={props.height}
                justify="center"
                align="center"
                c="#ebf2ff"
            >
                <Stack>
                    <SimpleGrid
                        cols={{ base: 1, md: props.cols, xxl: 3 }}
                        spacing={{ base: 30, md: props.hSpacing, xxl: 30 }}
                        verticalSpacing={{ base: 20, md: props.vSpacing, xxl: 30 }}
                    >
                        {ServiceRequestItems.map((item, index) =>
                            props.onHomePage ? (
                                /*
                              If on home page, link to service-request page
                             */
                                <Link to="service-request">
                                    <HoverButton
                                        key={index}
                                        icon={item.icon}
                                        labelOne={item.labelOne}
                                        labelTwo={item.labelTwo}
                                        onClick={() => item.form && handleButtonClick(item.form)}
                                        disabled={item.disabled}
                                        buttonHeight={props.buttonHeight}
                                    />
                                </Link>
                            ) : (
                                /*
                              If NOT on home page, don't link
                             */
                                <HoverButton
                                    key={index}
                                    icon={item.icon}
                                    labelOne={item.labelOne}
                                    labelTwo={item.labelTwo}
                                    onClick={() => item.form && handleButtonClick(item.form)}
                                    disabled={item.disabled}
                                    buttonHeight={props.buttonHeight}
                                />
                            )
                        )}
                    </SimpleGrid>
                </Stack>
            </Flex>

            <Modal
                opened={opened}
                c="#ebf2ff"
                onClose={() => setOpened(false)}
                size="xl"
                overlayProps={{ blur: 5 }}
                centered
                closeOnClickOutside={true}
                withCloseButton={true}
                styles={{
                    content: {
                        marginTop: '100px',
                        marginBottom: '30px',
                    },
                    header: {
                        backgroundColor: '#ebf2ff',
                    },
                    body: {
                        backgroundColor: '#ebf2ff',
                    },
                }}
            >
                {activeForm}
            </Modal>
        </Box>
    );
};

export default ServiceRequestPage;
