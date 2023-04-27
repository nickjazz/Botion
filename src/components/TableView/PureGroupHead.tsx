import React, { useContext } from "react";
import cx from "classnames";
import map from "lodash/map";
import { TypeList } from "./config";
import { context } from "../../data/context";

const PureGroupHead = () => {
	const { colDef } = useContext(context);

	if (!colDef) return null;

	const filterHidden = colDef?.filter((x) => !x.hidden);

	return (
		<div className={cx("flex flex-nowrap w-fit h-[36px] border-t")}>
			{map(filterHidden, (col) => {
				return (
					<div
						className={cx(
							"relative min-w-min border-r border-r-gray-200/75 border-b-gray-200/75 hover:bg-gray-100 cursor-pointer text-gray-400/90 text-sm border-b"
						)}
						style={{ width: col?.width }}
					>
						<div className="flex items-center gap-2 p-2 ">
							<TypeList icon={col?.icon} />
							<div>{col?.data}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default PureGroupHead;
