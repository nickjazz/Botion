import { createContext } from "react";
import { nanoid } from "nanoid";

const initId = nanoid();
const initData: any = [
	{ id: initId, data: "your first data", type: "string", width: 200 },
];
const initCol: any = [{ [initId]: "" }];

export const context = createContext({
	editId: null,
	dataDef: initCol,
	colDef: initData,
	update: (e: any) => {},
	updateEditId: (e: any) => {},
	replaceBody: (e: any) => {},
	replaceHead: (e: any) => {},
	onRowAdd: (e: any) => {},
	onClick: (e: any) => {},
	colTypeList: {},
	minColWidth: 800,
	mode: "edit",
});

export const Provider = context.Provider;
