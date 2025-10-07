import { CONFIG } from '../config'
import { useEffect, useState, useRef } from 'react'

const DAY_CONTENT = {
    code: "D4",
    title: "Day 4 — The Unexplained Disappearance of Funds",
    story: `The Central Vigilance Commission (CVC) initiates a top-secret investigation into a senior officer of the Directorate of Revenue Intelligence (DRI) after an anonymous tip-off. The tip alleges that the officer, a highly respected Deputy Director with an impeccable service record, has amassed wealth disproportionate to his known sources of income. The CBI is brought in, and its investigators are tasked with unraveling a complex web of financial transactions, shell companies, and benami properties registered in the names of the officer's relatives and close associates. The investigation team works for months, meticulously tracing every suspicious transaction.
Course of Action Taken/Investigation: The CBI conducts a discreet but exhaustive investigation. They find numerous deposits in various bank accounts and property purchases made in the names of the officer's relatives and close associates, for which no legitimate source of income can be established. When confronted with this evidence, the officer provides vague and contradictory explanations, claiming the funds were from gifts and a small family business. However, he fails to provide any credible evidence, such as financial records, tax returns, or gift deeds, to support his claims. A departmental inquiry is launched, and a formal charge sheet is issued alleging a violation of Rule 3(1) of the CCS (Conduct) Rules, 1964, regarding integrity and devotion to duty.
Proves that Came Out:
- A comprehensive CBI investigation report detailing the disproportionate assets.
- The officer's failure to satisfactorily explain the source of the funds and provide supporting documents during the inquiry.
- The legal principle that in cases of disproportionate assets, the burden of proof shifts to the government servant to explain their source.`,
    question: `The officer's lawyer argues that the department has not proven his guilt "beyond reasonable doubt," a standard required in criminal cases. Therefore, he claims, no penalty can be imposed. Explain in a paragraph why the lawyer's argument is flawed and what standard of proof is used in departmental inquiries.`,
}

// NOTE: The rest of the component logic is identical to 1.js/2.js/3.js/5.js
export default function Day4(){
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