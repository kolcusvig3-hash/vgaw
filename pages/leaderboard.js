import { CONFIG } from '../config'

export default function Leaderboard(){
  return (
    <div>
      <div className="card">
        <h2>Live Leaderboard</h2>
        <p className="small">The leaderboard is published from the event Google Sheet. Moderators must publish the sheet to the web and paste the published URL in config.js</p>
        <div style={{height:800}}>
          <iframe src={CONFIG.LEADERBOARD_PUBLISHED_URL} width="100%" height="800" frameBorder="0">Loading…</iframe>
        </div>
      </div>
    </div>
  )
}
