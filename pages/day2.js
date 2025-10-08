import { CONFIG } from '../config'
import { useEffect, useState, useRef } from 'react'

const DAY_CONTENT = {
    code: "D2",
    title: "Day 2 — The Inquiry Officer’s Twist",
    story: `A senior officer in the Central Board of Indirect Taxes and Customs (CBIC) is accused of a crime of unimaginable proportions: misappropriating funds from a government welfare scheme intended for his staff. An inquiry officer, a veteran bureaucrat known for his scrupulous honesty and thoroughness, is appointed to investigate the charges. The officer’s fate rests on the outcome of this inquiry, which takes on the atmosphere of a high-stakes trial. The presenting officer from the department, a young, ambitious lawyer, is confident. He presents a mountain of evidence: witness statements from disgruntled staff, bank statements showing suspicious transactions, and internal audit reports that meticulously trace the missing funds. He argues that the evidence forms an ironclad chain of culpability, and a guilty verdict is a foregone conclusion.
Course of Action Taken/Investigation: The inquiry officer diligently records all the evidence presented. The accused officer, a cunning and evasive character, refutes the allegations with a calm demeanor, pointing out minor procedural inconsistencies and a lack of direct, personal evidence against him. He claims the funds were lost due to a clerical error and that the suspicious transactions were a result of his family’s private business dealings, though he fails to provide any credible proof. The presenting officer, in his final submission, states that "a chain of circumstantial evidence can be as strong as a chain of iron, and any gap in the defense's case strengthens the prosecution's claim."
Proves that Came Out: The Inquiry Officer, upon review, notes that while the circumstantial evidence is compelling, the Presenting Officer failed to provide any document or witness that directly proves the accused officer *personally* benefitted or misappropriated the funds. The funds were indeed missing, and the officer’s explanations were weak, but there was no direct, irrefutable link of personal culpability established through the department's evidence. The Inquiry Officer, deciding that the disciplinary case is purely on circumstantial evidence, concludes that the charge of misappropriation is "not proved" based on the departmental documents presented.
`,
    question: `Based on the Inquiry Officer's final finding, can the disciplinary authority overturn the finding of 'Not Proved' and impose a penalty? If so, under what legal basis? If not, what is the *necessary* next step for the disciplinary authority?`,
}

// Utility function to format seconds into minutes:seconds
const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export default function Day2(){
    const info = DAY_CONTENT
    const dayKey = info.code;

    // State now uses a single identifier: Registration ID
    const [regId, setRegId] = useState('')
    const [answer, setAnswer] = useState('')
    const [rules, setRules] = useState('') // State for rules/case laws
    
    const [showQuestion, setShowQuestion] = useState(false) 
    // 150 seconds = 2 mins 30 secs
    const [secondsLeft, setSecondsLeft] = useState(150) 
    
    // Submission States
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [autoSubmitted, setAutoSubmitted] = useState(false)
    
    // Custom Modal/Message Box State (Replaces alert/confirm)
    const [messageModal, setMessageModal] = useState({
        isVisible: false,
        title: '',
        content: '',
        isError: false,
        onConfirm: null,
    })

    // --- Core Timer Logic ---
    useEffect(() => {
        let timer;
        if (showQuestion && secondsLeft > 0 && !autoSubmitted) {
            timer = setInterval(() => {
                setSecondsLeft(prev => prev - 1);
            }, 1000);
        } else if (secondsLeft === 0 && showQuestion && !autoSubmitted) {
            // Auto submit when time runs out
            handleSubmit(true);
        }

        return () => clearInterval(timer);
    }, [showQuestion, secondsLeft, autoSubmitted]);

    const handleShowQuestion = () => {
        if (!regId) {
            setMessageModal({
                isVisible: true,
                title: 'Missing Registration ID',
                content: 'Please enter your Registration ID to start the timer.',
                isError: true,
                onConfirm: null,
            });
            return;
        }
        setShowQuestion(true);
    }

    // --- Core Submission Logic ---
    const handleSubmit = async (isAuto) => {
        // Prevent double submission
        if (isSubmitting || autoSubmitted) return;

        // Validation to prevent the exact error you saw
        if (!regId) {
            setMessageModal({
                isVisible: true,
                title: 'Submission Error',
                content: 'Registration ID cannot be empty. This is required for submission.',
                isError: true,
                onConfirm: null,
            });
            return;
        }

        setIsSubmitting(true);
        
        // Use URLSearchParams for Google Form submission format
        const formData = new URLSearchParams();
        
        // This is where we ensure the missing entry ID is included!
        formData.append(CONFIG.SUBMISSION_FIELDS.RegId, regId); 
        
        formData.append(CONFIG.SUBMISSION_FIELDS.dayCode, dayKey);
        formData.append(CONFIG.SUBMISSION_FIELDS.answer, answer || (isAuto ? 'Time Expired: No Answer Provided' : ''));
        formData.append(CONFIG.SUBMISSION_FIELDS.rules, rules || 'NA');

        try {
            // Direct submission to Google Form Action URL
            const response = await fetch(CONFIG.SUBMISSION_FORM_ACTION, {
                method: 'POST',
                body: formData,
                mode: 'no-cors', // Must use 'no-cors' for direct Google Form submission
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Note: Since mode is 'no-cors', response.ok will always be false. 
            // We assume success if no network error occurred.
            
            setSecondsLeft(0); // Stop the timer
            setAutoSubmitted(true);

            setMessageModal({
                isVisible: true,
                title: isAuto ? 'Time Expired - Auto-Submitted' : 'Submission Successful!',
                content: `Your answer for, ${info.title}, has been successfully submitted! Thank you for participating.`,
                isError: false,
                onConfirm: null,
            });

        } catch (error) {
            console.error('Submission error:', error);
            setMessageModal({
                isVisible: true,
                title: 'Submission Failed',
                content: 'A network error occurred. Please check your connection and try again.',
                isError: true,
                onConfirm: null,
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    // Content for the current day
    const infoContent = (
        <>
            {/* INSTRUCTIONS BLOCK - MOVED OUTSIDE <P> FOR VALID JSX/HTML */}
            <div style={{ padding: '15px', border: '1px solid #333', borderRadius: '8px', backgroundColor: '#f9f9f9', marginBottom: '20px', fontSize: '0.95em' }}>
                <p style={{ fontWeight: 'bold', textTransform: 'uppercase', color: '#333', marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Instructions</p>
                <p style={{ lineHeight: '1.4', margin: '0' }}>
                    Please <strong>read the entire story first</strong>. When you fully understand the case and have filled in your <strong>Registration ID</strong> below, press <strong>'Show Question & Start Timer'</strong>. This will reveal the question and start your <strong>2 minute 30 second</strong> timer. Answer within the stipulated time or it will be submitted automatically. Extra points will be given for citing "Quotations, Rules/Acts/Case Laws. <strong> Usage of AI will be verified and if found, will attract negative marks.</strong>"
                </p>
            </div>
            {/* END INSTRUCTIONS BLOCK */}
            
            <p className="story-content">
                <span className="story-label">Story:</span>
                {info.story}
            </p>
            {showQuestion && (
                <div className="question-box">
                    <span className="story-label">Question (Answer within {formatTime(150)}):</span>
                    <p className="question-content">
                        <strong>{info.question}</strong>
                    </p>
                </div>
            )}
        </>
    );

    return (
        <div className="day-page">

            {/* Custom Notification Modal */}
            {messageModal.isVisible && (
                <div className="modal-overlay">
                    <div className={`modal-card ${messageModal.isError ? 'error' : 'success'}`}>
                        <h3>{messageModal.title}</h3>
                        <p>{messageModal.content}</p>
                        <button onClick={() => setMessageModal({ ...messageModal, isVisible: false })}>
                            {messageModal.onConfirm ? 'Confirm' : 'Close'}
                        </button>
                    </div>
                </div>
            )}


            <div className="card">
                <h2>{info.title} ({dayKey})</h2>
                {info.story ? (
                    <>
                        <div className="story-section">
                            {infoContent}
                        </div>

                        <div className="input-area" style={{marginTop:10}}>
                            {/* Registration ID Input */}
                            <label htmlFor="regId">Registration ID (From Email)</label>
                            <input
                                id="regId"
                                type="text"
                                placeholder="Your Registration ID (from email)"
                                value={regId}
                                onChange={(e) => setRegId(e.target.value)}
                                disabled={showQuestion}
                                required
                            />
                            
                            {/* Answer Input (Only visible when question is shown) */}
                            {showQuestion && (
                                <div className="response-inputs-flex" 
                                     style={{ 
                                         display: 'flex', 
                                         gap: '20px', 
                                         flexWrap: 'wrap', 
                                         width: '100%',
                                         // Enforce 100% width for immediate children (labels and inputs)
                                         // if they are not in the flex containers below
                                     }}>
                                    
                                    {/* 1. Answer Box */}
                                    <div style={{ flex: '1 1 45%', minWidth: '300px', display: 'flex', flexDirection: 'column' }}>
                                        <label htmlFor="answer">Your Answer</label>
                                        <textarea
                                            id="answer"
                                            placeholder="Type your answer here..."
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            rows="8" // Standardized size
                                            disabled={autoSubmitted}
                                            required
                                            style={{ width: '100%', boxSizing: 'border-box', flexGrow: 1 }}
                                        />
                                    </div>

                                    {/* 2. Rules/Case Laws Box (Same size as Answer Box) */}
                                    <div style={{ flex: '1 1 45%', minWidth: '300px', display: 'flex', flexDirection: 'column' }}>
                                        <label htmlFor="rules">Rules/Acts/Case Laws/Quotation (Optional)</label>
                                        <textarea
                                            id="rules"
                                            placeholder="Quote relevant rules or case laws for bonus marks..."
                                            value={rules}
                                            onChange={(e) => setRules(e.target.value)}
                                            rows="8" // Standardized size
                                            disabled={autoSubmitted}
                                            style={{ width: '100%', boxSizing: 'border-box', flexGrow: 1 }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={{marginTop:10}}>
                            {/* BUTTON/TIMER LOGIC */}
                            {!showQuestion && !autoSubmitted &&
                                <button 
                                    onClick={handleShowQuestion} 
                                    disabled={!regId || isSubmitting} // Checks if RegId is present
                                >
                                    Show Question & Start Timer ({formatTime(150)})
                                </button>
                            }
                            {showQuestion && !autoSubmitted && <div>
                                <p>Time left: <strong>{formatTime(secondsLeft)}</strong></p>
                                <button onClick={()=>handleSubmit(false)} disabled={autoSubmitted || isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Submit Now'}
                                </button>
                            </div>}
                        </div>
                        
                        {autoSubmitted && <p className="small" style={{marginTop: '15px'}}>✅ **Answer was submitted**.</p>}
                    </>
                ) : (
                    <div style={{padding: '20px', textAlign: 'center'}}>
                        <p style={{fontSize: '1.2em', color: '#555'}}>The mystery story for {info.title} has not yet been published.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
