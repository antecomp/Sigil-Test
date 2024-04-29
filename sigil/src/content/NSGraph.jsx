import React, {useState, useEffect, useCallback} from "react";
import {root} from '~/static/NSMap';
import '~/styles/NSGraph.css'
import Node from "../components/NSGraph/Node";

import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import ConnectionPrompt from "~/components/NSGraph/ConnectionPrompt";

const NSGraph = () => {

	const acceptTest = () => {
		console.log('accept')
	}

	const denyTest = () => {
		console.log('deny')
	}


	const [nodeAcceptMethod, setNodeAcceptMethod] = useState(() => acceptTest)
	const [nodeDenyMethod, setNodeDenyMethod] = useState(() => denyTest)
	const [showConfirmation, setShowConfirmation] = useState(true);


	const triggerNewConfirmation = (acceptMethod, denyMethod) => {
		setNodeAcceptMethod(() => acceptMethod);
		setNodeDenyMethod(() => denyMethod);
		setShowConfirmation(true);
	}


	const Controls = () => {
		const {resetTransform } = useControls();
	  
		return (
		  <div className="ZoomTools">
			<button onClick={() => resetTransform()}>y</button>
		  </div>
		);
	  };
	


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
		<div className="NSTracerWindow">

			{ showConfirmation &&
				<ConnectionPrompt
					acceptMethod={nodeAcceptMethod}
					denyMethod={nodeDenyMethod}
					showStateSttr={setShowConfirmation}
				/>
			}

			<TransformWrapper
				 initialScale={1}
				 initialPositionX={0}
				 initialPositionY={0}
				 doubleClick={{disabled: true}}
			>
				<Controls />
				<TransformComponent>
					<svg className="NSGraph" width={7650} height={450}>
						<Node 
							depth={0} 
							expandedNodes={expandedNodes} 
							setExpandedNodes={setExpandedNodes} 
							triggerNewConfirmation={triggerNewConfirmation}
							{...root}  
						/>
					</svg>
				</TransformComponent>
			</TransformWrapper>
		</div>
	)

}

export default NSGraph;