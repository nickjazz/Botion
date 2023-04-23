import React, { useContext, useEffect, useState } from "react";
import map from "lodash/map";
import find from "lodash/find";
import { Plus } from "react-feather";
import IconComponent from "../IconComponent";
import { ReactSortable } from "react-sortablejs";
import { context } from "../../data/context";

const SortAble = ReactSortable as any;

const ListView = () => {
	const { replaceBody, dataDef, colDef, onRowAdd, update, onClick } =
		useContext(context);
	const [openEdit, setOpenEdit] = useState(false);
	const [orderKey, setOrderKey] = useState([]);

	useEffect(() => {
		if (!colDef) return;

		const locked = [];
		const basic = [];
		colDef?.map((x) => {
			if (x.hidden) return;
			else if (x.locked) locked.push(x.id);
			else basic.push(x.id);
		});

		setOrderKey([...locked, ...basic]);
	}, [dataDef, colDef]);

	const handleAddOnClick = () => setOpenEdit(true);

	const handleBlur = (e) => {
		const value = e?.target?.value;
		const firstKey = find(colDef, { locked: true })?.id;
		setOpenEdit(false);
		if (value) onRowAdd({ [firstKey]: value });
	};

	const handleOnKeyDown = (e) => {
		if (e.keyCode === 13) {
			handleBlur(e);
		}
	};

	const handleSort = (e) => {
		replaceBody(e);
	};

	const handleIconChange = (e, index) => {
		update({
			index,
			keyIndex: "_icon",
			value: e,
		});
	};

	const handleBackClick = () => {};
	const handleRemoveClick = () => {};

	if (!dataDef) return null;

	return (
		<div className="relative mt-2 gap-2">
			<SortAble
				animation={400}
				tag={"div"}
				list={dataDef}
				setList={handleSort}
				direction="horizontal"
			>
				{map(dataDef, (x, index) => {
					return (
						<div
							className="relative min-h-[30px] flex gap-2 mb-1 rounded-sm hover:bg-gray-100 py-1 "
							key={index}
							onClick={() => onClick(x)}
						>
							{map(orderKey, (key) => {
								const item = x[key];
								return (
									<div
										key={`${x.id}-${key}`}
										className="first:text-[15px] last:pr-3 hover:text-gray-700 cursor-pointer whitespace-nowrap text-ellipsis overflow-clip first:pl-8 text-sm text-gray-400/80 first:text-gray-500 first:flex-1"
									>
										{item}
									</div>
								);
							})}

							<div className="w-4 h-4 absolute left-1 top-1.5">
								<IconComponent
									name={x?._icon || "FcFile"}
									onClick={(e) => handleIconChange(e, index)}
									onBack={handleBackClick}
									onRemove={handleRemoveClick}
								/>
							</div>
						</div>
					);
				})}
			</SortAble>
			{openEdit && (
				<div className={"relative"}>
					<input
						autoFocus
						onKeyDown={handleOnKeyDown}
						onBlur={handleBlur}
						placeholder="Please enter a title."
						className="select-none bg-gray-100 w-full hover:bg-gray-100 text-gray-300 hover:text-gray-500 mt-1 flex items-center px-2 text-sm col-type border min-h-[36px] h-full cursor-pointer"
					/>
				</div>
			)}
			{!openEdit && (
				<div
					onClick={handleAddOnClick}
					className={
						"select-none  hover:bg-gray-100 text-gray-300 hover:text-gray-500 mt-1 flex items-center px-2 text-sm col-type border border-transparent min-h-[36px] h-full cursor-pointer "
					}
				>
					<Plus className="w-4 h-4 mr-2 rounded-sm" />
					<div className="">New</div>
				</div>
			)}
		</div>
	);
};

export default ListView;
