import '~/styles/Base.css'
import { useEffect, useState } from 'react';
import NSGraph from './content/NSGraph';
import { ModalContainer } from 'react-modal-global';
import Modal from "~/components/Modal/Modal.jsx"
import "react-modal-global/styles/modal.scss" // Imports essential styles for `ModalContainer`.
import "~/styles/Modal/ModalOverrides.css"

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '~/styles/extra/Toastify.css'

import OverlayScene from './content/OverlayScene';
import ExampleNotif from './components/Toast/exampleNotif';

import svalinn from '~/artwork/usrhead.png'

const PlaceHolderNotifProps = {
  title: "Svalinn",
  msg: "Wow this interface looks pretty bland right now.",
  img: svalinn
}

// Placeholder, exported as a test for other callers to invoke.
export const notify = () => {
  toast(<ExampleNotif {...PlaceHolderNotifProps} />, {transition: Slide})
  setTimeout(() => {
    toast(<ExampleNotif {...PlaceHolderNotifProps} msg="Games clearly far from being done :^)" />, {transition: Slide})
  }, 1500)
}

function App() {

  useEffect(() => {
    Modal.open(OverlayScene, {closable: false, file: `exampleScene`} )
  }, [])

  return (
    <>
      <div className="App" id='window'>


        {/* <BattleCon/> */}

        <NSGraph />
        <button onClick={notify}>Notify!</button>
        {/*  <button onClick={() => Modal.open(OverlayScene, {closable: false, file: `exampleScene`} )}>launch scene</button> */}
      </div>
      <ModalContainer controller={Modal} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
        closeButton={false}
        transition: Slide
      />
    </>
  );
}

export default App;
