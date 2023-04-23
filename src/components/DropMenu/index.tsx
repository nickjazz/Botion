import React from "react";
import cx from "classnames";
import * as Popover from "@radix-ui/react-popover";

const DropMenu = ({
	trigger,
	children,
	className = "",
	sideOffset = 0,
	alignOffset = 0,
	open = false,
	auto = false,
	...res
}) => {
	const rootProps = auto ? {} : { open };

	return (
		<Popover.Root {...rootProps}>
			<Popover.Trigger asChild>
				<div aria-label="">{trigger}</div>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					className="drop-menu"
					sideOffset={sideOffset}
					alignOffset={alignOffset}
					{...res}
				>
					<div
						className={cx(
							"relative rounded-sm bg-white border shadow-lg",
							className
						)}
					>
						{children}
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
};

export default DropMenu;
