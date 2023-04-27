import React from "react";
import { Sliders } from "react-feather";

const SettingBtn = ({ onClick }) => {
	return (
		<div
			onClick={onClick}
			className="flex items-center sticky right-0 bg-white pl-2 select-none"
		>
			<Sliders className="w-6 h-6 text-gray-500 cursor-pointer hover:bg-slate-100 p-1 rounded-sm" />
		</div>
	);
};

export default SettingBtn;
