import React from "react";
import Modal from "./Modal";
import BattleCon from "~/content/BattleCon"

const TestViewer = () => {
	return (<button onClick={() => Modal.open(BattleCon, {closable: false})}>LAUNCH BATTLECON</button>)
}

export default TestViewer;