import React, { useContext } from "react";
import map from "lodash/map";
import cx from "classnames";
import {
	Check,
	Settings,
	ArrowUp,
	ArrowDown,
	EyeOff,
	Copy,
	Trash,
	CornerDownLeft,
} from "react-feather";
import { context } from "../../../data/context";

interface IFAction {
	icon: React.ElementType;
	label: string;
	toggleAble?: boolean;
	onClick?: () => void;
	disabled?: boolean;
}

const Setting = ({ data }) => {
	const { replaceHead, replaceBody, dataDef } = useContext(context);

	const asc = () => {
		replaceBody((prev) => {
			const next = prev?.sort((a, b) => {
				if (a[data?.id] < b[data?.id]) {
					return -1;
				}
				if (a[data?.id] > b[data?.id]) {
					return 1;
				}
				return 0;
			});
			return next;
		});
	};
	const desc = () => {
		replaceBody((prev) => {
			const next = prev?.sort((a, b) => {
				if (a[data?.id] < b[data?.id]) {
					return 1;
				}
				if (a[data?.id] > b[data?.id]) {
					return -1;
				}
				return 0;
			});
			return next;
		});
	};

	const changeBodyEvent = (e) => {
		const eventsList = {
			asc,
			desc,
		};

		eventsList?.[e]();
	};

	const changeHeadValue = (key, nextValue) => {
		replaceHead((prev) => {
			const next = map(prev, (x) => {
				if (x.id === data.id) {
					return Object.assign({}, x, { [key]: nextValue });
				}
				return x;
			});
			return next;
		});
	};

	const actionList: IFAction[][] = [
		[{ icon: Settings, label: "Edit Property" }],
		[
			{
				icon: ArrowUp,
				label: "Sort ascending",
				onClick: () => changeBodyEvent("asc"),
			},
			{
				icon: ArrowDown,
				label: "Sort descending",
				onClick: () => changeBodyEvent("desc"),
			},
		],
		[
			{
				icon: EyeOff,
				label: "Hide in view",
				onClick: () => changeHeadValue("hidden", !data?.hidden),
			},
			// { icon: Copy, label: "Duplicate property" },
			{ icon: Trash, label: "Delete property", disabled: data?.locked },
		],
		[
			{
				icon: CornerDownLeft,
				label: "Wrap column",
				toggleAble: true,
				onClick: () => changeHeadValue("wrap", !data?.wrap),
			},
		],
	];

	return (
		<div className="pt-3">
			{map(actionList, (group, index) => {
				return (
					<div key={index} className="border-b pb-1 mb-1 last:border-0">
						{map(group, (x) => {
							const IconComponent = x?.icon;
							return (
								<div
									onClick={x?.onClick}
									className={cx(
										"flex gap-3 items-center hover:bg-gray-100 cursor-pointer px-2 py-1.5 rounded-sm",
										{
											"opacity-25 cursor-not-allowed pointer-events-none":
												x.disabled,
										}
									)}
								>
									<IconComponent className="w-4 h-4" />
									<div className="text-sm text-gray-700">{x.label}</div>
									{x.toggleAble && !data?.wrap && (
										<Check className="w-4 h-4 text-green-500" />
									)}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default Setting;
