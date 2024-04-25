import './styles/App.css';
import Sigil from './components/sigil';
import { runeData } from './static/runeData';
import StatusTerm from './components/StatusTerm';

function App() {

  const testMessages = [{
      icon: "#",
      content: "this is a test"
    },
    {
      icon: ">",
      content: "this is another test"
    }
  ]


  return (
    <div className="App" id='window'>
      {/* will be different in the future, esp if I have a party system but this is how youll pass what runes to use to that comp. */}
     <Sigil radius={90} runeData={runeData.player} />

    <StatusTerm messages={testMessages} />


    </div>
  );
}

export default App;
