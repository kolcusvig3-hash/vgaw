import '../styles.css'
import { CONFIG } from '../config'

export default function App({ Component, pageProps }){
  return (
    <div>
      <header className="topbar">
        <div className="wrap">
          <h1>{CONFIG.SITE_TITLE}</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/register">Register</a>
            <a href="/leaderboard">Leaderboard</a>
            <a href="/day/1">Day 1</a>
            <a href="/day/2">Day 2</a>
            <a href="/day/3">Day 3</a>
            <a href="/day/4">Day 4</a>
            <a href="/day/5">Day 5</a>
            <a href="/winner">Winners</a>
          </nav>
        </div>
      </header>
      <main className="wrap">
        <Component {...pageProps} />
      </main>
      <footer className="wrap footer">This is a prototype site for Vigilance Awareness Week. Replace PDFs in /public/pdfs/ with official sample PDFs.</footer>
    </div>
  )
}
