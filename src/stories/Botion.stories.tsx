import React, { useState } from "react";
import { Botion } from "../components";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { data } from "./mock";

export default {
	title: "Botion",
	component: Botion,
} as ComponentMeta<typeof Botion>;

export const Basic: ComponentStory<typeof Botion> = () => {
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
