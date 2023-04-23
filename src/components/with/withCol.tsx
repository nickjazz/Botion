import React, { useContext } from "react";
import find from "lodash/find";
import { context } from "../../data/context";

const withCol = (Element) => (props) => {
	const { update, ...res } = useContext(context);
	const headPorps = find(res?.colDef, { id: props?.keyIndex });

	const handleUpdate = (value) => {
		update({
			index: props?.index,
			keyIndex: props?.keyIndex,
			value,
		});
	};

	return (
		<Element {...props} update={handleUpdate} {...res} headPorps={headPorps} />
	);
};

export default withCol;
