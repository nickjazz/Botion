import React, { useRef, useEffect, useCallback } from "react";
import cx from "classnames";
import IconAndName from "./head/IconAndName";
import Setting from "./head/Setting";
import { makeLine, removeLine } from "./utils";
import { TypeList } from "./config";
import DropMenu from "../../components/DropMenu";

const MIN_COL_WIDTH = 100;
const ColHead = ({
	col,
	id,
	onResizeStart = () => {},
	onResizeEnd = () => {},
}) => {
	const colEl = useRef<HTMLDivElement>(null);
	const dragCol = useRef<HTMLDivElement>(null);

	const resizeCol = useCallback(
		(e) => {
			if (!colEl.current) return;
			const rows = document.querySelectorAll(`[data-col=${col?.id}]`);
			const parentEl = colEl.current.getBoundingClientRect();
			const nextWidth = e.clientX - parentEl.left;
			if (nextWidth < MIN_COL_WIDTH) return;

			colEl.current.style.width = `${nextWidth}px`;
			rows.forEach((row: HTMLElement) => {
				row.style.width = `${nextWidth}px`;
			});
		},
		[col?.id]
	);

	const cleanEvent = useCallback(() => {
		if (!colEl.current) return;
		const parent = colEl.current.parentNode;
		if (!parent) return;
		window.removeEventListener("mousemove", resizeCol);
		onResizeEnd();
		removeLine();
	}, [onResizeEnd, resizeCol]);

	useEffect(() => {
		window.addEventListener("mouseup", cleanEvent);
		return () => window.removeEventListener("mouseup", cleanEvent);
	}, [cleanEvent]);

	const handleMoveOnMouseDown = () => {
		if (!colEl.current) return;
		const parent = colEl.current.parentNode;
		if (!parent) return;
		window.addEventListener("mousemove", resizeCol);
		makeLine(colEl.current, dragCol.current);
		onResizeStart();
	};

	return (
		<div
			data-head={id}
			ref={colEl}
			onMouseUp={cleanEvent}
			className={cx(
				"relative min-w-min border-r border-r-gray-200/75 border-b-gray-200/75 hover:bg-gray-100 cursor-pointer text-gray-400/90 text-sm border-b"
			)}
			style={{ width: col?.width }}
			id={id}
		>
			<DropMenu
				auto
				trigger={
					<div className="flex items-center gap-2 p-2 ">
						<TypeList icon={col?.icon} />
						<div>{col?.data}</div>
					</div>
				}
				align="start"
				className="w-[280px]"
			>
				<div className="w-full min-h-[300px] p-2 transition-all">
					<IconAndName data={col} />
					<Setting data={col} />
				</div>
			</DropMenu>
			<div
				ref={dragCol}
				onMouseDown={handleMoveOnMouseDown}
				onMouseEnter={() => onResizeStart()}
				onMouseLeave={() => onResizeEnd()}
				className="w-[8px] h-full bg-sky-600 absolute -right-[4px] top-0 z-10 transition-all opacity-0 hover:opacity-100 cursor-col-resize"
			/>
		</div>
	);
};

export default ColHead;
