import React from 'react';
import { useNavigate } from 'react-router-dom';
import ParentRequestForm, { RequestData } from './ParentRequestForm';
import SanitationSelect from './components/SanitationSelect.tsx';

const initialValues: RequestData = {
    employeeName: '',
    cleanupType: '',
    hospital: '',
    department: '',
    date: '',
    time: '',
    priority: '',
    status: '',
    description: '',
};

function Sanitation() {
    const navigate = useNavigate();
    const handleSubmit = async (rawData: RequestData) => {
        const requestData = {
            ...rawData,
            date: new Date(rawData.date).toISOString().split('T')[0],
        };

        try {
            const response = await fetch('/api/SanitationSR', {
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
            contributors="Logan Winters and Joe Abata"
            formLabel="Sanitation Request Form"
        >
            {(form) => <SanitationSelect {...form.getInputProps('security')} />}
        </ParentRequestForm>
    );
}

export default Sanitation;
