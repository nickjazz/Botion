import React from "react";
import {
	CheckSquare,
	AlignLeft,
	Calendar,
	AtSign,
	User,
	Hash,
	ArrowDownCircle,
	List,
	Loader,
	Table,
} from "react-feather";

const typeList = {
	string: <AlignLeft className="w-4 h-4" />,
	date: <Calendar className="w-4 h-4" />,
	email: <AtSign className="w-4 h-4" />,
	user: <User className="w-4 h-4" />,
	number: <Hash className="w-4 h-4" />,
	select: <ArrowDownCircle className="w-4 h-4" />,
	multiSelect: <List className="w-4 h-4" />,
	status: <Loader className="w-4 h-4" />,
	checkbox: <CheckSquare className="w-4 h-4" />,
};

const viewList = {
	table: <Table className="w-4 h-4" />,
	list: <List className="w-4 h-4" />,
};

export { typeList, viewList };
