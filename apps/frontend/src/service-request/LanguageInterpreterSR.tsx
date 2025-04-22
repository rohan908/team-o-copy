import React from 'react';
import { useNavigate } from 'react-router-dom';
import ParentRequestForm, { RequestData } from './ParentRequestForm';
import LanguageSelect from './components/LanguageSelect.tsx';
import ISO6391 from 'iso-639-1';

const initialValues: RequestData = {
    employeeName: '',
    language: '',
    hospital: '',
    department: '',
    date: '',
    time: '',
    priority: '',
    status: '',
    description: '',
};

function Language() {
    const navigate = useNavigate();
    const handleSubmit = async (rawData: RequestData) => {
        // truncating the date object to remove the time becuase that is default with date object
        // turning the language key into the language label so it is clear what is being submitted
        const requestData = {
            ...rawData,
            date: new Date(rawData.date).toISOString().split('T')[0],
            language:
                rawData.language === 'asl'
                    ? 'ASL (American Sign Language)'
                    : ISO6391.getName(rawData.language),
        };

        try {
            const response = await fetch('/api/languageSR', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                navigate('/submission', {
                    state: {
                        requestData: Object.entries(requestData).map(([title, value]) => ({
                            title: title,
                            value: value,
                        })),
                    },
                });
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };

    return (
        <ParentRequestForm
            handleSubmit={handleSubmit}
            newInitialValues={initialValues}
            contributors="Logan Winters"
            formLabel="Language Request Form"
        >
            {(form) => <LanguageSelect {...form.getInputProps('security')} />}
        </ParentRequestForm>
    );
}

export default Language;
