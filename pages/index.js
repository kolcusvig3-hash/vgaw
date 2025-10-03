import Link from 'next/link'
import { CONFIG } from '../config'


export default function Home(){
  return (
    <div>
      <div className="card">
        <h2>Welcome — Integrity Mystery (Vigilance Awareness Week 2025)</h2>
        <p><strong>Registration will be open till 26.10.2025 (Sunday).</strong></p>
        <p className="small">This microsite hosts the online version of the Integrity Mystery. Teams may register, receive daily clues, and submit answers through the Google Forms embedded in the Register and Submission pages.</p>
        {/* <p className="small">Admin: use the Day pages to publish clues in sequence. Each Day page contains the clue, the sample PDFs and an "Answer" section (admin-only toggle).</p> */}
        <div style={{marginTop:12}}>
          <Link href="/register" className="button">Register</Link>
          <Link href="/submit" className="button" style={{marginLeft:8}}>Submit Answers</Link>
          <Link href="/leaderboard" className="button" style={{marginLeft:8}}>View Leaderboard</Link>
        </div>
      </div>
      <div className="grid">
        <div>
          <div className="card">
            <h3>How it works</h3>
            <ol>
              <p>
                 Everyday from 27.10.2025 to 31.10.2025 at 12 noon a mystery will appear. 
                 Participants must answer within <strong>2 minutes</strong> after seeing the Question. 
                 The earlier you submit the answer, the better the marks for promptness. 
                 Marks will be awarded for <em>promptness</em>, <em>correctness</em>, and <em>writing fluidity</em>. 
                 Quotations, rules/acts/case laws will fetch additional marks.
              </p>
            </ol>
          </div>
        </div>

        <aside>
          <div className="card">
            <h3>Admin helper</h3>
            <p className="small">To publish a clue: open the Day page and click "Publish Clue". Use the Admin password.</p>
          </div>

          <div className="card">
            <h3>Contact</h3>
            <p className="small">Vigilance Unit — Kolkata Customs<br/>Email: vigilance.kol@nic.in </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
