import { CONFIG } from '../config'
import { useEffect, useState, useRef } from 'react'

const DAY_CONTENT = {
    code: "D4",
    title: "Day 4 — The Unexplained Disappearance of Funds",
    story: `The Central Vigilance Commission (CVC) initiates a top-secret investigation into a senior officer of the Directorate of Revenue Intelligence (DRI) after an anonymous tip-off. The tip alleges that the officer, a highly respected Deputy Director with an impeccable service record, has amassed wealth disproportionate to his known sources of income. The CBI is brought in, and its investigators are tasked with unraveling a complex web of financial transactions, shell companies, and benami properties registered in the names of the officer's relatives and close associates. The investigation team works for months, meticulously tracing every suspicious transaction.
Course of Action Taken/Investigation: The CBI conducts a discreet but exhaustive investigation. They find numerous deposits in various bank accounts and property purchases made in the names of the officer's relatives and close associates, for which no legitimate source of income can be established. When confronted with this evidence, the officer provides vague and contradictory explanations, claiming the funds were from gifts and a small family business. However, he fails to provide any credible evidence, such as financial records, tax returns, or gift deeds, to support his claims. A departmental inquiry is launched, and a formal charge sheet is issued to the officer alleging that he has acquired assets disproportionate to his known sources of income. The Disciplinary Authority must now decide what standard of evidence and proof is required to establish the charge.
Proves that Came Out: In the subsequent inquiry, the department established that the officer was in possession of assets worth *X* and his total legal income was *Y*, where *X* was significantly greater than *Y*. The Inquiry Officer noted that the officer failed to discharge his obligation to prove that the excess assets were acquired through legitimate sources. Based on the inability of the officer to rebut the presumption of disproportionate assets, the Inquiry Officer proved the charge of corruption.
`,
    question: `In a case of disproportionate assets under a disciplinary proceeding, where the officer is charged with misconduct, what is the *burden of proof*? Who bears this burden, and how does this standard differ from a criminal trial under the Prevention of Corruption Act?`,
}

// Utility function to format seconds into minutes:seconds
const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export default function Day4(){
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
                    Please <strong>read the entire story first</strong>. When you fully understand the case and have filled in your <strong>Registration ID</strong> below, press <strong>'Show Question & Start Timer'</strong>. This will reveal the question and start your <strong>2 minute 30 second</strong> timer. Answer within the stipulated time or it will be submitted automatically. Extra points will be given for citing "Quotations, Rules/Acts/Case Laws. <strong> Usage of AI will be verified and if found, will attract negative marks</strong>".
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
