import './App.css';
import {BrowserRouter as Router,Routes,Route, UNSAFE_RouteContext } from 'react-router-dom'
import Home from "./pages/Home"
import Invester from './pages/Invester'
import Startup from './pages/Startup';
import StartupDashboard from './pages/StartupDashboard'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element= {<Home/>}/>
          <Route path = "/Invester" element={<Invester/>}/>
          <Route path = "/Startup" element = {<Startup/>}/>
          <Route path = "/StartupDashboard" element ={<StartupDashboard/>}/>
          <Route path="*" element ={<h1>no page found</h1>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
