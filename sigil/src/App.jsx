import '~/styles/Base.css'
import BattleCon from '~/content/BattleCon';
import {root} from '~/static/NSMap';
import Node from '~/content/Node';
import { useEffect, useState } from 'react';

function App() {

// Localstorage Retreive Test, Hopefully move to a state management save system thing????
  const [expandedNodes, setExpandedNodes] = useState(() => {
    const saveExpandedNodes = JSON.parse(localStorage.getItem("expandedNodes")) || [];
    return saveExpandedNodes;
  });



  // Listen for any change and save...
	useEffect(() => {
		console.log("localStorage Save called")
		localStorage.setItem("expandedNodes", JSON.stringify(expandedNodes));
	}, [expandedNodes])



  return (
    <div className="App" id='window'>

    
    <BattleCon/>

    <Node depth={0} expandedNodes={expandedNodes} setExpandedNodes={setExpandedNodes} {...root}  />

    </div>
  );
}

export default App;
