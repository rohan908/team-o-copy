import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import ServiceRequestButton from './servicebutton';
import ServiceRequestPopUp from "./servicepopup";

function ServiceRequestPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [requestDescription, setRequestDescription] = useState('');
    const [requestStatus, setRequestStatus] = useState('');
    const [showRequestFeedback, setShowRequestFeedback] = useState(false);

    const navigate = useNavigate();  // Initialize navigate function

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setRequestDescription('');
    };

    const handleRequestSubmit = () => {
        if (requestDescription) {
            setRequestStatus("Request Submitted Successfully");
            navigate('/submission', { state: { description: requestDescription } });
            setRequestDescription("")
            setIsPopupOpen(false);
        } else {
            setRequestStatus("Error: Please enter a description");
            setShowRequestFeedback(true);
        }
        setIsPopupOpen(false);
    };

    return (
        <div>
            <ServiceRequestButton onClick={handleOpenPopup} variant={'primary'} disabled={false}>
                Submit Service Request
            </ServiceRequestButton>

            <ServiceRequestPopUp isOpen={isPopupOpen} onClose={handleClosePopup} title="Submit Service Request">
                <form onSubmit={e => e.preventDefault()}>
                    <textarea
                        placeholder="Describe your service request"
                        value={requestDescription}
                        onChange={(e) => setRequestDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <button
                        type="button"
                        onClick={handleRequestSubmit}
                        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
                        disabled={!requestDescription.trim()}
                    >
                        Submit Request
                    </button>
                </form>
            </ServiceRequestPopUp>

            <ServiceRequestPopUp isOpen={showRequestFeedback} onClose={() => setShowRequestFeedback(false)} title="Request Status">
                <div className={`p-4 text-center rounded-md font-semibold ${
                    requestStatus.startsWith("Error") ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                    {requestStatus}
                </div>
            </ServiceRequestPopUp>
        </div>
    );
}

export default ServiceRequestPage;
