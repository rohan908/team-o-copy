import React, { useState } from 'react';
import { Modal } from '@mantine/core';
import RequestForm, { RequestData } from './RequestForm.tsx';
import SecuritySelect from './components/SecuritySelect';
import Display from './Display.tsx';

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
    const [submittedData, setSubmittedData] = useState<
        { title: string; value: string | undefined }[] | null
    >(null);

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
                const displayData = [
                    { title: 'Name', value: requestData.employeeName },
                    { title: 'Security Type', value: requestData.security },
                    { title: 'Hospital', value: requestData.hospital },
                    { title: 'Department', value: requestData.department },
                    { title: 'Date', value: requestData.date },
                    { title: 'Time', value: requestData.time },
                    { title: 'Priority', value: requestData.priority },
                    { title: 'Status', value: requestData.status },
                    { title: 'Details', value: requestData.description },
                ];
                setSubmittedData(displayData);
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };

    if (submittedData) {
        return (
            <Modal
                opened={true}
                onClose={() => {
                    setSubmittedData(null);
                    onBack();
                }}
                size="md"
                title="Request Submitted"
                centered
                withCloseButton={false}
            >
                <Display
                    data={submittedData}
                    onBack={() => {
                        setSubmittedData(null);
                        onBack();
                    }}
                />
            </Modal>
        );
    }

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
