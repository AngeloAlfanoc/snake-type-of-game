import './App.scss'

import PlayField from './component/PlayField';
import React from 'react';

function App() {
  

    return ( 
     
      <div className="App">
        <div className="bounds">
        <PlayField/>
        </div>
      </div>
    
    );
}

export default App;