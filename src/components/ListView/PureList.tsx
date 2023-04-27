import React from "react";
import map from "lodash/map";
import keys from "lodash/keys";
import IconComponent from "../IconComponent";

interface IFProps {
	data: any[];
	onClick?: (e: any) => void;
	orderKey?: any[];
}

const PureList = ({ data, onClick = (e) => {}, orderKey = [] }: IFProps) => {
	const colKeys = orderKey?.length ? orderKey : keys(data?.[0]);

	return (
		<>
			{map(data, (x, index) => {
				return (
					<div
						className="relative min-h-[30px] pr-3 flex gap-2 mb-1 rounded-sm hover:bg-gray-100 py-1 "
						key={index}
						onClick={() => onClick(x)}
					>
						{map(colKeys, (key) => {
							const item = x[key];
							return (
								<div
									key={`${x.id}-${key}`}
									className="first:text-[15px] hover:text-gray-700 cursor-pointer whitespace-nowrap text-ellipsis overflow-clip first:pl-8 text-sm text-gray-400/80 first:text-gray-500 first:flex-1"
								>
									{item}
								</div>
							);
						})}

						<div className="w-4 h-4 absolute left-1 top-1.5">
							<IconComponent name={x?._icon || "FcFile"} />
						</div>
					</div>
				);
			})}
		</>
	);
};

export default PureList;
