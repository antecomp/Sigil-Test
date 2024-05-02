import classNames from "classnames";
import React, {useState, useEffect, useCallback} from "react";
import Modal from '~/components/Modal/Modal'
import BattleCon from "~/content/BattleCon";
import { actionMap } from "~/static/actionMap";

const Node = ({id, children, expandedNodes, setExpandedNodes, dx = 1, dy = 1, parentCoords = {x:0, y:0}, triggerNewConfirmation, action, actionProps, postConnect}) => {

	// move to a seperate consts file at some point I think. Propping these feels stupid tho
	const radius = 10;
	const offsetMultipler = 32;

	const nodeCallback = (result) => {
		console.log(result);
		console.log("this callback belongs to " + id)
	}

	const modalDefaults = {
		closable: false,
		nodeCallback: nodeCallback
	}

	const acceptCall = () => {
		//console.log(`accept called from ${id}`)
		setExpandedNodes([...expandedNodes, id]); /* eventually this will be moved to the nodeCallback handler, only expand when the callBack reports we should */
		/* Todo: Move this to a global state / state management thing */

		// Should this be passed to some sort of global handler? Feels like we'd just be dealing with forwarding more callback hell just to get psuedo-single responsibility...?
		switch (action) {
			case 'battle':
				Modal.open(BattleCon, {...modalDefaults, fileName: actionProps.fileName});
			break;
			case 'autoconnect':
				// eventually we will want to invoke any secondary calls that autoconnect may have (within actionProps)
			break;
			case 'cutscene':
				// Modal.open cutscene window, pass needed info (not implemented)
			break;
			// We can add any new type of interaction here...
		}

		// again, this should be moved / only invoked when we actually "connect" eventually
		// if you call this with a fucking useEffect I will explode you with my mind - past omni
		if (postConnect) {postConnect()}

	}

	const denyCall = () => {
		console.log(`connection cancelled for ${id}`)
	}

	const details = {
		prompt: actionMap[action].prompt
	}

	const handleClick = useCallback(() => {
		if(expandedNodes.includes(id)) { // collapse, delete later as the node will expansions will be perm in the future.
			setExpandedNodes(expandedNodes.filter(nodeID => nodeID !== id));
		} else { // expand (AKA "Connect")
			triggerNewConfirmation(acceptCall, denyCall, `${id}`, details)
			//setExpandedNodes([...expandedNodes, id]);
		}
	}, [id, expandedNodes, setExpandedNodes]);

	const isNodeExpanded = expandedNodes.includes(id);

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
		{!(id == "kestrel:home") && 
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
					onClick={handleClick}
					/* onMouseDown={handleClick} */
					className={nodeClass}
				/>
				{expandedLeaf &&
					<text className="exlText" x={coords.x} y={coords.y + radius + 10} textAnchor="middle">NO ROUTE</text>
				}
			</g>
			{isNodeExpanded && (children ?? []).map((nodeProps) =>
				<Node
					key={`id - ${Math.random()}`}
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