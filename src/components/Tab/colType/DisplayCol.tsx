import React, { useEffect, useRef } from "react";
import cx from "classnames";
import withCol from "../../with/withCol";

const DisplayCol = ({ data = " ", headPorps, editing }) => {
	const elRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={elRef}
			className={cx("outline-none break-words col-type p-2", {
				"whitespace-nowrap overflow-hidden text-ellipsis": headPorps?.wrap,
			})}
			contentEditable={false}
			suppressContentEditableWarning={editing}
			dangerouslySetInnerHTML={{
				__html: data,
			}}
		/>
	);
};

export default withCol(DisplayCol);
