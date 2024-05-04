import React, {useState, useCallback, createContext} from "react";
import {root} from '~/static/NSMap';
import '~/styles/NSGraph/NSGraph.css'
import Node from "../components/NSGraph/Node";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import ConnectionPrompt from "~/components/NSGraph/ConnectionPrompt";

export const ConfirmationContext = createContext();

const NSGraph = () => {

	const [nodeAcceptMethod, setNodeAcceptMethod] = useState(null)
	const [nodeDenyMethod, setNodeDenyMethod] = useState(null)
	const [showConfirmation, setShowConfirmation] = useState('');
	const [confDetails, setConfDetails] = useState({})


	const triggerNewConfirmation = useCallback((acceptMethod, denyMethod, dest, details) => {
		setNodeAcceptMethod(() => acceptMethod);
		setNodeDenyMethod(() => denyMethod);
		setShowConfirmation(dest);
		setConfDetails(details);
	})


	const Controls = () => {
		const {resetTransform } = useControls();
	  
		return (
		  <div className="ZoomTools">
			<button onClick={() => resetTransform()}>y</button>
		  </div>
		);
	  };


	return (
		<div className="NSTracerWindow">

			{ showConfirmation &&
				<ConnectionPrompt
					acceptMethod={nodeAcceptMethod}
					denyMethod={nodeDenyMethod}
					showStateSttr={setShowConfirmation}
					dest={showConfirmation}
					details={confDetails}
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
				<ConfirmationContext.Provider value={{ triggerNewConfirmation }}>
					<svg className="NSGraph" width={7650} height={450}>
						<Node 
							{...root}  
						/>
					</svg>
				</ConfirmationContext.Provider>
				</TransformComponent>
			</TransformWrapper>
		</div>
	)

}

export default NSGraph;