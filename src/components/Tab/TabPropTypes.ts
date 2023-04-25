export interface TabPropTypes {
	data: any[];
	active: number;
	onClick: (e: number) => void;
	onItemClick: (e: any) => void;
	onChange?: (e: any) => void;
}
export interface headPropTypes {
	id: string;
	icon: string;
	data: string;
	type: string;
	width?: number;
	wrap?: boolean;
	locked?: boolean;
	hidden?: boolean;
}
export interface bodyPropTypes {
	[key: string]: any;
}

export interface ItemPropTypes {
	type: string;
	name: string;
	data: {
		head: headPropTypes[];
		body: bodyPropTypes[];
	};
}
