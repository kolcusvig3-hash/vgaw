import { CONFIG } from '../config'
import { useEffect, useState, useRef } from 'react'

const DAY_CONTENT = {
    code: "D1",
    title: "Day 1 — The Curse of the Phantom Complaint",
    story: `Our protagonist, an officer known only as "Victor," was a rising star in the customs department. As a Superintendent, he was instrumental in busting several large-scale smuggling rackets, earning him a reputation for being incorruptible. His colleagues looked up to him, and he was held up as a shining example of a dedicated civil servant. In a small, almost forgotten corner of the department’s vigilance records, a complaint had been filed against him. An anonymous letter, written in a shaky hand, alleged that he had accepted a bribe to facilitate the movement of undeclared goods through the port. However, the vigilance wing of the department found no substantiating evidence and, in due course, closed the file. The matter was never deemed serious enough to warrant a formal investigation or a charge sheet, and Victor's integrity certificate remained pristine. With his service record unblemished, he was promoted to the prestigious rank of Assistant Commissioner.
His new position brought more power and more enemies. A few months into his new role, a thunderclap of a charge sheet lands on his desk. It’s not from his department but from the Central Bureau of Investigation (CBI). The charges were severe: criminal conspiracy and demanding and accepting illegal gratification under the Prevention of Corruption Act. The CBI's case was built on a series of sting operations, a network of informants, and a trail of encrypted messages pointing to his alleged involvement while he was a Superintendent. The department, on receiving the CBI’s charge sheet, immediately initiated a parallel disciplinary proceeding.
Course of Action Taken/Investigation: The Principal Commissioner of Customs, acting on the CBI's chargesheet, quickly prepared a departmental charge memo against Victor under Rule 14 of the CCS (CCA) Rules, 1965. The Principal Commissioner, a no-nonsense officer, was determined to take swift action against any whiff of corruption, regardless of rank. Victor’s plea that he had already been cleared of this very allegation was dismissed, as the CBI’s evidence was presented as a new and independent development. The Principal Commissioner believed that since his office had prepared and issued the charge sheet, it was also within his purview to impose the penalty after the inquiry was concluded. He was, after all, the administrative head of the office and had a clear directive to uphold integrity.
Proves that Came Out:
- A comprehensive CBI chargesheet and its detailed report, including transcripts of encrypted messages, a forensic analysis of the funds, and financial transaction records.
- The departmental charge sheet, which was a replica of the CBI’s, issued and signed by the Principal Commissioner.
- The fact that Victor was a Group 'A' officer and his appointing authority was a much higher entity than the Principal Commissioner.`,
    question: `Victor's lawyer argues that regardless of the CBI's findings, the disciplinary process is invalid. In a single, comprehensive paragraph, explain why the Principal Commissioner’s belief is flawed. Then, describe the correct legal action the department should have taken to avoid this procedural error and ensure the disciplinary action is legally sound.`,
}

// NOTE: This component is a modified version of your original [day].js logic
// It no longer uses useRouter, the DAYS object, the admin password, or the publishing logic.
export default function Day1(){
    const info = DAY_CONTENT
    const dayKey = info.code;

    const [teamName, setTeamName] = useState('')
    const [teamId, setTeamId] = useState('')
    const [answer, setAnswer] = useState('')
    const [showQuestion, setShowQuestion] = useState(false) 
    // 150 seconds = 2 mins 30 secs
    const [secondsLeft, setSecondsLeft] = useState(150) 
    const [autoSubmitted, setAutoSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    // Story is now always 'published'
    const isStoryPublished = true;
    
    const timerRef = useRef(null)

    // EFFECT for timer logic (now simplified without a need to check isStoryPublished)
    useEffect(()=>{
        if(!showQuestion || autoSubmitted || isSubmitting) return
        
        clearTimeout(timerRef.current) 

        if(secondsLeft <= 0){
            handleSubmit(true) // Pass true for auto-submission
            return
        }
        
        timerRef.current = setTimeout(()=> setSecondsLeft(s => s-1), 1000)
        
        return ()=> clearTimeout(timerRef.current)
        
    }, [showQuestion, secondsLeft, autoSubmitted, isSubmitting])

    function handleShowQuestion(){
        if(!teamName || !teamId){
            alert('Please enter Your Name and Registration ID before viewing the question.')
            return
        }
        setShowQuestion(true) // Show the question and start the timer
    }

    async function handleSubmit(isAuto=false){
        if(autoSubmitted || isSubmitting) return

        setAutoSubmitted(true) 
        setIsSubmitting(true)
        clearTimeout(timerRef.current) 

        const action = CONFIG.SUBMISSION_FORM_ACTION
        const fields = CONFIG.SUBMISSION_FIELDS || {}
        const dayCode = info.code

        if(action && Object.keys(fields).length>0){
            
            const params = []
            
            if(fields.teamName) params.push(`${encodeURIComponent(fields.teamName)}=${encodeURIComponent(teamName)}`)
            if(fields.teamId) params.push(`${encodeURIComponent(fields.teamId)}=${encodeURIComponent(teamId)}`)
            if(fields.dayCode) params.push(`${encodeURIComponent(fields.dayCode)}=${encodeURIComponent(dayCode)}`)
            if(fields.answer) params.push(`${encodeURIComponent(fields.answer)}=${encodeURIComponent(answer + (isAuto? ' (AUTO-SUBMITTED on timeout)' : ''))}`)
            
            const url = action + (action.includes('?')? '&' : '?') + params.join('&')

            // Use window.open to reliably force submission
            window.open(url, '_blank')

            alert('✅ Your answer has been submitted. A confirmation tab may have opened and closed automatically.');
            
        } else {
            alert("Error: Submission action or fields are not configured properly. Submission aborted.");
            setAutoSubmitted(false)
        }
        
        setIsSubmitting(false)
    }

    // Helper function to format time
    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div>
            <div className="card">
                <h2>{info.title}</h2>
                
                {/* --- MAIN PARTICIPANT CONTENT (Now always visible) --- */}
                <>
                    {/* INSTRUCTIONS */}
                    {!showQuestion && !autoSubmitted && (
                        <div style={{marginBottom: '20px', padding: '10px', border: '1px solid #ccc', backgroundColor: '#f9f9f9'}}>
                            **INSTRUCTIONS:** 🧐 Please **read the entire story first**. When you fully understand the case and have filled in your **Your Name** and **Registration ID** below, press **'Show Question & Start Timer'**. This will reveal the question and start your **2 minute 30 second** timer.
                        </div>
                    )}

                    {/* STORY */}
                    <p className="small">
                        <strong>Story:</strong>
                        <br/>
                        {info.story.split('\n').map((line, index) => (
                            <span key={index}>{line}<br/></span>
                        ))}
                    </p>
                    
                    <hr/>
                    
                    {/* PARTICIPANT DETAILS */}
                    <h3>Participant Details</h3>
                    <label>Your Name<br/>
                        <input 
                            value={teamName} 
                            onChange={e=>setTeamName(e.target.value)} 
                            disabled={showQuestion || autoSubmitted}
                        />
                    </label>
                    <br/>
                    <label>Registration ID<br/>
                        <input 
                            value={teamId} 
                            onChange={e=>setTeamId(e.target.value)} 
                            disabled={showQuestion || autoSubmitted}
                        />
                    </label>
                    <br/>
                    <label>Day Code<br/>
                        <input value={info.code} disabled />
                    </label>

                    <hr/>
                    
                    {/* QUESTION & ANSWER SECTION */}
                    {showQuestion ? (
                        <>
                            <p className="small">
                                <strong>Question:</strong> {info.question}
                            </p>

                            <h3>Your Answer</h3>
                            <textarea 
                                style={{width:'100%',height:200}} 
                                value={answer} 
                                onChange={e=>setAnswer(e.target.value)} 
                                disabled={autoSubmitted}
                            ></textarea>
                        </>
                    ) : (
                        <div style={{minHeight: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee', borderRadius: '5px'}}>
                            <p style={{color: '#666', fontStyle: 'italic'}}>Question and Answer box will appear after the timer starts.</p>
                        </div>
                    )}

                    <div style={{marginTop:10}}>
                        {/* BUTTON/TIMER LOGIC */}
                        {!showQuestion && !autoSubmitted &&
                            <button 
                                onClick={handleShowQuestion} 
                                disabled={!teamName || !teamId}
                            >
                                Show Question & Start Timer (2 minutes 30 seconds)
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
            </div>
        </div>
    )
}