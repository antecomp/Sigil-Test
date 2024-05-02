// Could I also move the Modal calls here or would that be too much of a hassle to try and coordinate info back...?
// Is there a goofy way to clone a function to change it's scope....????

export const actionMap = {
	autoconnect: {
		prompt: "NO DAEMONS DETECTED. SAFE TO PROCEED",
	},
	
	battle: {
		prompt: `STRONG DAEMONIC INFLUENCE DETECTED. \n PROCEED WITH EXTREME CAUTION.`
	},

	cutscene: {
		prompt: "UNABLE TO PROD CONNECTION NODE. PROCEED WITH CAUTION."
	}
}