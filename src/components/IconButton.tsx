import React from "react";

interface IconButtonProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: string;
  fill?: string;
  containerSize?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  dataTestid?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  size = "100%",
  fill = "black",
  containerSize = "7",
  onClick,
  dataTestid,
}) => {
  const buttonSize = Number(containerSize) * 4;
  return (
    <button
      data-testid={dataTestid}
      onClick={onClick}
      style={{ width: buttonSize, height: buttonSize }}
      className="flex"
    >
      <Icon style={{ width: size, height: size }} fill={fill} />
    </button>
  );
};

export default IconButton;
