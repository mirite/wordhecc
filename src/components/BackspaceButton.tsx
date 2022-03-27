import React from 'react';

interface IProps {
	onClick: () => void;
	enabled: boolean;
}

const BackspaceButton = (props: IProps) => {
	return (
		<button
			type="button"
			onClick={props.onClick}
			className={'btn btn-primary p-0'}
			disabled={!props.enabled}
		>
			Back
		</button>
	);
};

export default BackspaceButton;
