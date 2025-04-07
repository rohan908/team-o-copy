import { useState } from 'react';
type Props = {
    table: string;
};
export function DatabaseController({ table }: Props) {
    // useState variables -> might need to change types
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');

    // import function handling
    const handleImport = async () => {
        if (!file) {
            console.log('No file import');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch(`/api/import/${table}`, {
            method: 'POST',
            body: formData,
        });
        setMessage(await res.text());
    };
    // export function handling
    const handleExport = () => {
        window.location.href = `api/export/${table}`;
    };
    // clear function handling
    const handleClear = async () => {
        if (!confirm('Are you sure you want to clear this table?')) return;
        const res = await fetch(`/api/clear/${table}`, {
            method: 'DELETE',
        });
        setMessage(await res.text());
    };

    return (
        <div>
            {/**/}
            {/*Input for import csv*/}
            <input
                type={'file'}
                accept={'.csv'}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="form-control"
            />
            <div>
                <button onClick={handleImport}>Import CSV</button>
                <button onClick={handleExport}>Export CSV</button>
                <button onClick={handleClear}>Clear Table</button>
            </div>

        </div>
    );
}
export default DatabaseController;
