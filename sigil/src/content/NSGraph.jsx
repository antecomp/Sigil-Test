import React, {useState, useEffect, useCallback} from "react";
import {root} from '~/static/NSMap';
import '~/styles/NSGraph/NSGraph.css'
import Node from "../components/NSGraph/Node";

import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import ConnectionPrompt from "~/components/NSGraph/ConnectionPrompt";
import useNSGraphStore from "~/store.js";

const NSGraph = () => {

	const [nodeAcceptMethod, setNodeAcceptMethod] = useState(null)
	const [nodeDenyMethod, setNodeDenyMethod] = useState(null)
	const [showConfirmation, setShowConfirmation] = useState('');
	const [confDetails, setConfDetails] = useState({})


	const triggerNewConfirmation = (acceptMethod, denyMethod, dest, details) => {
		setNodeAcceptMethod(() => acceptMethod);
		setNodeDenyMethod(() => denyMethod);
		setShowConfirmation(dest);
		setConfDetails(details);
	}


	const Controls = () => {
		const {resetTransform } = useControls();
	  
		return (
		  <div className="ZoomTools">
			<button onClick={() => resetTransform()}>y</button>
		  </div>
		);
	  };

	  const expandedNodes = useNSGraphStore((state) => state.expandedNodes)

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
					<svg className="NSGraph" width={7650} height={450}>
						<Node 
							depth={0} 
							expandedNodes={expandedNodes} 
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