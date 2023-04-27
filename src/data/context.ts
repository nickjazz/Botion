import { createContext } from "react";
import { nanoid } from "nanoid";
import {
	TabPropTypes,
	ItemPropTypes,
	headPropTypes,
	bodyPropTypes,
} from "../components/Tab/TabPropTypes";

const initId = nanoid();
const initData: any = [
	{ id: initId, data: "your first data", type: "string", width: 200 },
];
const initCol: any = [{ [initId]: "" }];

interface IFContent {
	editId?: string;
	dataDef?: bodyPropTypes[];
	colDef?: headPropTypes[];
	update?: (e: any) => void;
	updateEditId?: (e: any) => void;
	replaceBody?: (e: any) => void;
	replaceHead?: (e: any) => void;
	onRowAdd?: (e: any) => void;
	onClick?: (e: any) => void;
	colTypeList?: {
		[key: string]: any;
	};
	minColWidth?: number;
	mode?: string;
}

export const context = createContext<IFContent>({
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
