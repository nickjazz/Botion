import { nanoid } from "nanoid";

const initId = () => nanoid();
const initHead = (name: string) => [
	{
		id: initId(),
		icon: "AlignLeft",
		data: name,
		type: "string",
		width: 200,
		wrap: true,
		locked: false,
	},
];

export { initHead };
