import React, { useContext, PropsWithChildren } from "react";
import { ReactSortable } from "react-sortablejs";
import cx from "classnames";
import map from "lodash/map";
import find from "lodash/find";
import ColHead from "./ColHead";
import { context } from "../../data/context";

const GroupHead = ({ reorder, handleEndResize, setReorder }) => {
	const { colDef, dataDef, replaceHead, replaceBody } = useContext(context);

	if (!colDef) return null;
	const filterHidden = colDef?.filter((x) => !x.hidden);

	const handleSort = (e) => {
		const keys = map(e, (x) => x?.id);
		const allKeys = map(colDef, (x) => x?.id);
		const mergeKeys = new Set([...keys, ...allKeys]);

		const nextHead = [];

		mergeKeys.forEach((key) => {
			const head = find(colDef, { id: key });
			nextHead.push(head);
		});

		replaceBody((prev) => {
			return map(prev, (x) => {
				const next = {};
				mergeKeys.forEach((key) => {
					next[key] = x[key];
				});
				return next;
			});
		});

		replaceHead(nextHead);
	};

	return (
		<ReactSortable
			disabled={!reorder}
			animation={400}
			tag={"div"}
			className={cx("flex flex-nowrap w-fit h-[36px]")}
			list={filterHidden}
			setList={handleSort}
			filter=".ignore"
			direction="horizontal"
		>
			{map(filterHidden, (col) => {
				return (
					<ColHead
						col={col}
						key={col?.id}
						id={col?.id}
						onResizeStart={() => setReorder(false)}
						onResizeEnd={handleEndResize}
					/>
				);
			})}
		</ReactSortable>
	);
};

export default GroupHead;
