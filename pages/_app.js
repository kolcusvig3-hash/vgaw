// pages/_app.js - The global wrapper
import { CONFIG } from '../config'
import '../styles.css'

export default function MyApp({ Component, pageProps }) {
  // The 'topbar' from your styles.css should be a recurring element here.
  // This ensures your header/navigation appears on ALL pages.
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
      
      <footer className="footer wrap" style={{paddingTop: '20px', textAlign: 'center'}}>
          <p className="small">&copy; {new Date().getFullYear()} {CONFIG.SITE_TITLE}. All Rights Reserved.</p>
      </footer>
    </>
  )
}