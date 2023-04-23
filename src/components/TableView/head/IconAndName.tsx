import React, { useState, useContext } from "react";
import map from "lodash/map";
import { TypeList } from "../config";
import IconList from "./IconList";
import { context } from "../../../data/context";

const IconAndName = ({ data }) => {
	const { data: name, icon, id } = data;
	const { replaceHead } = useContext(context);
	const [showIconList, setShowIconList] = useState(false);

	const changeHeadValue = (key, nextValue) => {
		replaceHead((prev) => {
			const next = map(prev, (x) => {
				if (x.id === id) {
					return Object.assign({}, x, { [key]: nextValue });
				}
				return x;
			});
			return next;
		});
	};

	const handleToggleIconList = () => setShowIconList((prev) => !prev);

	const handleOnBack = () => setShowIconList(false);

	return (
		<div>
			<div className="flex items-center gap-2">
				<div
					onClick={handleToggleIconList}
					className="border p-1.5 rounded-sm cursor-pointer hover:bg-gray-100"
				>
					<TypeList icon={icon} />
				</div>
				<input
					onChange={(e) => changeHeadValue("data", e?.target?.value)}
					defaultValue={name}
					type={"text"}
					className="px-2 py-1 text-sm text-slate-600 bg-gray-100 w-full rounded-sm border"
				/>
			</div>

			<div className="max-h-[265px] overflow-scroll left-0 w-full px-2 absolute bg-white">
				{showIconList && (
					<IconList
						onBack={handleOnBack}
						onRemove={() => changeHeadValue("icon", "Database")}
						onClick={(e) => changeHeadValue("icon", e)}
					/>
				)}
			</div>
		</div>
	);
};

export default IconAndName;
