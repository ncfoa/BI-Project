import './App.css';
import Login from './components/login';
import { useState } from 'react';
import Recommandation from './components/recommandation';
import Review from './components/review';

function App() {
  const [yes,setYes] = useState(true) ;
  function handleYes(){
    setYes(!yes);
  }
  return (
    <div>
      {
        yes? <Login setYes={handleYes} />:<Review />
      }
    </div>
  );
}

export default App;
