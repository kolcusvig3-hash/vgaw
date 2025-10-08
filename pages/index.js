import Link from 'next/link'
import { CONFIG } from '../config'


export default function Home(){
  return (
    <div>
      <div className="card">
        <h2>Welcome — Integrity Mystery (Vigilance Awareness Week 2025)</h2>
        <p><strong>Registration will be open till 25.10.2025 (Sunday).</strong></p>
        <p className="small">One may register using Register tab of the website, and get their registration ID on mail. After that find daily mystery stories on the website from 27.10.2025 - 31.10.2025, and submit answers through the website.</p>
      </div>
      <div className="grid">
        <div>
          <div className="card">
            <h3>How it works</h3>
            <ol>
              <p>
                 Everyday from 27.10.2025 to 31.10.2025 at 12 noon a mystery will appear and will be available tille 03 PM. 
                 Participants must has to read the story and then click on the show question.
                 And then answer within <strong>2 minutes 30 Minutes</strong> after seeing the Question. 
                 The earlier you submit the answer, the better the marks for promptness. 
                 Use of AI is strictly prohibited, it will be checked and <strong>negative marking</strong> will be awarded if the answers are found to be AI generated.
                 Marks will be awarded for <em>promptness</em>, <em>correctness</em>, and <em>writing fluidity</em>. 
                 Quotations, rules/acts/case laws will fetch <strong>additional marks</strong>.
              </p>
            </ol>
          </div>
        </div>

        <aside>
          <div className="card">
            <h3>Contact</h3>
            <p className="small">Vigilance Unit — Kolkata Customs<br/>Email: vigilance.kol@nic.in </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
