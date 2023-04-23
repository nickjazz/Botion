export interface TabPropTypes {
	data: any[];
	active: number;
	onClick: (e: number) => void;
	onItemClick: (e: any) => void;
	onChange?: (e: any) => void;
}
