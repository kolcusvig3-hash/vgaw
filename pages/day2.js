import { CONFIG } from '../config'
import { useEffect, useState, useRef } from 'react'

const DAY_CONTENT = {
    code: "D2",
    title: "Day 2 — The Inquiry Officer’s Twist",
    story: `A senior officer in the Central Board of Indirect Taxes and Customs (CBIC) is accused of a crime of unimaginable proportions: misappropriating funds from a government welfare scheme intended for his staff. An inquiry officer, a veteran bureaucrat known for his scrupulous honesty and thoroughness, is appointed to investigate the charges. The officer’s fate rests on the outcome of this inquiry, which takes on the atmosphere of a high-stakes trial. The presenting officer from the department, a young, ambitious lawyer, is confident. He presents a mountain of evidence: witness statements from disgruntled staff, bank statements showing suspicious transactions, and internal audit reports that meticulously trace the missing funds. He argues that the evidence forms an ironclad chain of culpability, and a guilty verdict is a foregone conclusion.
Course of Action Taken/Investigation: The inquiry officer diligently records all the evidence presented. The accused officer, a cunning and evasive character, refutes the allegations with a calm demeanor, pointing out minor procedural inconsistencies and a lack of direct, personal evidence against him. He claims the funds were lost due to a clerical error and that the suspicious transactions were a result of his family’s private business dealings, though he provides no solid proof. After weeks of intense hearings, the inquiry concludes. The inquiry officer, after painstakingly reviewing every document and testimony, writes his report. When the disciplinary authority opens the sealed report, they are shocked by the conclusion: "Based on the evidence presented, there is a complete lack of proof to substantiate the charges. The allegations are 'not proved'." The report notes that while the circumstantial evidence raises suspicion, the presenting officer failed to establish a direct, personal link between the officer and the misappropriation.
Proves that Came Out:
- A detailed and lengthy inquiry report prepared by a highly respected Inquiry Officer.
- The report’s finding of "no evidence" to support the allegations, despite the presenting officer providing numerous documents and witness statements.
- The crucial flaw in the department's case: the presenting officer's failure to establish a clear, unbreakable, and personal link between the documents and the officer's actions, relying instead on assumptions and circumstantial conjecture.`,
    question: `The disciplinary authority, after reviewing the entire case file, strongly disagrees with the inquiry officer's report. The authority believes the evidence, when viewed cumulatively, points to the officer's guilt. The authority is now considering imposing a major penalty. In a brief paragraph, explain whether the disciplinary authority's decision is legally sound and what specific actions they must take to justify their decision.`,
}

// NOTE: The rest of the component logic is identical to 1.js/3.js/4.js/5.js
export default function Day2(){
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