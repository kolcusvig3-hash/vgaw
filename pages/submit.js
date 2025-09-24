import { CONFIG } from '../config'

export default function Submit(){
  return (
    <div>
        <div className="card">
        <h3>Submit Puzzle Answers</h3>
        <p className="small">Use this form to submit answers for any day's clue. Ensure your Team Name matches registration.</p>
        <div style={{height:700}}>
          <iframe src={CONFIG.SUBMISSION_FORM_URL} width="100%" height="700" frameBorder="0">Loading…</iframe>
        </div>
      </div>
    </div>
  )}