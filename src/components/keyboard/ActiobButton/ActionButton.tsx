import React from "react";

interface IProps {
  enabled: boolean;
  label: string;
  onClick: () => void;
}

const ActionButton = (props: IProps) => {
  return (
    <button className={"btn btn-primary p-0"} disabled={!props.enabled} onClick={props.onClick} type="button">
      {props.label}
    </button>
  );
};

export default ActionButton;
