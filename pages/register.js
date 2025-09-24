import { CONFIG } from '../config'

export default function Register(){
  return (
    <div>
      <div className="card">
        <h2>Register Your Team</h2>
        <p className="small">Register one team leader. After registration, use the Puzzle Submission form to submit answers.</p>
        <div style={{height:800}}>
          <iframe src={CONFIG.REGISTRATION_FORM_URL} width="100%" height="800" frameBorder="0">Loading…</iframe>
        </div>
      </div>
    </div>
  )
}
