import React from "react";
import map from "lodash/map";
import cx from "classnames";
import { viewList } from "./config";

const Tablist = ({ data, active, onClick = (e) => {} }) => {
	return (
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
	);
};

export default Tablist;
