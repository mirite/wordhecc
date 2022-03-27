import React from 'react';

interface IProps {
	onClick: () => void;
	enabled: boolean;
}

const EnterButton = (props: IProps) => {
	return (
		<button
			type="button"
			onClick={props.onClick}
			className={'btn btn-primary p-0'}
			disabled={!props.enabled}
		>
			Enter
		</button>
	);
};

export default EnterButton;
