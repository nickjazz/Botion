import React, { useState } from "react";
import { Botion } from "../components";
import { data } from "./mock";

export default {
	title: "Botion",
	component: Botion,
};

export const Basic = () => {
	const [active, setActive] = useState(0);
	const [tabData, setTabData] = useState<any>(data);

	const handleClick = (e) => {
		console.log(e);
	};
	return (
		<Botion
			data={tabData}
			active={active}
			onClick={setActive}
			onChange={setTabData}
			onItemClick={handleClick}
		/>
	);
};
