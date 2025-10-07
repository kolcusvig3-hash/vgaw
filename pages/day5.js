import { CONFIG } from '../config'
import { useEffect, useState, useRef } from 'react'

const DAY_CONTENT = {
    code: "D5",
    title: "Day 5 — The Judgment and the Service Record",
    story: `A clerk in a regional office of the Central Bureau of Narcotics is accused of taking a bribe from a known drug dealer to tip him off about an impending raid. The local police, acting on a tip, raid the drug dealer’s hideout and find the clerk accepting a large sum of money in a carefully orchestrated trap. The police arrest both the dealer and the clerk, and a criminal case is filed against them under the Prevention of Corruption Act. The police's evidence is overwhelming, including video recordings, eyewitness testimony, and the recovered bribe money. The case proceeds swiftly in the criminal court.
Course of Action Taken/Investigation: A departmental disciplinary proceeding is initiated against the clerk. However, the department's disciplinary authority decides to wait for the outcome of the criminal trial before proceeding with a full-fledged departmental inquiry. The criminal court, based on the strong evidence presented by the police, convicts the clerk and sentences him to several years in prison. The conviction is a matter of public record, and a copy of the judgment is forwarded to the department. Now, the disciplinary authority must decide on the appropriate course of action, which could range from an immediate penalty to a full-fledged inquiry.
Proves that Came Out:
- A formal judgment from a criminal court convicting the government servant of a serious crime.
- Overwhelming evidence presented in the criminal trial, which led to the conviction.
- The fact that no full departmental inquiry under Rule 14 was conducted.`,
    question: `The clerk's lawyer argues that the department cannot impose a penalty without conducting a proper departmental inquiry, as mandated by the CCS (CCA) Rules. Explain whether the department is required to conduct a full inquiry, or if it can act directly on the criminal court’s judgment. Also, state the legal basis for either decision.`,
}

// NOTE: The rest of the component logic is identical to 1.js/2.js/3.js/4.js
export default function Day5(){
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
            alert('Please enter Your Name and Registrtaion ID before viewing the question.')
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
                    <label>Registrtaion ID<br/>
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