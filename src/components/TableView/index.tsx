import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
	useContext,
	lazy,
	Suspense,
} from "react";
import map from "lodash/map";
import ColLast from "./ColLast";
import TableBody from "./TableBody";
import { context } from "../../data/context";

const GroupHead = lazy(() => import("./GroupHead"));
const PureGroupHead = lazy(() => import("./PureGroupHead"));

const TableView = () => {
	const el = useRef<HTMLDivElement>(null);
	const { replaceHead, updateEditId, mode } = useContext(context);
	const isDisplay = mode === "display";

	const [reorder, setReorder] = useState(true);

	const clickEvent = useCallback((e) => {
		const isColtype = e?.target?.classList.contains("col-type");
		if (!isColtype) updateEditId(null);
	}, []);

	useEffect(() => {
		window.addEventListener("click", clickEvent);
		return () => window.removeEventListener("click", clickEvent);
	}, [clickEvent]);

	const handleEndResize = () => {
		setReorder(true);
		syncWidth();
	};

	const syncWidth = () => {
		if (!el.current) return;
		const head = el.current.querySelectorAll("[data-head]");
		const nextHeadWidth = map(head, (x) => x?.getBoundingClientRect()?.width);
		replaceHead((prev) => {
			const next = map(prev, (x) => {
				if (x.hidden) return x;
				else {
					const nextWidth = nextHeadWidth.shift();
					if (nextWidth) x.width = nextWidth;
					return x;
				}
			});
			return next;
		});
	};

	return (
		<div className="min-h-[600px] overflow-scroll relative">
			<div className="h-full border-l min-w-max">
				<div className="flex" ref={el}>
					{!isDisplay && (
						<Suspense fallback={<div>Loading...</div>}>
							<GroupHead
								reorder={reorder}
								handleEndResize={handleEndResize}
								setReorder={setReorder}
							/>
						</Suspense>
					)}
					{isDisplay && (
						<Suspense fallback={<div>Loading...</div>}>
							<PureGroupHead />
						</Suspense>
					)}
					{!isDisplay && <ColLast />}
				</div>

				<TableBody />
			</div>
		</div>
	);
};

export default TableView;
