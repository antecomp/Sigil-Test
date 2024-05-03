// Global State Through Zustand.
import { create, useStore } from "zustand";
import { persist } from 'zustand/middleware';


// Eventually move this to a seperate file where other defaults will probably be stored.
const NSGraphStoreDefault = {
	expandedNodes: ["sloppa"]
}


/* const useNSGraphStore = create((set) => ({
	...NSGraphStoreDefault,
	addNode: (id) => set((state) => ({expandedNodes: [...state.expandedNodes, id]})),
	removeNode: (id) => set((state) => ({expandedNodes: state.expandedNodes.filter(nodeID => nodeID !== id)}))
})) */

const useNSGraphStore = create(
	persist(
		(set) => ({
			...NSGraphStoreDefault,
			addNode: (id) => set((state) => ({expandedNodes: [...state.expandedNodes, id]})),
			removeNode: (id) => set((state) => ({expandedNodes: state.expandedNodes.filter(nodeID => nodeID !== id)}))
		}), 
		{
			name: 'NSGraph-Storage'
		}
	)
)



// Load from localStorage
/* const storedExpandedNodes = localStorage.getItem("expandedNodes");
if (storedExpandedNodes) {
	console.log("zus load from localStorage")
	useNSGraphStore.setState({expandedNodes: JSON.parse(storedExpandedNodes)});
} */

export default useNSGraphStore;