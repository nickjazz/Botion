import React, { useState, useContext } from "react";
import map from "lodash/map";
import { Plus } from "react-feather";
import { context } from "../../data/context";
import { initHead } from "../../data/init";

const ColLast = () => {
	const { replaceHead, replaceBody } = useContext(context);

	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);

	const handleBlur = (e) => {
		const nextKey = e?.target?.value;
		setOpen(false);
		if (!nextKey) return;
		const nextCol = initHead(nextKey)?.[0] as any;

		replaceHead((prev) => {
			return [...prev, nextCol];
		});

		replaceBody((prev) => {
			const nextRows = map(prev, (x) => {
				x[nextCol?.id] = "";
				return x;
			});

			return [...nextRows];
		});
	};

	const handleOnKeyDown = (e) => {
		if (e.keyCode === 13) {
			handleBlur(e);
		}
	};

	return (
		<>
			{open && (
				<div className="">
					<input
						placeholder="type a name"
						type={"text"}
						autoFocus
						onKeyDown={handleOnKeyDown}
						onBlur={handleBlur}
						className="ignore h-[36px] w-[120px] border-t border-r px-4 flex cursor-pointer hover:bg-gray-100 items-center min-w-[120px] border-b-gray-200/75 text-gray-500/90 text-sm border-b"
					/>
				</div>
			)}
			{!open && (
				<div
					onClick={handleOpen}
					className="ignore border-t flex cursor-pointer hover:bg-gray-100 items-center min-w-[120px] border-b-gray-200/75 text-gray-500/90 text-sm border-b border-r"
				>
					<div className="p-3 ">
						<Plus className="w-[14px] h-[11px] text-slate-400" />
					</div>
				</div>
			)}
		</>
	);
};

export default ColLast;
