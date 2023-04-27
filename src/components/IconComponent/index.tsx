import React from "react";
import map from "lodash/map";
import cx from "classnames";
import * as ColorIcon from "react-icons/fc";
import * as Popover from "@radix-ui/react-popover";

const Icon = ({
	name,
	onClick = (e: string) => {},
	onBack = () => {},
	onRemove = () => {},
}) => {
	const El = ColorIcon?.[name];
	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<div aria-label="">
					<El />
				</div>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content className="relative" align="start">
					<div className={cx("relative rounded-sm bg-white border px-3")}>
						<div className="w-[280px] h-[320px] py-3 bg-white px-2 gap-3 grid grid-cols-8 overflow-scroll">
							{map(ColorIcon, (Icon) => {
								return (
									<div
										key={Icon.name}
										onClick={() => onClick(Icon.name)}
										className="flex items-center justify-center cursor-pointer hover:bg-slate-100 py-1"
									>
										<Icon />
									</div>
								);
							})}
						</div>
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
};

export default Icon;
