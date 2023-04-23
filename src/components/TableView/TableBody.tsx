import React, { useContext, useState, useEffect } from "react";
import map from "lodash/map";
import find from "lodash/find";
import { Plus } from "react-feather";
import ColBlock from "./ColBlock";
import { context } from "../../data/context";

const TableBody = () => {
	const { colDef, dataDef, editId, updateEditId, onRowAdd, minColWidth } =
		useContext(context);

	return (
		<div>
			{map(dataDef, (col, i) => {
				return (
					<div className="flex w-fit">
						{map(col, (x, keyIndex) => {
							const colData = find(colDef, { id: keyIndex });
							if (!colData || colData?.hidden) return null;
							return (
								<ColBlock
									key={`${keyIndex}`}
									colType={colData?.type}
									width={colData?.width || minColWidth}
									parentKey={keyIndex}
									id={`${keyIndex}-${i}`}
									index={i}
									keyIndex={keyIndex}
									data={x}
									onClick={updateEditId}
									active={editId}
								/>
							);
						})}
						<div className="min-w-[120px] border-r max-w-content border-b-gray-200/75 text-gray-500/90 text-sm border-b"></div>
					</div>
				);
			})}
			<div
				onClick={onRowAdd}
				className={
					"select-none  hover:bg-gray-100 text-gray-300 hover:text-gray-500 mt-1 flex items-center px-2 text-sm col-type border border-transparent min-h-[36px] h-full cursor-pointer "
				}
			>
				<Plus className="w-4 h-4 mr-2 rounded-sm" />
				<div className="">New</div>
			</div>
		</div>
	);
};

export default TableBody;
