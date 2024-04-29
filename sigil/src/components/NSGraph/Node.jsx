import classNames from "classnames";
import React, {useState, useEffect, useCallback} from "react";

const Node = ({id, children, depth, expandedNodes, setExpandedNodes, dx = 1, dy = 1, parentCoords = {x:0, y:0}, triggerNewConfirmation}) => {

	// move to a seperate consts file at some point I think. Propping these feels stupid tho
	const radius = 10;
	const offsetMultipler = 32;

	const acceptCall = () => {
		console.log(`accept called from ${id}`)
		setExpandedNodes([...expandedNodes, id]);
	}

	const denyCall = () => {
		console.log(`deny called from ${id}`)
	}

	const handleClick = useCallback(() => {
		if(expandedNodes.includes(id)) { // collapse, delete later as the node will expansions will be perm in the future.
			setExpandedNodes(expandedNodes.filter(nodeID => nodeID !== id));
		} else { // expand
			triggerNewConfirmation(acceptCall, denyCall)
			//setExpandedNodes([...expandedNodes, id]);
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

	const expandedLeaf = isNodeExpanded && (children == null);

	const nodeClass = classNames({
		'mapNode': true,
		'visitedNode': isNodeExpanded,
		'expandedLeaf': expandedLeaf
	})

	return (
		<>
		{!(id == "local.user") && 
			<line 
				x1={linePoints.x1} 
				x2={linePoints.x2} 
				y1={linePoints.y1} 
				y2={linePoints.y2} 
				/* stroke="var(--fgc)" */
				strokeWidth={1} 
				className={nodeClass}
			/>
		}
			<g>
				<circle 
					/* className="mapNode" */
					r={radius}
					cx={coords.x}
					cy={coords.y}
					/* onClick={handleClick} */
					onMouseDown={handleClick}
					className={nodeClass}
				/>
				{expandedLeaf &&
					<text className="exlText" x={coords.x} y={coords.y + radius + 10} textAnchor="middle">NO ROUTE</text>
				}
			</g>
			{isNodeExpanded && (children ?? []).map((nodeProps) =>
				<Node
					key={`id - ${Math.random()}`}
					depth={nextDepth}
					expandedNodes={expandedNodes}
					parentCoords={coords}
					setExpandedNodes={setExpandedNodes} // mmm recursion + prop drilling....
					triggerNewConfirmation={triggerNewConfirmation}
					{...nodeProps} // this spread op is only covering whats inside "children" in NSMap object.
				/>
			)}
		</>
	)

}

export default Node;