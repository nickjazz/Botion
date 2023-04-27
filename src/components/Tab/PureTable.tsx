import React, { useMemo, useEffect, useState, FC } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { nanoid } from "nanoid";

import {
	PureTableTabPropTypes,
	ItemPropTypes,
	headPropTypes,
	bodyPropTypes,
} from "./TabPropTypes";
import DisplayCol from "./colType/DisplayCol";

import TableView from "../TableView";
import { Provider } from "../../data/context";

const initalId = nanoid();
const inital: ItemPropTypes[] = [
	{
		type: "table",
		name: "Your First List",
		data: {
			head: [
				{
					id: initalId,
					icon: "AlignLeft",
					data: "column",
					type: "string",
					width: 200,
					wrap: true,
					locked: true,
				},
			],
			body: [{ [initalId]: "your first value" }],
		},
	},
];

const TabList: FC<PureTableTabPropTypes> = ({ data = [] }) => {
	const active = 0;

	const [tabData, setTabData] = useState<ItemPropTypes[]>();
	const [colDef, setColDef] = useState<headPropTypes[]>();
	const [dataDef, setDataDef] = useState<bodyPropTypes[]>();
	const [editId, setEditId] = useState(null);

	useEffect(() => {
		if (isEmpty(data)) {
			console.warn("[Botion] your data is empty.");
			setTabData(inital);
			return;
		}
		setTabData(data);
	}, [data]);

	useEffect(() => {
		const activeTab = get(tabData || data, [0, "data"]);
		const initalTab = get(tabData, [0, "data"]);

		setColDef(activeTab?.head?.length ? activeTab?.head : initalTab.head);
		setDataDef(activeTab?.body?.length ? activeTab?.body : initalTab.body);
	}, [tabData]);

	const value = useMemo(
		() => ({
			colDef,
			dataDef,
			editId,
			updateEditId: setEditId,
			replaceHead: setColDef,
			replaceBody: setDataDef,
			minColWidth: 800,
			mode: "display",
			colTypeList: {
				display: DisplayCol,
			},
		}),
		[colDef, dataDef, editId]
	);

	return (
		<Provider value={value}>
			<TableView />
		</Provider>
	);
};

export default TabList;
