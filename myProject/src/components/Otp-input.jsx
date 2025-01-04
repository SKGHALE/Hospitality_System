import React, { useState, useRef } from 'react'

export function OTPInput({ length, onComplete }) {
    const [otp, setOtp] = useState(Array(length).fill(''));
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        if (newOtp.every(digit => digit !== '')) {
            onComplete(newOtp.join(''));
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, length).split('');
        const newOtp = [...otp];
        pastedData.forEach((value, index) => {
            newOtp[index] = value;
            inputRefs.current[index]?.setAttribute('value', value);
        });
        setOtp(newOtp);
        inputRefs.current[Math.min(length - 1, pastedData.length)]?.focus();
    };

    return (
        <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    ref={(ref) => inputRefs.current[index] = ref}
                    className="w-12 h-12 text-center text-lg bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-white placeholder-white placeholder-opacity-70"
                    aria-label={`Digit ${index + 1} of OTP`}
                />
            ))}
        </div>
    );
}

