export const root = {
	id: "kestrel:home",
	dx: 5,
	dy: 2,
	children: [
		{
			id: "kestrel:phone",
			dx: 2,
			dy: 0,
		},
		{
			id: "kestrel:friends",
			dx: 1,
			dy: 2,
			children: [
				{
					id: "novacene:home",
					dy: 1,
					dx: 2.2
				},
				{
					id: "divi:home",
					dy: 2.5,
					dx: 1.5
				},
				{
					id: "jill:home",
					dy: 3,
					dx: 0
				}
			]
		},
		{
			id: "omnidisplay:network",
			dx: -2,
			dy: 3,
			children: [{
				id: "slopzone:network",
				dx: 0,
				dy: 1,
				children: [{
					id: "the slop module"
				}]
			}]
		}
	]
}