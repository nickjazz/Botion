import React, { useState, useEffect } from "react";
import cx from "classnames";
import map from "lodash/map";
import sortBy from "lodash/sortBy";
import {
	List,
	Table,
	CreditCard,
	Calendar,
	BarChart2,
	Eye,
	EyeOff,
	Menu,
	Lock,
} from "react-feather";
import Draggable from "react-draggable";

const Drawer = ({
	data,
	open,
	onChange = (e: any) => {},
	onChangeType = (e: string) => {},
	onHiddenClick = (e: any) => {},
	onClose = () => {},
}) => {
	const [name, setName] = useState("");

	useEffect(() => setName(data?.name), [data?.name]);

	const col = data?.data?.head;

	if (!col) return null;

	const viewType = [
		{ label: "List", type: "list", icon: List },
		{ label: "Table", type: "table", icon: Table },
		// { label: "Card", type: "card", icon: CreditCard },
		// { label: "Calendar", type: "calendar", icon: Calendar },
		// { label: "Chart", type: "chart", icon: BarChart2 },
	];

	return (
		<Draggable handle=".move-handler">
			<div
				className={cx(
					"bg-white rounded-sm shadow-md border px-4 pb-4 z-50 border-t w-[300px] absolute min-h-fit  top-[34px] right-0",
					{ "-translate-y-[2%] pointer-events-none opacity-0 -z-50": open }
				)}
			>
				<div className="move-handler flex justify-center items-center py-2 opacity-40">
					<Menu className="w-4" />
				</div>
				<div className="flex gap-8">
					<input
						onChange={onChange}
						defaultValue={name}
						type={"text"}
						className="px-2 py-1 text-sm text-slate-600 bg-gray-100 w-full rounded-sm border"
					/>

					<div
						onClick={onClose}
						className="cursor-pointer flex items-center justify-center border hover:text-gray-100 hover:bg-sky-500 hover:border-sky-500 text-gray-400 rounded-sm"
					>
						<div className="px-3 py-0.5 text-sm">Close</div>
					</div>
				</div>

				{/* View */}
				<div className="grid grid-cols-3 py-2 mt-2 gap-2">
					{map(viewType, (x, index) => {
						const Icon = x.icon;
						const active = x.type === data?.type;
						return (
							<div
								key={`${x.label}-${index}`}
								onClick={() => {
									onChangeType(x?.type);
								}}
								className={cx(
									"border-2 hover:bg-gray-200 hover:text-gray-600 text-gray-500 rounded-md cursor-pointer flex flex-col justify-center items-center py-2",
									{
										"border-sky-500": active,
									}
								)}
							>
								<Icon className="w-5 h-5 my-1" />
								<span className="text-xs">{x.label}</span>
							</div>
						);
					})}
				</div>

				<div>
					{map(col, (x) => {
						return (
							<div
								data-id={x?.id}
								key={x?.id}
								className="flex items-center gap-3 py-1.5 px-1 text-sm bg-white w-full"
							>
								<div className="flex-1">{x.data}</div>

								<div
									className="cursor-pointer"
									onClick={() => onHiddenClick(x)}
								>
									<div>
										{!x.hidden && (
											<EyeOff
												className={cx("w-4 h-4 opacity-10 hover:opacity-100")}
											/>
										)}
										{x.hidden && <EyeOff className={cx("w-4 h-4")} />}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</Draggable>
	);
};

export default Drawer;
