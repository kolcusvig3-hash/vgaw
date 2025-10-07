import { CONFIG } from '../config'
import { useEffect, useState, useRef } from 'react'

const DAY_CONTENT = {
    code: "D0",
    title: "Mystery will appear here",
    story: `As of now stories are disabled, only testing purpose answer maybe submitted`,
    question: `write : checking test page as answer`,
}

// NOTE: This component is a modified version of your original [day].js logic
// It no longer uses useRouter, the DAYS object, the admin password, or the publishing logic.
export default function Day0(){
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
            alert('Please enter Yout Name and Registration ID before viewing the question.')
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