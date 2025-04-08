
interface RoomNumberInputProps {
    value: string;
    onRoomNumberChange: (roomNumber: string) => void;
}

const roomNumberInput: React.FC<RoomNumberInputProps> = ({value, onRoomNumberChange}) => {

    const handleRoomNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue: string = e.target.value;

        // Only allow digits and limit to 3 characters
        if (/^\d{0,3}$/.test(newValue)) {
            onRoomNumberChange(newValue);

        }
    };

    return (
        <div>
          <br />
            <label htmlFor="roomNumberInput" className="block text-sm font-medium mb-1" style={{fontSize: '20px'}}>
                Enter the room number for interpreter:*
            </label>
            <input
                id="roomNumberInput"
                type="text"
                inputMode="numeric"
                value={value}
                onChange={handleRoomNumberChange}
                className="w-16 p-2 border rounded text-center"
                placeholder="000"
                required
            />
        </div>
    );
};

export default roomNumberInput;
