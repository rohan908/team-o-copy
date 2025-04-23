import { Textarea, TextareaProps } from '@mantine/core';

const RequestDescription: React.FC<TextareaProps> = (props) => {
    return (
        <Textarea
            {...props}
            label="Additional Details"
            placeholder="Specify additional details here"
            radius="sm"
            autosize
            minRows={2}
            mb="md"
            size="xs"
            c={"#285CC6"}
            styles={{
                label: {
                    fontSize: '18px',
                    fontWeight: 350,
                },
            }}
        />
    );
};

export default RequestDescription;
