import { useRouter } from 'next/router'
import { CONFIG } from '../config'
import { useEffect, useState, useRef } from 'react'

// --- START: Full Story/Question Content (Sourced from Mystery Cases.docx) ---
const DAYS = {
  '1': {
    title: "Day 1 — The Curse of the Phantom Complaint",
    story: `Our protagonist, an officer known only as "Victor," was a rising star in the customs department. As a Superintendent, he was instrumental in busting several large-scale smuggling rackets, earning him a reputation for being incorruptible. His colleagues looked up to him, and he was held up as a shining example of a dedicated civil servant. In a small, almost forgotten corner of the department’s vigilance records, a complaint had been filed against him. An anonymous letter, written in a shaky hand, alleged that he had accepted a bribe to facilitate the movement of undeclared goods through the port. However, the vigilance wing of the department found no substantiating evidence and, in due course, closed the file. The matter was never deemed serious enough to warrant a formal investigation or a charge sheet, and Victor's integrity certificate remained pristine. With his service record unblemished, he was promoted to the prestigious rank of Assistant Commissioner.
His new position brought more power and more enemies. A few months into his new role, a thunderclap of a charge sheet lands on his desk. It’s not from his department but from the Central Bureau of Investigation (CBI). The charges were severe: criminal conspiracy and demanding and accepting illegal gratification under the Prevention of Corruption Act. The CBI's case was built on a series of sting operations, a network of informants, and a trail of encrypted messages pointing to his alleged involvement while he was a Superintendent. The department, on receiving the CBI’s charge sheet, immediately initiated a parallel disciplinary proceeding.
Course of Action Taken/Investigation: The Principal Commissioner of Customs, acting on the CBI's chargesheet, quickly prepared a departmental charge memo against Victor under Rule 14 of the CCS (CCA) Rules, 1965. The Principal Commissioner, a no-nonsense officer, was determined to take swift action against any whiff of corruption, regardless of rank. Victor’s plea that he had already been cleared of this very allegation was dismissed, as the CBI’s evidence was presented as a new and independent development. The Principal Commissioner believed that since his office had prepared and issued the charge sheet, it was also within his purview to impose the penalty after the inquiry was concluded. He was, after all, the administrative head of the office and had a clear directive to uphold integrity.
Proves that Came Out:
- A comprehensive CBI chargesheet and its detailed report, including transcripts of encrypted messages, a forensic analysis of the funds, and financial transaction records.
- The departmental charge sheet, which was a replica of the CBI’s, issued and signed by the Principal Commissioner.
- The fact that Victor was a Group 'A' officer and his appointing authority was a much higher entity than the Principal Commissioner.`,
    question: `Victor's lawyer argues that regardless of the CBI's findings, the disciplinary process is invalid. In a single, comprehensive paragraph, explain why the Principal Commissioner’s belief is flawed. Then, describe the correct legal action the department should have taken to avoid this procedural error and ensure the disciplinary action is legally sound.`,
    code: "D1",
  },
  '2': {
    title: "Day 2 — The Inquiry Officer’s Twist",
    story: `A senior officer in the Central Board of Indirect Taxes and Customs (CBIC) is accused of a crime of unimaginable proportions: misappropriating funds from a government welfare scheme intended for his staff. An inquiry officer, a veteran bureaucrat known for his scrupulous honesty and thoroughness, is appointed to investigate the charges. The officer’s fate rests on the outcome of this inquiry, which takes on the atmosphere of a high-stakes trial. The presenting officer from the department, a young, ambitious lawyer, is confident. He presents a mountain of evidence: witness statements from disgruntled staff, bank statements showing suspicious transactions, and internal audit reports that meticulously trace the missing funds. He argues that the evidence forms an ironclad chain of culpability, and a guilty verdict is a foregone conclusion.
Course of Action Taken/Investigation: The inquiry officer diligently records all the evidence presented. The accused officer, a cunning and evasive character, refutes the allegations with a calm demeanor, pointing out minor procedural inconsistencies and a lack of direct, personal evidence against him. He claims the funds were lost due to a clerical error and that the suspicious transactions were a result of his family’s private business dealings, though he provides no solid proof. After weeks of intense hearings, the inquiry concludes. The inquiry officer, after painstakingly reviewing every document and testimony, writes his report. When the disciplinary authority opens the sealed report, they are shocked by the conclusion: "Based on the evidence presented, there is a complete lack of proof to substantiate the charges. The allegations are 'not proved'." The report notes that while the circumstantial evidence raises suspicion, the presenting officer failed to establish a direct, personal link between the officer and the misappropriation.
Proves that Came Out:
- A detailed and lengthy inquiry report prepared by a highly respected Inquiry Officer.
- The report’s finding of "no evidence" to support the allegations, despite the presenting officer providing numerous documents and witness statements.
- The crucial flaw in the department's case: the presenting officer's failure to establish a clear, unbreakable, and personal link between the documents and the officer's actions, relying instead on assumptions and circumstantial conjecture.`,
    question: `The disciplinary authority, after reviewing the entire case file, strongly disagrees with the inquiry officer's report. The authority believes the evidence, when viewed cumulatively, points to the officer's guilt. The authority is now considering imposing a major penalty. In a brief paragraph, explain whether the disciplinary authority's decision is legally sound and what specific actions they must take to justify their decision.`,
    code: "D2",
  },
  '3': {
    title: "Day 3 — The General Manager's Paradox",
    story: `An officer in the Department of Telecommunications, a talented but reckless engineer, is accused of severe misconduct and corruption. He is alleged to have accepted a large sum of money to approve faulty equipment from a supplier, a decision that could compromise a national network. The charges are grave enough to warrant a major penalty, possibly even dismissal from service. The department's Disciplinary Authority for this particular officer is the Member of the Telecommunications Commission, a Group 'A' officer. However, the charge sheet is not issued by this high-ranking official. Instead, it is issued by the officer's immediate superior, the General Manager. The General Manager's powers are limited—he can only impose minor penalties, such as censure or withholding of increments.
Course of Action Taken/Investigation: The General Manager, citing specific departmental rules and the CCS (CCA) Rules, issues a charge sheet under Rule 14 (the procedure for major penalties) against the officer. The charge sheet is comprehensive, detailing the allegations, the evidence, and the articles of charge. The officer immediately challenges this action, arguing that a General Manager, who cannot impose a major penalty, also lacks the authority to initiate a proceeding for one. The officer claims the entire process is flawed from the beginning, as a lower-ranking officer cannot legally start a process that could lead to a punishment they themselves cannot inflict.
Proves that Came Out:
- The charge sheet was correctly issued under Rule 14 of the CCS (CCA) Rules.
- The General Manager, by his designation, is empowered only to impose minor penalties.
- The department's defense is a reliance on a specific legal provision: Rule 13(2) of the CCS (CCA) Rules, which states, "The disciplinary authority competent under these rules to impose any of the penalties specified in clauses (i) to (iv) of rule 11 may institute disciplinary proceedings..."`,
    question: `In a brief paragraph, explain why the General Manager's charge sheet is valid, or invalid, based on the information provided in the story. You must reference the specific rule and explain the concept of the authority's role in initiating vs. imposing penalties.`,
    code: "D3",
  },
  '4': {
    title: "Day 4 — The Unexplained Disappearance of Funds",
    story: `The Central Vigilance Commission (CVC) initiates a top-secret investigation into a senior officer of the Directorate of Revenue Intelligence (DRI) after an anonymous tip-off. The tip alleges that the officer, a highly respected Deputy Director with an impeccable service record, has amassed wealth disproportionate to his known sources of income. The CBI is brought in, and its investigators are tasked with unraveling a complex web of financial transactions, shell companies, and benami properties registered in the names of the officer's relatives and close associates. The investigation team works for months, meticulously tracing every suspicious transaction.
Course of Action Taken/Investigation: The CBI conducts a discreet but exhaustive investigation. They find numerous deposits in various bank accounts and property purchases made in the names of the officer's relatives and close associates, for which no legitimate source of income can be established. When confronted with this evidence, the officer provides vague and contradictory explanations, claiming the funds were from gifts and a small family business. However, he fails to provide any credible evidence, such as financial records, tax returns, or gift deeds, to support his claims. A departmental inquiry is launched, and a formal charge sheet is issued alleging a violation of Rule 3(1) of the CCS (Conduct) Rules, 1964, regarding integrity and devotion to duty.
Proves that Came Out:
- A comprehensive CBI investigation report detailing the disproportionate assets.
- The officer's failure to satisfactorily explain the source of the funds and provide supporting documents during the inquiry.
- The legal principle that in cases of disproportionate assets, the burden of proof shifts to the government servant to explain their source.`,
    question: `The officer's lawyer argues that the department has not proven his guilt "beyond reasonable doubt," a standard required in criminal cases. Therefore, he claims, no penalty can be imposed. Explain in a paragraph why the lawyer's argument is flawed and what standard of proof is used in departmental inquiries.`,
    code: "D4",
  },
  '5': {
    title: "Day 5 — The Judgment and the Service Record",
    story: `A clerk in a regional office of the Central Bureau of Narcotics is accused of taking a bribe from a known drug dealer to tip him off about an impending raid. The local police, acting on a tip, raid the drug dealer’s hideout and find the clerk accepting a large sum of money in a carefully orchestrated trap. The police arrest both the dealer and the clerk, and a criminal case is filed against them under the Prevention of Corruption Act. The police's evidence is overwhelming, including video recordings, eyewitness testimony, and the recovered bribe money. The case proceeds swiftly in the criminal court.
Course of Action Taken/Investigation: A departmental disciplinary proceeding is initiated against the clerk. However, the department's disciplinary authority decides to wait for the outcome of the criminal trial before proceeding with a full-fledged departmental inquiry. The criminal court, based on the strong evidence presented by the police, convicts the clerk and sentences him to several years in prison. The conviction is a matter of public record, and a copy of the judgment is forwarded to the department. Now, the disciplinary authority must decide on the appropriate course of action, which could range from an immediate penalty to a full-fledged inquiry.
Proves that Came Out:
- A formal judgment from a criminal court convicting the government servant of a serious crime.
- Overwhelming evidence presented in the criminal trial, which led to the conviction.
- The fact that no full departmental inquiry under Rule 14 was conducted.`,
    question: `The clerk's lawyer argues that the department cannot impose a penalty without conducting a proper departmental inquiry, as mandated by the CCS (CCA) Rules. Explain whether the department is required to conduct a full inquiry, or if it can act directly on the criminal court’s judgment. Also, state the legal basis for either decision.`,
    code: "D5",
  }
}
// --- END: Full Story/Question Content ---

const PUBLISH_STORAGE_KEY = 'INTEGRITY_MYSTERY_PUBLISHED_DAYS';
// 💡 Admin Password is now read from the environment variable (must be NEXT_PUBLIC_ADMIN_PASSWORD in .env.local)
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;


export default function Day(){
  const router = useRouter()
  const { day } = router.query

  // // HYDRATION FIX
  // if (!day) {
  //   return <div>Loading day content...</div>
  // }
  
  const info = DAYS[day] || DAYS['1']
  const dayKey = info.code; // D1, D2, etc.

  const [teamName, setTeamName] = useState('')
  const [teamId, setTeamId] = useState('')
  const [answer, setAnswer] = useState('')
  const [showQuestion, setShowQuestion] = useState(false) 
  const [secondsLeft, setSecondsLeft] = useState(150) // 150 seconds = 2 mins 30 secs
  const [autoSubmitted, setAutoSubmitted] = useState(false)
  
  // 💡 STATE: Story publication status
  const [isStoryPublished, setIsStoryPublished] = useState(false);
  
  const timerRef = useRef(null)

  // EFFECT to check if the story has already been published in local storage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const publishedDays = JSON.parse(localStorage.getItem(PUBLISH_STORAGE_KEY) || '{}');
        if (publishedDays[dayKey] === true) {
          setIsStoryPublished(true);
        }
      }
    } catch (e) {
      console.error("Error reading published status from local storage", e);
    }
  }, [dayKey]);


  useEffect(()=>{
    if(!showQuestion || autoSubmitted) return
    
    clearTimeout(timerRef.current) 

    if(secondsLeft <= 0){
      handleSubmit(true)
      return
    }
    
    timerRef.current = setTimeout(()=> setSecondsLeft(s => s-1), 1000)
    
    return ()=> clearTimeout(timerRef.current)
    
  }, [showQuestion, secondsLeft, autoSubmitted]) 

  // 💡 MODIFIED FUNCTION: Uses prompt() to ask for password
  function handlePublishStory(){
    if (!ADMIN_PASSWORD) {
        alert("Admin password is not configured in environment variables (.env.local).");
        return;
    }
    
    const password = prompt("Enter Admin Password to publish the story:");
    
    if (password === ADMIN_PASSWORD) {
      // 1. Update state
      setIsStoryPublished(true);
      
      // 2. Persist status in local storage
      try {
        const publishedDays = JSON.parse(localStorage.getItem(PUBLISH_STORAGE_KEY) || '{}');
        publishedDays[dayKey] = true;
        localStorage.setItem(PUBLISH_STORAGE_KEY, JSON.stringify(publishedDays));
        alert(`Story for ${info.title} is now published!`);
      } catch (e) {
        console.error("Error writing published status to local storage", e);
        alert("Story published locally, but error saving status. Please try again.");
      }
    } else if (password !== null) { // null if user cancels
      alert('Incorrect Admin Password or password field was empty.');
    }
  }

  function handleShowQuestion(){
    if(!teamName || !teamId){
      alert('Please enter Team Name and Team ID before viewing the question.')
      return
    }
    setShowQuestion(true) // Show the question and start the timer
  }

  async function handleSubmit(isAuto=false){
    if(autoSubmitted) return
    setAutoSubmitted(true)
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

      // Use window.open to reliably force submission by redirecting the new tab to /formResponse
      window.open(url, '_blank')
    }
    
    alert('Your answer has been submitted.' + (isAuto? ' (Auto-submitted on timeout)' : ''))
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
        
        {/* --- 💡 ADMIN PUBLISH SECTION (Visible only if story is NOT published) --- */}
        {!isStoryPublished && (
          <div style={{
            padding: '15px', 
            border: '2px dashed #f00', 
            margin: '20px 0', 
            backgroundColor: '#ffdddd',
            textAlign: 'center'
          }}>
            <h3>🔒 Admin Controls</h3>
            <p className="small">The story is currently **hidden** from participants. Click to prompt for the password and publish the story.</p>
            {/* Removed input field, using prompt() instead */}
            <button onClick={handlePublishStory}>Publish Story</button>
          </div>
        )}

        {/* --- MAIN PARTICIPANT CONTENT (Visible only AFTER publication) --- */}
        {isStoryPublished ? (
          <>
            {/* INSTRUCTIONS */}
            {!showQuestion && !autoSubmitted && (
                <div style={{marginBottom: '20px', padding: '10px', border: '1px solid #ccc', backgroundColor: '#f9f9f9'}}>
                    **INSTRUCTIONS:** 🧐 Please **read the entire story first**. When you fully understand the case and have filled in your **Team Name** and **Team ID** below, press **'Show Question & Start Timer'**. This will reveal the question and start your **2 minute 30 second** timer.
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
            <label>Team Name<br/>
              <input 
                value={teamName} 
                onChange={e=>setTeamName(e.target.value)} 
                disabled={showQuestion || autoSubmitted}
              />
            </label>
            <br/>
            <label>Team ID<br/>
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
                <button onClick={()=>handleSubmit(false)} disabled={autoSubmitted}>Submit Now</button>
              </div>}
            </div>
            
            {autoSubmitted && <p className="small" style={{marginTop: '15px'}}>✅ <em>Answer was submitted.</em></p>}
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