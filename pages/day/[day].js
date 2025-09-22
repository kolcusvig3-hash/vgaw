import { useRouter } from 'next/router'
import { CONFIG } from '../../config'
import { useEffect, useState } from 'react'

const DAYS = {
  '1':{
    title: 'Day 1 — Complaint Received',
    clue: 'A complaint letter by Mr. R. Sen of Sunrise Exports alleges wrongful blocking of shipment and demurrage. Download the complaint PDF and identify whether this is a vigilance matter.',
    pdfs: ['complaint.pdf']
  },
  '2':{
    title: 'Day 2 — Investigation Initiated',
    clue: 'Internal IO Note and BE extract are available. Identify procedural lapses (statements recorded by non-gazetted officer, delay in seizure).',
    pdfs: ['io_note.pdf']
  },
  '3':{
    title: 'Day 3 — Findings & Prima Facie',
    clue: 'Preliminary findings show trader misdeclaration and officer procedural lapse. Decide correct course (minor penalty under Rule 16).',
    pdfs: ['prelim_report.pdf']
  },
  '4':{
    title: 'Day 4 — Disciplinary Proceedings',
    clue: 'Draft Charge Memo under Rule 16 issued. Classify penalties into Minor/Major and understand implications.',
    pdfs: ['charge_memo.pdf']
  },
  '5':{
    title: 'Day 5 — Outcome & Lessons',
    clue: 'Final Order: Officer censured. Reconstruct timeline and submit a short case summary.',
    pdfs: ['final_order.pdf']
  }
}

export default function DayPage(){
  const router = useRouter()
  const { day } = router.query
  const [published, setPublished] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(()=>{
    if(!day) return
    const key = 'published_day_' + day
    const val = localStorage.getItem(key)
    setPublished(val === 'true')
  },[day])

  if(!day || !DAYS[day]){
    return <div className="card"><h3>Invalid day</h3></div>
  }

  const meta = DAYS[day]

  function handlePublish(){
    const code = prompt('Enter admin code to publish this clue (demo).')
    if(code === 'kolvaw2025'){
      localStorage.setItem('published_day_' + day, 'true')
      setPublished(true)
      alert('Clue published')
    } else {
      alert('Incorrect code')
    }
  }

  return (
    <div>
      <div className="card">
        <h2>{meta.title}</h2>
        {!published ? (
          <div className="clue-hidden">
            <p className="small">This clue is not yet published. It will appear here when released by the admin.</p>
            <div style={{marginTop:12}}>
              <button className="button" onClick={handlePublish}>Publish Clue (Admin)</button>
            </div>
          </div>
        ) : (
          <div>
            <p className="small">{meta.clue}</p>
            <div style={{marginTop:12}}>
              <h4>Download evidence</h4>
              {meta.pdfs.map((p,i)=> (
                <a key={i} className="pdf-link" href={CONFIG.PDF_BASE + p} target="_blank">{p}</a>
              ))}
            </div>

            <div style={{marginTop:12}}>
              <h4>Submit your answer</h4>
              <p className="small">Use the <a href="/register">Puzzle Submission form</a> to submit answers. Enter Puzzle Code: D{day}</p>
            </div>

            <div style={{marginTop:12}}>
              <button className="button" onClick={()=>setShowAnswer(!showAnswer)}>{showAnswer ? 'Hide' : 'Show'} Answer (Admin)</button>
              {showAnswer && (
                <div style={{marginTop:12,background:'#fff',padding:12,borderRadius:8}}>
                  <h4>Answer & Facilitator Notes</h4>
                  <AnswerBlock day={day} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function AnswerBlock({day}){
  const data = {
    '1':{
      answer: 'Day 1: The complaint alleges wrongful blocking and possible demand. This qualifies for vigilance scrutiny. Action: Register complaint, preliminary scrutiny, call for IA.'
    },
    '2':{
      answer: 'Day 2: IO found statements recorded by non-gazetted officer and delay in seizure (>48 hrs). These are procedural lapses. No evidence of bribe.'
    },
    '3':{
      answer: 'Day 3: Preliminary findings: trader misdeclared goods (supports customs action). Officer committed procedural lapses. Recommendation: Minor penalty proceedings under Rule 16.'
    },
    '4':{
      answer: 'Day 4: Charge memo prepared. Minor penalties (censure, withholding increments) vs major penalties (dismissal). Follow CCS (CCA) Rules.'
    },
    '5':{
      answer: 'Day 5: Final order: Officer censured. Lesson: Even absent corruption, procedural lapses can attract penalty and affect promotions. File closed; recommendations forwarded.'
    }
  }
  return (
    <div>
      <p className="small">{data[day].answer}</p>
      <p className="small"><strong>Facilitator notes:</strong> Use this to explain CVC complaint flow: registration → scrutiny → IO investigation (evidence collection, statements u/s 108 by gazetted officer) → IO report → DA action (disciplinary proceedings) → final order. Emphasise separation of vigilance vs service matters.</p>
    </div>
  )
}
