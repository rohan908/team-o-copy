import React from 'react';
import { useNavigate } from 'react-router-dom';
import ParentRequestForm, { RequestData } from './ParentRequestForm';
import SecuritySelect from './components/SecuritySelect';

function Test() {
    const navigate = useNavigate();

    const handleSubmit = async (rawData: RequestData) => {
        const requestData = {
            ...rawData,
            date: new Date(rawData.date).toISOString().split('T')[0],
        };

        try {
            const response = await fetch('/api/securitySR', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                navigate('/submission', {
                    state: {
                        requestData: Object.entries(requestData).map(([k, v]) => ({
                            title: k,
                            value: v,
                        })),
                    },
                });
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };

    return (
        <ParentRequestForm handleSubmit={handleSubmit}>
            {(form) => <SecuritySelect {...form.getInputProps('security')} />}
        </ParentRequestForm>
    );
}

export default Test;
