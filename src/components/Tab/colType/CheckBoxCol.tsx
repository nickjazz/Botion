import React, { useRef } from "react";
import withCol from "../../with/withCol";

const CheckBoxCol = ({ data = false, update }) => {
	const elRef = useRef<HTMLDivElement>(null);

	return (
		<div ref={elRef} className="outline-none break-words col-type p-2">
			<input
				onChange={(e) => {
					update(e.target.checked);
				}}
				type="checkbox"
				defaultChecked={data}
			/>
		</div>
	);
};

export default withCol(CheckBoxCol);
