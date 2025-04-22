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
            mb="sm"
            size="xs"
        />
    );
};

export default RequestDescription;
