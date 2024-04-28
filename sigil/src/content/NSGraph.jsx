import React, {useState, useEffect, useCallback} from "react";
import {root} from '~/static/NSMap';

const NSGraph = () => {

	const Node = ({id, children, depth, expandedNodes, setExpandedNodes, dx = 0, dy = 0, parentCoords = {x:50, y:50}, siblingIndex = 0}) => {

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
		coords.x = parentCoords.x + (45 * siblingIndex);
		coords.y = parentCoords.y + 45;
	
		return (
			<>
				<circle 
					className="mapNode"
					r={20}
					cx={coords.x}
					cy={coords.y}
					onClick={handleClick}
					stroke="white"
					fill={children ? 'blue' : 'black'}
				/>

				{isNodeExpanded && (children ?? []).map((nodeProps, index) => 
					<Node
						key={`id - ${Math.random()}`}
						depth={nextDepth}
						expandedNodes={expandedNodes}
						siblingIndex={index}
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
		<div className="NSGraphCon">
			<svg className="NSGraph" width={500} height={500}>
				<Node depth={0} expandedNodes={expandedNodes} setExpandedNodes={setExpandedNodes} {...root}  />
			</svg>
		</div>
	)

}

export default NSGraph;