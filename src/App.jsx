import { useEffect } from 'react'
import './App.css'
import Game from './components/Game.jsx'
import ReactGA from 'react-ga4';

const TRACKING_ID = "G-YMH7DCKDJG";
ReactGA.initialize(TRACKING_ID);

function App() {
    useEffect(() => {
        ReactGA.send("pageview");
      }, []);
  return (
    <>
    <Game />
    </>
  )
}

export default App
