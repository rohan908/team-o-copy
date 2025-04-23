import React from 'react';
import { useNavigate } from 'react-router-dom';
import RequestForm, { RequestData } from './RequestForm.tsx';
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
                        requestData: [
                            // need title for nicer looking display page
                            { title: 'Name', value: requestData.employeeName },
                            { title: 'Language', value: requestData.language },
                            { title: 'Hospital', value: requestData.hospital },
                            { title: 'Department', value: requestData.department },
                            { title: 'Date', value: requestData.date },
                            { title: 'Time', value: requestData.time },
                            { title: 'Priority', value: requestData.priority },
                            { title: 'Status', value: requestData.status },
                            { title: 'Details', value: requestData.description },
                        ],
                    },
                });
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };

    return (
        <RequestForm
            handleSubmit={handleSubmit}
            newInitialValues={initialValues}
            contributors="Logan Winters"
            formLabel="Language Request Form"
        >
            {(form) => <LanguageSelect {...form.getInputProps('language')} />}
        </RequestForm>
    );
}

export default Language;
