import { toast, Slide } from "react-toastify";
import { notify } from "../../App";
import ExampleNotif from "../../components/Toast/exampleNotif";

const fuckOff = () => {
	toast('SYSTEM: VI-LINK neural connection established.', {transition: Slide})
}

const exampleScene = [
	{
		text: `"I found a strange cache today"`,
		color: "yellow"
	},
	{
		text: `Svalinn places a small diskette on the table`,
		color: "gray",
		style: {fontStyle: "italic"}
	},
	{
		text: `"what's strange about it?"`,
		color: "teal"
	},
	{
		text: `"I looked up the owners VI-LINK address"`,
		color: "yellow"
	},
	{
		text: `"It's still online."`,
		color: "yellow"
	},
	{
		text: `"And it has been for 10 years straight."`,
		color: "yellow"
	},
	{
		text: `"How is that even possible?"`,
		color: "teal"
	},
	{
		text: `"I don't know. Ready to dive in and find out?"`,
		color: "yellow"
	},
	{
		text: `You pull the VI-LINK cable off the table and bring it to your scalp`,
		color: "gray",
		style: {fontStyle: "italic"}
	},
	{
		text: `"I'm never ready."`,
		color: "teal"
	},
	{
		text: `The VI-LINK's magnetic ends pull the cable through your hand.`,
		color: "gray",
		style: {fontStyle: "italic"},
		postEvent: fuckOff
	},
	{
		text: `You feel the familiar buzz of it's connection, the confused cry of your neurons as the lies start pouring in.`,
		color: "gray",
		style: {fontStyle: "italic"},
		postEvent: function () {
			//console.log("This is triggered.")
			setTimeout(() => {notify()}, 500)
		}
	}
]

export default exampleScene;