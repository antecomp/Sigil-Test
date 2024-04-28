import '~/styles/Base.css'
import BattleCon from '~/content/BattleCon';
import {root} from '~/static/NSMap';
import Node from '~/content/Node';

function App() {

  return (
    <div className="App" id='window'>

    
    <BattleCon/>

    <Node {...root}  />

    </div>
  );
}

export default App;
