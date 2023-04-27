import React, { useContext } from "react";
import cx from "classnames";
import isObject from "lodash/isObject";
import { context } from "../../data/context";

const ColBlock = ({
	data,
	id,
	width,
	index,
	keyIndex,
	colType = "string",
	parentKey,
	onClick,
	active,
}) => {
	const { colTypeList, mode } = useContext(context);
	const displayData = isObject(data) ? "" : data;
	const isActive = active === id;
	const isDisplay = mode === "display";

	const RenderColType = isDisplay
		? colTypeList?.["display"]
		: colTypeList?.[colType] || colTypeList?.["string"];

	const colProps = {
		data: displayData,
		editing: isActive,
		keyIndex,
		index,
	};

	return (
		<div
			style={{ width }}
			data-col={parentKey}
			data-id={id}
			onClick={() => onClick(id)}
			className="border-r  relative border-r-gray-200/75 border-b-gray-200/75 text-gray-800/90 text-sm border-b"
		>
			<div
				className={cx(
					"select-none  col-type border border-transparent min-h-[36px] h-full hover:border-gray-300 cursor-pointer active:border-sky-400",
					{ "border-sky-400 bg-gray-100/50": isActive }
				)}
			>
				<RenderColType {...colProps} />
			</div>
		</div>
	);
};

export default ColBlock;
