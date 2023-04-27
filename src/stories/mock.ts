const initValue = [
	{
		aaaa: "fafsfasf",
		bbbb: "Mon",
		cccc: false,
		dddd: "good song",
		eeee: "what happen",
	},
	{
		aaaa: "hello",
		bbbb: "Mon",
		cccc: true,
		dddd: "this is a test",
		eeee: "12345",
	},
	{
		aaaa: "apple",
		bbbb: "orange",
		cccc: false,
		dddd: "banana",
		eeee: "grape",
	},
	{
		aaaa: "John",
		bbbb: "Doe",
		cccc: true,
		dddd: "123 Main Street",
		eeee: "johndoe@example.com",
	},
	{
		aaaa: "red",
		bbbb: "green",
		cccc: true,
		dddd: "blue",
		eeee: "yellow",
	},
	{
		aaaa: "Monday",
		bbbb: "Tuesday",
		cccc: false,
		dddd: "Wednesday",
		eeee: "Thursday",
	},
	{
		aaaa: "pizza",
		bbbb: "Wed",
		cccc: true,
		dddd: "salad",
		eeee: "bread",
	},
	{
		aaaa: "dog",
		bbbb: "Wed",
		cccc: true,
		dddd: "bird",
		eeee: "fish",
	},
	{
		aaaa: "Tokyo",
		bbbb: "New York",
		cccc: false,
		dddd: "Paris",
		eeee: "London",
	},
	{
		aaaa: "summer",
		bbbb: "winter",
		cccc: true,
		dddd: "spring",
		eeee: "autumn",
	},
];

const mockOptions = [
	{ label: "Monday", value: "Mon" },
	{ label: "Thusday", value: "Tue" },
	{ label: "Wednesday", value: "Wed" },
];

const initData = [
	{
		id: "aaaa",
		icon: "AlignLeft",
		data: "column",
		type: "string",
		width: 200,
		wrap: true,
		locked: true,
	},
	{
		id: "bbbb",
		icon: "AlignCenter",
		data: "column",
		type: "select",
		options: [...mockOptions],
		width: 300,
		wrap: false,
		locked: false,
	},
	{
		id: "cccc",
		icon: "AlignRight",
		data: "row",
		type: "checkbox",
		width: 150,
		wrap: true,
		locked: false,
	},
	{
		id: "dddd",
		icon: "Bold",
		data: "text",
		type: "string",
		width: 250,
		wrap: false,
		locked: true,
	},
	{
		id: "eeee",
		icon: "Italic",
		data: "date",
		type: "string",
		width: 200,
		wrap: true,
		locked: false,
	},
];
const data = [
	{
		type: "table",
		name: "just a list",
		data: {
			head: initData,
			body: [...initValue],
		},
	},
	{
		type: "table",
		name: "Member",
		data: {
			head: [],
			body: [],
		},
	},
	{
		type: "table",
		name: "Card",
		data: {
			head: [],
			body: [],
		},
	},
	{
		type: "table",
		name: "Wid",
		data: {
			head: [],
			body: [],
		},
	},
];

export { data, initValue };
