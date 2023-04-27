export interface TabPropTypes {
	data: any[];
	active: number;
	setting?: boolean;
	mode?: "edit" | "display";
	onClick: (e: number) => void;
	onItemClick: (e: any) => void;
	onChange?: (e: any) => void;
}

export interface PureTableTabPropTypes {
	data: any[];
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
