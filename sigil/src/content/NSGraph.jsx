import React, {useState, useEffect, useCallback} from "react";
import {root} from '~/static/NSMap';
import '~/styles/NSGraph.css'

import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";

const NSGraph = () => {


	const Controls = () => {
		const {resetTransform } = useControls();
	  
		return (
		  <div className="ZoomTools">
			<button onClick={() => resetTransform()}>Fucking reset</button>
		  </div>
		);
	  };



	const Node = ({id, children, depth, expandedNodes, setExpandedNodes, dx = 1, dy = 1, parentCoords = {x:0, y:0}}) => {

		// move to a seperate consts file at some point I think. Propping these feels stupid tho
		const radius = 10;
		const offsetMultipler = 32;

		const handleClick = useCallback(() => {
			if(expandedNodes.includes(id)) {
				setExpandedNodes(expandedNodes.filter(nodeID => nodeID !== id));
			} else {
				setExpandedNodes([...expandedNodes, id]);
			}
		}, [id, expandedNodes, setExpandedNodes]);
	
		const isNodeExpanded = expandedNodes.includes(id);
		const nextDepth = depth +1;

		const coords = {};
		coords.x = parentCoords.x + (offsetMultipler * dx);
		coords.y = parentCoords.y + (offsetMultipler * dy);

		const linePoints = {
			x1: parentCoords.x,
			x2: coords.x,
			y1: parentCoords.y + radius,
			y2: coords.y
		};
		
		// Draw line on sides when we explicitely tell the graph to not go down.
		if(dy <= 0) {
			linePoints.y1 = parentCoords.y
			linePoints.x1 = parentCoords.x + Math.sign(dx)*radius
		}
		
	
		return (
			<>
			{!(id == "local.user") && 
				<line 
					x1={linePoints.x1} 
					x2={linePoints.x2} 
					y1={linePoints.y1} 
					y2={linePoints.y2} 
					stroke="var(--fgc)" 
					strokeWidth={1} 
				/>
			}
				<circle 
					className="mapNode"
					r={radius}
					cx={coords.x}
					cy={coords.y}
					onClick={handleClick}
					stroke="var(--fgc)"
					/*fill={children ? 'blue' : 'black'} */

				/>
				{isNodeExpanded && (children ?? []).map((nodeProps) => 
					<Node
						key={`id - ${Math.random()}`}
						depth={nextDepth}
						expandedNodes={expandedNodes}
						parentCoords={coords}
						setExpandedNodes={setExpandedNodes} // mmm recursion + prop drilling....
						{...nodeProps} // this spread op is only covering whats inside "children" in NSMap object.
					/>
				)}
			</>
		)

	}


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
			<TransformWrapper
				 initialScale={1}
				 initialPositionX={0}
				 initialPositionY={0}
			>
				<Controls />
				<TransformComponent>
					<svg className="NSGraph" width={7650} height={450}>
						<Node depth={0} expandedNodes={expandedNodes} setExpandedNodes={setExpandedNodes} {...root}  />
					</svg>
				</TransformComponent>
			</TransformWrapper>
		</div>
	)

}

export default NSGraph;