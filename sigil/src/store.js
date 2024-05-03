// Global State Through Zustand.
import { create, useStore } from "zustand";
import { persist } from 'zustand/middleware';


// Eventually move this to a seperate file where other defaults will probably be stored.
const NSGraphStoreDefault = {
	expandedNodes: []
}


const useNSGraphStore = create(
	persist(
		(set) => ({
			...NSGraphStoreDefault,
			addNode: (id) => set((state) => ({expandedNodes: [...state.expandedNodes, id]})),
			removeNode: (id) => set((state) => ({expandedNodes: state.expandedNodes.filter(nodeID => nodeID !== id)}))
		}), 
		{
			name: 'NSGraph-Storage' // the key in localStorage
		}
	)
)


export default useNSGraphStore;