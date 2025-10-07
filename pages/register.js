import { CONFIG } from '../config'

export default function Register(){
  return (
    <div>
      <div className="card">
        <h2>Register Yourself</h2>
        <p className="small">Register with mail id, phone number, phone number, and section name. After registration you will get a registration id, keep that handy for future use. Use the Reg. code Answer Submission form to submit answers.</p>
        <div style={{height:800}}>
          <iframe src={CONFIG.REGISTRATION_FORM_URL} width="100%" height="800" frameBorder="0">Loading…</iframe>
        </div>
      </div>
    </div>
  )
}
