import '~/styles/Base.css'
import { useEffect, useState } from 'react';
import NSGraph from './content/NSGraph';
import { ModalContainer } from 'react-modal-global';
import Modal from "~/components/Modal/Modal.jsx"
import "react-modal-global/styles/modal.scss" // Imports essential styles for `ModalContainer`.
import "~/styles/Modal/ModalOverrides.css"

function App() {

  return (
    <>
    <div className="App" id='window'>

    
      {/* <BattleCon/> */}

      <NSGraph />
    </div>
    <ModalContainer controller={Modal}/>
    </>
  );
}

export default App;
