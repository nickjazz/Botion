import React, { useState } from "react";
import { Botion, PureList, PureTable } from "../components";
import { data, initValue } from "./mock";

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

export const EmptyData = () => {
	const [active, setActive] = useState(0);
	const [tabData, setTabData] = useState<any>([]);

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

export const NoSetting = () => {
	const [active, setActive] = useState(0);
	const [tabData, setTabData] = useState<any>([]);

	const handleClick = (e) => {
		console.log(e);
	};

	return (
		<Botion
			setting={false}
			data={tabData}
			active={active}
			onClick={setActive}
			onChange={setTabData}
			onItemClick={handleClick}
		/>
	);
};

export const DisplayMode = () => {
	const [active, setActive] = useState(0);
	const [tabData, setTabData] = useState<any>(data);

	const handleClick = (e) => {
		console.log(e);
	};
	return (
		<Botion
			mode="display"
			data={tabData}
			active={active}
			onClick={setActive}
			onChange={setTabData}
			onItemClick={handleClick}
		/>
	);
};

export const DisplayListOnly = () => {
	const [tabData, setTabData] = useState<any>(initValue);

	return <PureList data={tabData} orderKey={["aaaa", "bbbb"]} />;
};

export const DisplayTableOnly = () => {
	const [tabData, setTabData] = useState<any>(data);

	return <PureTable data={tabData} />;
};
