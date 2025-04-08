import React from 'react';

interface DateInputProps {
    value: string;
    onChange: (value: string) => void;
}

const DateInputForm: React.FC<DateInputProps> = ({value, onChange}) => {

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
    <div className="mb-4">
        <label htmlFor="date" className="block mb-2" style={{fontSize: '20px'}}>Select a date:*</label>
        <input
            type="date"
            id="date"
            value={value}
            onChange={handleDateChange}
            className=  "p-2 border rounded w-full"
        />
    </div>
    );
};

export default DateInputForm
