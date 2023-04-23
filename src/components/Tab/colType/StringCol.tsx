import React, { useEffect, useRef } from "react";
import cx from "classnames";
import withCol from "../../with/withCol";

const StringCol = ({ data = " ", headPorps, editing, update }) => {
	const elRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (editing && elRef.current) {
			elRef.current?.focus();
		}
	}, [editing]);

	const handleOnPaste = (e) => {
		e.preventDefault();
		let text = e.clipboardData.getData("text/plain");
		document.execCommand("insertText", false, text);
	};

	return (
		<div
			ref={elRef}
			className={cx("outline-none break-words col-type p-2", {
				"whitespace-nowrap overflow-hidden text-ellipsis": headPorps?.wrap,
			})}
			contentEditable={editing}
			suppressContentEditableWarning={editing}
			dangerouslySetInnerHTML={{
				__html: data,
			}}
			onPaste={handleOnPaste}
			onBlur={(e) => update(e.target.innerHTML)}
		/>
	);
};

export default withCol(StringCol);
