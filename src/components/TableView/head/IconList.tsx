import React from "react";
import map from "lodash/map";
import * as FeatherIcon from "react-feather";

const IconList = ({ onClick, onBack, onRemove }) => {
	return (
		<div style={{ contentVisibility: "auto" }}>
			<div className="mb-2 pt-3 pb-3 border-b flex justify-between sticky top-0 bg-white z-10">
				<div
					onClick={onBack}
					className=" cursor-pointer hover:bg-gray-200 text-sm rounded-sm border px-2 bg-gray-100 text-gray-500"
				>
					Back
				</div>
				<div
					onClick={onRemove}
					className=" cursor-pointer hover:bg-gray-200 text-sm rounded-sm border px-2 bg-gray-100 text-gray-500"
				>
					Remove
				</div>
			</div>
			<div className="grid grid-cols-8">
				{map(FeatherIcon, (Icon) => {
					return (
						<Icon
							onClick={() => onClick(Icon?.displayName)}
							key={Icon?.displayName}
							className="p-1.5 w-7 h-7 cursor-pointer hover:bg-gray-200"
							style={{ contentVisibility: "auto" }}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default IconList;
