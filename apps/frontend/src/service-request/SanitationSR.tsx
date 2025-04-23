import React, { useState } from 'react';
import RequestForm, { RequestData } from './RequestForm.tsx';
import SanitationSelect from './components/SanitationSelect.tsx';
import Display from './Display.tsx';

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

function Sanitation({ onBack }: { onBack: () => void }) {
    const [submittedData, setSubmittedData] = useState<
        { title: string; value: string | undefined }[] | null
    >(null);

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
                const displayData = [
                    // need title for nicer looking display page
                    { title: 'Name', value: requestData.employeeName },
                    { title: 'Cleanup Type', value: requestData.cleanupType },
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
        return <Display data={submittedData} onBack={() => setSubmittedData(null)} />;
    }
    return (
        <RequestForm
            handleSubmit={handleSubmit}
            newInitialValues={initialValues}
            contributors="Logan Winters and Joe Abata"
            formLabel="Sanitation Request"
            onBack={onBack}
        >
            {(form) => <SanitationSelect {...form.getInputProps('security')} />}
        </RequestForm>
    );
}

export default Sanitation;
