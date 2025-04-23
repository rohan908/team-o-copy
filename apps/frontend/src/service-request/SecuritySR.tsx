import React from 'react';
import { useNavigate } from 'react-router-dom';
import RequestForm, { RequestData } from './RequestForm.tsx';
import SecuritySelect from './components/SecuritySelect';

const initialValues: RequestData = {
    employeeName: '',
    security: '',
    hospital: '',
    department: '',
    date: '',
    time: '',
    priority: '',
    status: '',
    description: '',
};

function Security({ onBack }: { onBack: () => void }) {
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
                        requestData: [
                            // need title for nicer looking display page
                            { title: 'Name', value: requestData.employeeName },
                            { title: 'Security', value: requestData.security },
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
            contributors="Ethan R. & Camden B."
            formLabel="Security Request"
            onBack={onBack}
        >
            {(form) => <SecuritySelect required {...form.getInputProps('security')} />}
        </RequestForm>
    );
}

export default Security;
