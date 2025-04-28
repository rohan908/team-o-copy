import {Select, SelectProps } from '@mantine/core';


const SecuritySelect: React.FC<SelectProps> = (props) => {
    return (
        <Select
            label="Choose Your Security Concern"
            placeholder="Select a Concern"
            data={['Escort Service', 'Safety Hazard', 'Building Security', 'Surveillance']}
            nothingFoundMessage="Service not Offered"
            radius="sm"
            mb="md"
            size="xs"
            required
            c={"#285CC6"}
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
