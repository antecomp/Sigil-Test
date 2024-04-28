import React, {useState, useEffect, useCallback} from "react";
import '~/styles/MapNode.css'

const Node = ({id, children}) => {

	const [showChildren, setShowChildren] = useState(false);
	const handleClick = useCallback(() =>  {
		setShowChildren(!showChildren)
	}, [showChildren, setShowChildren])

	return(
		<div className="mapNode">
			<h5 onClick={handleClick}>{id}</h5>
			<div style={{marginLeft:'20px'}}>
				{showChildren && (children ?? []).map((nodeProps) => 
					<Node{...nodeProps}/>
				)}
			</div>
		</div>
	)
}

export default Node;