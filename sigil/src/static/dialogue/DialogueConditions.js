//this stuff will be different for each dialogue file. it is meant for that specific dialogue file's conditions. maps someCondition to a function that returns true or false.
import useNSGraphStore from "~/store";

const dialogueTestConditionMap = {
    someCondition: function() {
        const expandedNodes = useNSGraphStore.getState().expandedNodes //automatically grabs slop from gamestate
        console.log(expandedNodes)
        return Math.random() < 0.5
    }
    
}

export default dialogueTestConditionMap