import React, {useState, useEffect, useCallback} from "react";
import '~/styles/MapNode.css'

const Node = ({id, children, depth, expandedNodes, setExpandedNodes}) => {

	const handleClick = useCallback(() => {
		if(expandedNodes.includes(id)) {
			setExpandedNodes(expandedNodes.filter(nodeID => nodeID !== id));
		} else {
			setExpandedNodes([...expandedNodes, id]);
		}
	}, [id, expandedNodes, setExpandedNodes]);

	const isNodeExpanded = expandedNodes.includes(id);
	const nextDepth = depth +1;

	return (
		<div className="mapNode">
			<h5 onClick={handleClick}>{id}</h5>
			<h6>{depth}</h6>
			<div style={{marginLeft:20}}>
				{isNodeExpanded && (children ?? []).map((nodeProps) => 
					<Node
						key={`id - ${Math.random()}`}
						depth={nextDepth}
						expandedNodes={expandedNodes}
						setExpandedNodes={setExpandedNodes} // mmm prop drilling....
						{...nodeProps} // this spread op is only covering whats inside "children" in NSMap object.
					/>
				)}
			</div>
		</div>
	)


}

export default Node;