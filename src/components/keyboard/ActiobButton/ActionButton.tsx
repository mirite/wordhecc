import React from 'react';

interface IProps {
	onClick: () => void;
	enabled: boolean;
	label: string;
}

const ActionButton = (props: IProps) => {
	return (
		<button
			type="button"
			onClick={props.onClick}
			className={'btn btn-primary p-0'}
			disabled={!props.enabled}
		>
			{props.label}
		</button>
	);
};

export default ActionButton;
