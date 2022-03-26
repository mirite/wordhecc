import React from 'react';

interface IProps {
	onClick: () => void;
}

const EnterButton = (props: IProps) => {
	return (
		<button
			type="button"
			onClick={props.onClick}
			className={'btn btn-primary'}
		>
			Enter
		</button>
	);
};

export default EnterButton;
