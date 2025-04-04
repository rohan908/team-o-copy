import React from 'react';
import { useLocation } from 'react-router-dom';


export function Display() {
    const location = useLocation();
    const { description } = location.state || {};
    return (
        <div>
            <h1>Service Request Submitted</h1>
            <p><strong>You requested a :</strong> {description || 'No description provided'}</p>
        </div>
    );
}
