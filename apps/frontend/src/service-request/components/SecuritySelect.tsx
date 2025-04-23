import { useMantineTheme, Select, SelectProps } from '@mantine/core';
import ISO6391 from 'iso-639-1';

const SecuritySelect: React.FC<SelectProps> = (props) => {
    return (
        <Select
            label="Choose Your Security Concern"
            placeholder="--Select a Concern--"
            searchable
            data={['Escort Service', 'Safety Hazard', 'Building Security', 'Surveillance']}
            nothingFoundMessage="Service not Offered"
            radius="sm"
            mb="md"
            size="xs"
            required
            {...props}
            styles={{
                label: {
                    fontSize: '18px',
                    fontWeight: 350,
                },
            }}
        />
    );
};

export default SecuritySelect;
