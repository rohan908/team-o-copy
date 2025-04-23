import { useMantineTheme, Select, SelectProps } from '@mantine/core';
import ISO6391 from 'iso-639-1';

const languageOptions = [
    { value: 'asl', label: 'ASL (American Sign Language)' },
    ...ISO6391.getAllCodes().map((code) => ({
        value: code,
        label: ISO6391.getName(code),
    })),
];

const LanguageSelect: React.FC<SelectProps> = (props) => {
    return (
        <Select
            label="Choose the Language Needed"
            placeholder="--Select a Language--"
            searchable
            data={languageOptions}
            nothingFoundMessage="Language not found"
            radius="sm"
            mb="sm"
            size="xs"
            required
            {...props}
            styles={{
                label: {
                    fontSize: '16px',
                    fontWeight: 400,
                },
            }}
        />
    );
};

export default LanguageSelect;
