import React from "react";
import * as FeatherIcon from "react-feather";

const TypeList = ({ icon }) => {
	const IconComponent = FeatherIcon?.[icon] || FeatherIcon?.["Table"];

	return <IconComponent className="w-4 h-4" />;
};

export { TypeList };
