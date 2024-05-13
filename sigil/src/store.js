// Global State Through Zustand.
import { create, useStore } from "zustand";
import { persist } from 'zustand/middleware';


// Eventually move this to a seperate file where other defaults will probably be stored.
const NSGraphStoreDefault = {
	expandedNodes: []
}


// Todo, slice this up, with partialize for persisting whats needd.
// Ref: https://docs.pmnd.rs/zustand/guides/slices-pattern
// https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#partialize


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