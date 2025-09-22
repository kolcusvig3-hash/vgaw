import Link from 'next/link'
import { CONFIG } from '../config'

export default function Home(){
  return (
    <div>
      <div className="card">
        <h2>Welcome — Integrity Mystery (Vigilance Awareness Week 2025)</h2>
        <p className="small">This microsite hosts the online version of the Integrity Mystery. Teams may register, receive daily clues, and submit answers through the Google Forms embedded in the Register and Submission pages.</p>
        <p className="small">Admin: use the Day pages to publish clues in sequence. Each Day page contains the clue, the sample PDFs and an "Answer" section (admin-only toggle).</p>
        <div style={{marginTop:12}}>
          <Link href="/register" className="button">Register / Submit Answers</Link>
          <Link href="/leaderboard" className="button" style={{marginLeft:8}}>View Leaderboard</Link>
        </div>
      </div>
      <div className="grid">
        <div>
          <div className="card">
            <h3>How it works</h3>
            <ol>
              <li>One member registers the team via the registration form.</li>
              <li>Each morning, a new clue is published on the Day X page by an Admin.</li>
              <li>Teams solve the clue and submit answers via the Puzzle Submission form.</li>
              <li>Moderators review submissions, award points, leaderboard updates automatically via the published sheet.</li>
              <li>Final day: winners will be announced here and on the Winners page.</li>
            </ol>
          </div>

          <div className="card">
            <h3>Sample PDFs included</h3>
            <p className="small">Place your official sample PDFs in <code>/public/pdfs/</code> and they will be available for download here.</p>
            <a className="pdf-link" href="/pdfs/complaint.pdf" target="_blank">Download: Complaint Letter (complaint.pdf)</a>
            <a className="pdf-link" href="/pdfs/io_note.pdf" target="_blank">Download: IO Note (io_note.pdf)</a>
            <a className="pdf-link" href="/pdfs/prelim_report.pdf" target="_blank">Download: Preliminary Findings (prelim_report.pdf)</a>
            <a className="pdf-link" href="/pdfs/charge_memo.pdf" target="_blank">Download: Charge Memo (charge_memo.pdf)</a>
            <a className="pdf-link" href="/pdfs/final_order.pdf" target="_blank">Download: Final Order (final_order.pdf)</a>
          </div>
        </div>

        <aside>
          <div className="card">
            <h3>Admin helper</h3>
            <p className="small">To publish a clue: open the Day page and click "Publish Clue". Use the Admin password stored only in your browser prompt. This is a demo — secure admin on production.</p>
            <p className="small">Config: edit <code>config.js</code> with your Google Forms & Sheets URLs.</p>
          </div>

          <div className="card">
            <h3>Contact</h3>
            <p className="small">Vigilance Unit — Kolkata Customs<br/>Email: vigilance.kol@nic.in (placeholder)</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
