// pages/_app.js - The global wrapper
import { CONFIG } from '../config'
import '../styles.css'

export default function MyApp({ Component, pageProps }) {
  // Define the full disclaimer text
  const DISCLAIMER_TEXT = `
    This website is a voluntary initiative created for the specific purpose of conducting the "Integrity Mystery" quiz during Vigilance Awareness Week ${new Date().getFullYear()}. 
    This platform is hosted on a third-party, non-government server and does not represent the official digital infrastructure of the Kolkata Customs, Customs Department, or the Government of India.
    Any personal information collected is gathered solely for the purposes of running the quiz, calculating scores, and internal event reporting. This data will not be shared with any external third parties and will be deleted or anonymized upon the conclusion of the event.
    The organizers are not responsible for any technical failures, data loss, or security issues that may arise from using this third-party hosting service. Participation is voluntary and at the user's own risk.
  `
  
  return (
    <>
      <div className="topbar">
        <div className="wrap">
          {/* Add a logo or relevant image here if you have one */}
          <h1>{CONFIG.SITE_TITLE}</h1>
          <nav>
            {/* Navigation links - these are your recurring elements */}
            <a href="/">Home</a>
            <a href="/register">Register</a>
            {/* <a href="/submit">Submit Answers</a> */}
            <a href="/leaderboard">Leaderboard</a>
            <a href="/winner">Winners</a>
            {/* CORRECTED LINK: Changed href from /test_day.js to the correct Next.js path /test_day */}
            <a href="/test_day">Daily Myestery</a> 
          </nav>
        </div>
      </div>
      
      {/* This is where the content of the current page (e.g., index.js or [day].js) gets rendered */}
      <div className="wrap">
        <Component {...pageProps} />
      </div>
      
      {/* MODIFIED FOOTER BELOW: Added Legal Disclaimer Section */}
      <footer className="footer wrap" style={{paddingTop: '20px', textAlign: 'center'}}>
          
          {/* Legal Notice Section - Using <details> for a collapsible section */}
          <div style={{maxWidth: '800px', margin: '10px auto', borderTop: '1px solid #ccc', paddingTop: '10px', fontSize: '0.9em'}}>
            <details>
              <summary style={{cursor: 'pointer', fontWeight: 'bold'}}>
                Important Legal Disclaimer & Data Privacy Notice
              </summary>
              <p style={{whiteSpace: 'pre-wrap', textAlign: 'left', padding: '10px 0'}}>
                {DISCLAIMER_TEXT}
              </p>
            </details>
          </div>

          <p className="small">&copy; {new Date().getFullYear()} {CONFIG.SITE_TITLE}. All Rights Reserved.</p>
          <p className="small"> Developed by Debjit Chakraborty </p>
      </footer>
    </>
  )
}