import React, { useRef, useState, useEffect, useCallback } from "react";
import filter from "lodash/filter";
import isNil from "lodash/isNil";
import find from "lodash/find";
import map from "lodash/map";
import cx from "classnames";
import { Menu } from "react-feather";
import { ReactSortable } from "react-sortablejs";
import * as Popover from "@radix-ui/react-popover";
import withCol from "../../with/withCol";

const SelectCol = ({
	data = "",
	update,
	replaceHead,
	colDef,
	keyIndex: id,
}) => {
	const elRef = useRef<HTMLDivElement>(null);
	const [opt, setOpt] = useState([]);

	const initOptions = useCallback(() => {
		const options = find(colDef, { id })?.options || [];
		setOpt(options);
	}, [colDef, id]);

	useEffect(() => {
		initOptions();
	}, [initOptions]);

	const handleSearch = (e) => {
		const keyword = String(e.target.value)?.toLowerCase();

		if (isNil(keyword) || !keyword) initOptions();

		setOpt((prev) => {
			return filter(prev, (x) => {
				const isContain =
					String(x?.value)?.toLowerCase()?.includes(keyword) ||
					String(x?.label)?.toLowerCase()?.includes(keyword);
				if (isContain) return x;
				else return null;
			});
		});
	};

	const handleSort = (e) => {
		setOpt(e);
		replaceHead((prev) => {
			const next = map(prev, (x) => {
				if (x.id === id) {
					return Object.assign({}, x, { options: e });
				}
				return x;
			});
			return next;
		});
	};

	const displayLabel = find(opt, { value: data })?.label;

	return (
		<div ref={elRef} className="outline-none break-words col-type h-full">
			<Popover.Root>
				<Popover.Trigger asChild>
					<div aria-label="" className="w-full h-full  p-2">
						{displayLabel}
					</div>
				</Popover.Trigger>
				<Popover.Portal>
					<Popover.Content className="drop-menu" align="start">
						<div
							className={cx(
								"absolute w-[200px] h-[200px] left-0 rounded-sm bg-white border shadow-lg"
							)}
						>
							<div className="m-2 flex">
								<input
									onChange={handleSearch}
									placeholder="search options"
									type={"type"}
									className="px-2 py-1 text-sm text-slate-600 bg-gray-100 w-full rounded-sm border"
								/>
							</div>
							<div className="overflow-scroll h-full">
								<ReactSortable
									animation={400}
									tag={"div"}
									className={cx("flex flex-col w-full h-[36px]")}
									list={opt}
									setList={handleSort}
									direction="vertical"
									handle=".move-handler"
								>
									{map(opt, (option) => {
										return (
											<div
												key={option.value}
												className="px-2 flex items-center gap-3 py-1 text-sm bg-white w-full"
											>
												<div className="move-handler cursor-grab mr-3 w-2 h-full">
													<Menu className="scale-50" />
												</div>
												<div
													className="select-none w-full cursor-pointer text-slate-500 hover:text-sky-500"
													onClick={() => update(option.value)}
												>
													{option?.label}
												</div>
											</div>
										);
									})}
								</ReactSortable>
							</div>
						</div>
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
		</div>
	);
};

export default withCol(SelectCol);
