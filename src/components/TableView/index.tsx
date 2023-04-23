import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
	useContext,
} from "react";
import map from "lodash/map";
import ColLast from "./ColLast";
import GroupHead from "./GroupHead";
import TableBody from "./TableBody";
import { context } from "../../data/context";

const TableView = () => {
	const el = useRef<HTMLDivElement>(null);
	const { replaceHead, updateEditId } = useContext(context);

	const [reorder, setReorder] = useState(true);

	const clickEvent = useCallback((e) => {
		const isColtype = e?.target?.classList.contains("col-type");
		if (!isColtype) updateEditId(null);
	}, []);

	useEffect(() => {
		window.addEventListener("click", clickEvent);
		return () => window.removeEventListener("click", clickEvent);
	}, [clickEvent]);

	// const handleSort = (e) => {
	// 	const keys = map(e, (x) => x?.id);
	// 	replaceHead(e);
	// 	replaceBody((prev) => {
	// 		return map(prev, (x) => {
	// 			const next = {};
	// 			map(keys, (key) => (next[key] = x[key]));
	// 			return next;
	// 		});
	// 	});
	// };

	const handleEndResize = () => {
		setReorder(true);
		syncWidth();
	};

	const syncWidth = () => {
		if (!el.current) return;
		const head = el.current.querySelectorAll("[data-head]");
		const nextHeadWidth = map(head, (x) => x?.getBoundingClientRect()?.width);
		replaceHead((prev) => {
			const next = map(prev, (x, index) => {
				if (x.hidden) return x;
				else {
					x.width = nextHeadWidth.shift();
					return x;
				}
			});
			return next;
		});
	};

	return (
		<div className="min-h-[600px] overflow-scroll relative">
			<div className="h-full w-full">
				<div className="flex" ref={el}>
					<GroupHead
						reorder={reorder}
						handleEndResize={handleEndResize}
						setReorder={setReorder}
					/>
					<ColLast />
				</div>

				<TableBody />
			</div>
		</div>
	);
};

export default TableView;