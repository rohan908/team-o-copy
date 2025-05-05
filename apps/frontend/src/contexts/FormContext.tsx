// form-context.ts file
import { createFormContext } from '@mantine/form';


interface RequestData {
    employeeName: string;
    hospital: string;
    department: string;
    date: string;
    time: string;
    priority: string;
    status: string;
    description: string;
    language?: string;
    maintenanceType?: string;
    cleanupType?: string;
    security?: string;
}

// You can give context variables any name
export const [UserFormProvider, useUserFormContext, useUserForm] = createFormContext<RequestData>();
