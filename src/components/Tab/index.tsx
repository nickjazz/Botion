import React, { useMemo, useEffect, useRef, useState, FC } from "react";
import map from "lodash/map";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { Sliders } from "react-feather";
import cx from "classnames";
import { nanoid } from "nanoid";
import {
	TabPropTypes,
	ItemPropTypes,
	headPropTypes,
	bodyPropTypes,
} from "./TabPropTypes";
import { viewList } from "./config";
import StringCol from "./colType/StringCol";
import CheckBoxCol from "./colType/CheckBoxCol";
import SelectCol from "./colType/SelectCol";

import Drawer from "../Drawer";
import TableView from "../TableView";
import ListView from "../ListView";
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

const TabList: FC<TabPropTypes> = ({
	data = [],
	active = 0,
	onClick = (e: any) => {},
	onItemClick = (e: any) => {},
	onChange = (e: any) => {},
}) => {
	const [close, setClose] = useState(true);
	const parentEl = useRef<HTMLDivElement>(null);

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
		if (!tabData || !parentEl.current) return;
		const next = map(tabData, (x, index) => {
			if (!x || !x?.data?.head || !x?.data?.body) return x;
			if (index === active) {
				x.data.head = colDef;
				x.data.body = dataDef;
				return x;
			}
			return x;
		});
		setTabData(next);
		onChange(next);
	}, [dataDef, colDef]);

	useEffect(() => {
		const activeTab = get(tabData || data, [active, "data"]);
		setColDef(activeTab?.head);
		setDataDef(activeTab?.body);
	}, [active, tabData]);

	const handleToggleSetting = () => setClose((prev) => !prev);

	const handleTitleChange = (e) => {
		setTabData((prev) => {
			const next = map(prev, (x, i) => {
				if (i === active) x.name = e?.target?.value;
				return x;
			});
			return next;
		});
	};

	const handleUpdate = ({ index, keyIndex, value }) => {
		setDataDef((prev) => {
			const next = map(prev, (x, i) => {
				if (index === i) {
					return Object.assign({}, x, { [keyIndex]: value });
				}
				return x;
			});
			return next;
		});
	};

	const handleRowAdd = (e = {}) => {
		setDataDef((prev) => {
			const newRow = {};
			map(prev[0], (_, k) => {
				newRow[k] = e[k] || "";
			});
			const next = [...prev, newRow];
			return next;
		});
	};

	const handleChangeType = (e: string) => {
		setTabData((prev) => {
			return map(prev, (x, i) => {
				if (i === active) x.type = e;
				return x;
			});
		});
	};

	const handleHiddenClick = (e) => {
		setColDef((prev) => {
			return map(prev, (x) => {
				if (x.id === e.id) {
					x.hidden = !x.hidden;
				}
				return x;
			});
		});
	};

	const value = useMemo(
		() => ({
			colDef,
			dataDef,
			editId,
			update: handleUpdate,
			updateEditId: setEditId,
			replaceHead: setColDef,
			replaceBody: setDataDef,
			onRowAdd: handleRowAdd,
			onClick: onItemClick,
			minColWidth: 200,
			colTypeList: {
				string: StringCol,
				date: StringCol,
				checkbox: CheckBoxCol,
				select: SelectCol,
			},
		}),
		[colDef, dataDef, editId]
	);

	const activeObject = tabData?.[active] || data?.[active];
	const viewIs = activeObject?.type || "table";
	const pageviewList = {
		table: <TableView />,
		list: <ListView />,
	};

	const DisplayView = pageviewList?.[viewIs];

	return (
		<Provider value={value}>
			<div className=" relative">
				<div
					className="flex justify-between gap-1 whitespace-nowrap overflow-scroll border-b border-b-gray-200 relative"
					ref={parentEl}
				>
					<div className="flex gap-1">
						{map(data, (x, index) => {
							const isActive = active === index;
							if (!x) return null;
							const Icon = viewList?.[x?.type];
							return (
								<div
									onClick={(e) => onClick(index)}
									key={index}
									className={cx(
										"px-3 font-medium py-1 mb-1.5 rounded-sm cursor-pointer text-sm hover:bg-slate-100",
										"flex gap-2 justify-center items-center",
										{ "text-gray-400": !isActive },
										{ "text-slate-600 bg-slate-200": isActive }
									)}
								>
									{Icon}
									<div>{x.name}</div>
								</div>
							);
						})}
					</div>

					<div
						onClick={handleToggleSetting}
						className="flex items-center sticky right-0 bg-white pl-2 select-none"
					>
						<Sliders className="w-6 h-6 text-gray-500 cursor-pointer hover:bg-slate-100 p-1 rounded-sm" />
					</div>
				</div>

				<Drawer
					data={activeObject}
					open={close}
					onChange={handleTitleChange}
					onChangeType={handleChangeType}
					onHiddenClick={handleHiddenClick}
					onClose={() => setClose(true)}
				/>
				{!close && (
					<div
						className="absolute w-full h-full z-40"
						onClick={() => setClose(true)}
					/>
				)}
				{DisplayView}
			</div>
		</Provider>
	);
};

export default TabList;
