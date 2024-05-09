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

import svalinn from '~/artwork/usrhead.png'

const TestNotif = ({closeToast, toastProps, title, msg}) => {
  return (
    <div className='messageNotif'>
      <img src={svalinn} alt="" />
      <div>
        <h3>{title}</h3>
        {msg}
      </div>
    </div>
  )
}

const PlaceHolderNotifProps = {
  title: "Svalinn",
  msg: "What do you think of the new interface buddy?"
}

function App() {

  const notify = () => {
    /*toast(<TestNotif />, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    }); */
    toast(<TestNotif {...PlaceHolderNotifProps} />, {transition: Slide})
    setTimeout(() => {
      toast(<TestNotif {...PlaceHolderNotifProps} msg="I personally think it looks good :)" />, {transition: Slide})
    }, 1500)
  }

  return (
    <>
      <div className="App" id='window'>


        {/* <BattleCon/> */}

        <NSGraph />
        <button onClick={notify}>Notify!</button>
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
