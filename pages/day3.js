import { CONFIG } from '../config'
import { useEffect, useState, useRef } from 'react'

const DAY_CONTENT = {
    code: "D3",
    title: "Day 3 — The General Manager's Paradox",
    story: `An officer in the Department of Telecommunications, a talented but reckless engineer, is accused of severe misconduct and corruption. He is alleged to have accepted a large sum of money to approve faulty equipment from a supplier, a decision that could compromise a national network. The charges are grave enough to warrant a major penalty, possibly even dismissal from service. The department's Disciplinary Authority for this particular officer is the Member of the Telecommunications Commission, a Group 'A' officer. However, the charge sheet is not issued by this high-ranking official. Instead, it is issued by the officer's immediate superior, the General Manager. The General Manager's powers are limited—he can only impose minor penalties, such as censure or withholding of increments.
Course of Action Taken/Investigation: The General Manager, citing specific departmental rules and the CCS (CCA) Rules, issues a charge sheet under Rule 14 (the procedure for major penalties) against the officer. The charge sheet is comprehensive, detailing the allegations, the evidence, and the articles of charge. The officer immediately challenges this action, arguing that a General Manager, who cannot impose a major penalty, also lacks the authority to initiate a proceeding for one. The officer claims the entire process is flawed from the beginning, as a lower-ranking officer cannot legally start a process that could lead to a punishment they themselves cannot inflict.
Proves that Came Out:
- The charge sheet was correctly issued under Rule 14 of the CCS (CCA) Rules.
- The General Manager, by his designation, is empowered only to impose minor penalties.
- The department's defense is a reliance on a specific legal provision: Rule 13(2) of the CCS (CCA) Rules, which states, "The disciplinary authority competent under these rules to impose any of the penalties specified in clauses (i) to (iv) of rule 11 may institute disciplinary proceedings..."`,
    question: `In a brief paragraph, explain why the General Manager's charge sheet is valid, or invalid, based on the information provided in the story. You must reference the specific rule and explain the concept of the authority's role in initiating vs. imposing penalties.`,
}

// NOTE: The rest of the component logic is identical to 1.js/2.js/4.js/5.js
export default function Day3(){
    const info = DAY_CONTENT
    const dayKey = info.code;

    const [teamName, setTeamName] = useState('')
    const [teamId, setTeamId] = useState('')
    const [answer, setAnswer] = useState('')
    const [showQuestion, setShowQuestion] = useState(false) 
    const [secondsLeft, setSecondsLeft] = useState(150) 
    const [autoSubmitted, setAutoSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const timerRef = useRef(null)

    useEffect(()=>{
        if(!showQuestion || autoSubmitted || isSubmitting) return
        clearTimeout(timerRef.current) 
        if(secondsLeft <= 0){
            handleSubmit(true)
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
        setShowQuestion(true)
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
            window.open(url, '_blank')

            alert('✅ Your answer has been submitted. A confirmation tab may have opened and closed automatically.');
            
        } else {
            alert("Error: Submission action or fields are not configured properly. Submission aborted.");
            setAutoSubmitted(false)
        }
        setIsSubmitting(false)
    }

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div>
            <div className="card">
                <h2>{info.title}</h2>
                
                <>
                    {!showQuestion && !autoSubmitted && (
                        <div style={{marginBottom: '20px', padding: '10px', border: '1px solid #ccc', backgroundColor: '#f9f9f9'}}>
                            **INSTRUCTIONS:** 🧐 Please **read the entire story first**. When you fully understand the case and have filled in your **Your Name** and **Registration ID** below, press **'Show Question & Start Timer'**. This will reveal the question and start your **2 minute 30 second** timer.
                        </div>
                    )}

                    <p className="small">
                        <strong>Story:</strong>
                        <br/>
                        {info.story.split('\n').map((line, index) => (
                            <span key={index}>{line}<br/></span>
                        ))}
                    </p>
                    
                    <hr/>
                    
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