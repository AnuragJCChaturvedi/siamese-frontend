
import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import './PinEntry.css'; // Import CSS file for styling

const PinEntry = ({ onUpdateScreen }) => {
    const [pins, setPins] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const [attemptCount, setAttemptCount] = useState(0); // Track the number of incorrect attempts
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const handleInputChange = (index, value) => {
        if (!isNaN(value)) {
            const newPins = [...pins];
            newPins[index] = value;
            setPins(newPins);
            if (value && index < inputRefs.length - 1) {
                inputRefs[index + 1].current.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !pins[index] && index > 0) {
            const newPins = [...pins];
            newPins[index - 1] = '';
            setPins(newPins);
            inputRefs[index - 1].current.focus();
        } else if (e.key === 'Enter' && index === pins.length - 1) {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        const pin = pins.join('');
        const user = JSON.parse(sessionStorage.getItem('user'));
        
        if (pin.length === 4 && pin === user.pin) {
            onUpdateScreen("USER_SUCCESS");
        } else {
            setError('Invalid PIN. Please enter a 4-digit PIN.');
            setPins(['', '', '', '']); // Reset pins array
            inputRefs[0].current.focus(); // Focus on the first input field
            setAttemptCount(attemptCount + 1); // Increment attempt count
            if (attemptCount === 2) {
                setError('Your account has been blocked. Please contact the branch.');
                for (let i = 0; i < inputRefs.length; i++) {
                    inputRefs[i].current.disabled = true; // Disable all input fields
                }
            }
        }
    };

    return (
        <div className="pin-entry">
            <Typography variant="h4" className="pin-entry-title">Enter Your PIN</Typography>
            <div className="pin-input-container">
                {pins.map((pin, index) => (
                    <TextField
                        key={index}
                        inputRef={inputRefs[index]}
                        type="password"
                        variant="outlined"
                        size="small"
                        value={pin}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        inputProps={{
                            maxLength: 1,
                            className: 'pin-input'
                        }}
                        autoFocus={index === 0} // Focus on the first input field by default
                        disabled={attemptCount >= 3} // Disable input fields after 3 attempts
                    />
                ))}
            </div>
            {error && <Typography variant="body1" color="error" className="pin-error">{error}</Typography>}
            <Button variant="contained" onClick={handleSubmit} className="pin-submit" disabled={attemptCount >= 3}>Submit</Button>
        </div>
    );
};

export default PinEntry;

