import { CONFIG } from '../config'
import { useState } from 'react'

export default function Register(){
    // State for all registration fields
    const [fullName, setFullName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [section, setSection] = useState('')
    
    // Submission States
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    
    // Custom Modal/Message Box State (for feedback)
    const [messageModal, setMessageModal] = useState({
        isVisible: false,
        title: '',
        content: '',
        isError: false,
    })

    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Prevent default browser form submission

        // Prevent double submission
        if (isSubmitting || isSubmitted) return;

        // Basic validation
        if (!fullName || !emailId || !phoneNumber || !section) {
            setMessageModal({
                isVisible: true,
                title: 'Registration Error',
                content: 'All fields are required for registration.',
                isError: true,
            });
            return;
        }

        setIsSubmitting(true);
        
        // Use URLSearchParams for Google Form submission format
        const formData = new URLSearchParams();
        
        // Append all field data using the Entry IDs from CONFIG
        formData.append(CONFIG.REGISTRATION_FIELDS.fullName, fullName); 
        formData.append(CONFIG.REGISTRATION_FIELDS.emailId, emailId);
        formData.append(CONFIG.REGISTRATION_FIELDS.phoneNumber, phoneNumber);
        formData.append(CONFIG.REGISTRATION_FIELDS.section, section);

        try {
            // Direct submission to Google Form Action URL
            const response = await fetch(CONFIG.REGISTRATION_FORM_ACTION, {
                method: 'POST',
                body: formData,
                mode: 'no-cors', // Must use 'no-cors' for direct Google Form submission
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Note: Since mode is 'no-cors', we assume success if no network error occurred.
            setIsSubmitted(true);
            setMessageModal({
                isVisible: true,
                title: 'Registration Successful!',
                content: 'Your details have been submitted. You will receive your Registration ID via email shortly. Please keep it safe for all future submissions.',
                isError: false,
            });

        } catch (error) {
            console.error('Registration error:', error);
            setMessageModal({
                isVisible: true,
                title: 'Registration Failed',
                content: 'A network error occurred. Please check your connection and try again.',
                isError: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="day-page">
            
            {/* Custom Notification Modal (copied from test_day.js) */}
            {messageModal.isVisible && (
                <div className="modal-overlay">
                    <div className={`modal-card ${messageModal.isError ? 'error' : 'success'}`}>
                        <h3>{messageModal.title}</h3>
                        <p>{messageModal.content}</p>
                        <button onClick={() => setMessageModal({ ...messageModal, isVisible: false })}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="card">
                <h2>Register Yourself</h2>
                <p className="small">Register with your details. After registration, you will receive a **Registration ID** via email. This ID is mandatory for answer submission. Contact **kolcusvig3@gmail.com** for queries.</p>
                
                {isSubmitted ? (
                    <p style={{padding: '20px', backgroundColor: '#e6ffe6', border: '1px solid #00cc00', borderRadius: '4px'}}>
                        **✅ Registration Complete!** Please check your email for the Registration ID.
                    </p>
                ) : (
                    <form onSubmit={handleFormSubmit} className="input-area">
                        {/* 1. Full Name */}
                        <label htmlFor="fullName">Full Name *</label>
                        <input
                            id="fullName"
                            type="text"
                            placeholder="Your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            disabled={isSubmitting}
                            required
                        />
                        
                        {/* 2. Email ID */}
                        <label htmlFor="emailId">Email ID *</label>
                        <input
                            id="emailId"
                            type="email"
                            placeholder="Your valid email address"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            disabled={isSubmitting}
                            required
                        />

                        {/* 3. Phone Number */}
                        <label htmlFor="phoneNumber">Phone Number *</label>
                        <input
                            id="phoneNumber"
                            type="tel"
                            placeholder="Your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            disabled={isSubmitting}
                            required
                        />

                        {/* 4. Section / Division / Unit */}
                        <label htmlFor="section">Section / Division / Unit *</label>
                        <input
                            id="section"
                            type="text"
                            placeholder="Your Section / Division / Unit"
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                            disabled={isSubmitting}
                            required
                        />
                        
                        <button type="submit" disabled={isSubmitting} style={{marginTop: '20px'}}>
                            {isSubmitting ? 'Registering...' : 'Register and Get ID'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}