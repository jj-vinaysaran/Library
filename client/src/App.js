import './App.css';
import Home from './Components/Home/Home';
import Inventory from './Components/Inventory/Inventory';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/invent' element={<Inventory/>}/>
        </Routes>
      </Router>

      
    </div>
  );
}

export default App;
