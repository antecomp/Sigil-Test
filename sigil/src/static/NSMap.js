export const root = {
	id: "local.user",
	dx: 5,
	dy: 2,
	children: [
		{
			id: "Slopzone",
			dx: 2,
			dy: 0,
		},
		{
			id: "Soyzone",
			dx: 1,
			dy: 2,
			children: [
				{
					id: "cum",
					dy: 1,
					dx: 3
				},
				{
					id: "megacum",
					dy: 2.5,
				},
				{
					id: "slopSEX",
					dy: 3,
					dx: 0
				}
			]
		},
		{
			id: "Larpzone",
			dx: -2,
			dy: 3,
			children: [{
				id: "Hyperlarp",
				dx: 0,
				dy: 1,
				children: [{
					id: "Larpa"
				}]
			}]
		}
	]
}