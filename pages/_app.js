import '../styles.css'
import { CONFIG } from '../config'

export default function App({ Component, pageProps }){
  return (
    <div>
      <header className="topbar">
        <div className="wrap">
          <h1>{CONFIG.SITE_TITLE}</h1>
          <nav>
            <img src="/logo/customs.jpg" alt="Kolkata Custom Logo" className="logo" />
            <a href="/" style={{marginLeft:24}}>Home</a>
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
      <footer className="wrap footer">
        <div className="footer-content">
          <span>© Developed with the help of OneByZeroBiz.</span>
          <img src="/logo/onebyzerobiz.jpeg" alt="OneByZeroBiz Logo" className="logo" />
        </div>
      </footer>
    </div>
  )
}
