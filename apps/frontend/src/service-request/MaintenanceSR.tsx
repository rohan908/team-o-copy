import React from 'react';
import { useNavigate } from 'react-router-dom';
import RequestForm, { RequestData } from './RequestForm.tsx';
import MaintenanceSelect from './components/MaintenanceSelect.tsx';

const initialValues: RequestData = {
    employeeName: '',
    maintenanceType: '',
    hospital: '',
    department: '',
    date: '',
    time: '',
    priority: '',
    status: '',
    description: '',
};

function Maintenance({ onBack }: { onBack: () => void }) {
    const navigate = useNavigate();
    const handleSubmit = async (rawData: RequestData) => {
        const requestData = {
            ...rawData,
            date: new Date(rawData.date).toISOString().split('T')[0],
        };

        try {
            const response = await fetch('/api/MaintenanceSR', {
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
                            { title: 'Maintenance Type', value: requestData.maintenanceType },
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
            contributors="Yanding Mario and Connor Daly"
            formLabel="Maintenance Request Form"
            onBack={onBack}
        >
            {(form) => <MaintenanceSelect {...form.getInputProps('security')} />}
        </RequestForm>
    );
}

export default Maintenance;
