import '~/styles/Base.css'
import BattleCon from '~/content/BattleCon';
import {root} from '~/static/NSMap';
import Node from '~/content/Node';
import { useEffect, useState } from 'react';
import NSGraph from './content/NSGraph';

function App() {
  
  return (
    <div className="App" id='window'>

    
    {/* <BattleCon/> */}

    <NSGraph />

    </div>
  );
}

export default App;
