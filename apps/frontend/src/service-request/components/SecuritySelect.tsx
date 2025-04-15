import { useMantineTheme, Select, SelectProps } from '@mantine/core';
import ISO6391 from 'iso-639-1';

const securityOptions = [
    { value: 'Escort', label: 'Escort Service' },
    { value: 'Safety', label: 'Safety Hazard' },
    { value: 'Building Security', label: 'Building Security' },
    { value: 'Surveillance', label: 'Surveillance' },
];

const SecuritySelect: React.FC<SelectProps> = (props) => {
    return (
        <Select
            label="Choose Your Security Concern"
            placeholder="--Select a Concern--"
            searchable
            data={securityOptions}
            nothingFoundMessage="Service not Offered"
            radius="sm"
            mb="sm"
            size="xs"
            {...props}
        />
    );
};

export default SecuritySelect;
