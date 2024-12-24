"use client";
import React, { useState } from 'react';
import axiosInstance from '@/app/lib/axios'; // Import the Axios instance

const RegisterPage = () => {
    const [inputUserName, setInputUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        // Basic client-side validation
        if (!inputUserName || !email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            // Send a POST request to the API using the axios instance
            const response = await axiosInstance.post('/api/register', {
                username: inputUserName,
                email: email,
                password: password,
            });

            if (response.status === 201) {
                alert("User registered successfully!");
                // Optionally redirect or clear the form
            }
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className='text-green-300 font-bold flex flex-col px-64 gap-y-4'>
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="text"
                onChange={(e) => setInputUserName(e.target.value)}
                value={inputUserName}
                placeholder="Please add username"
                autoComplete="off"
                id="username"
            />
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Please add email"
                autoComplete="off"
                id="email"
            />
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Please add password"
                autoComplete="off"
                id="password"
            />
            <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder="Confirm password"
                autoComplete="off"
                id="confirmPassword"
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default RegisterPage;
