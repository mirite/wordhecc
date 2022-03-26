import React from 'react';

interface IProps {
	onClick: () => void;
}

const BackspaceButton = (props: IProps) => {
	return (
		<button
			type="button"
			onClick={props.onClick}
			className={'btn btn-primary'}
		>
			Back
		</button>
	);
};

export default BackspaceButton;
