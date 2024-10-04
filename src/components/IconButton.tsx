import React from "react";

// Define the props type for IconButton
interface IconButtonProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Icon component type
  size?: string; // Optional size prop
  fill?: string; // Optional fill color
  containerSize?: string; // Optional container size (e.g., tailwind width/height)
}

// A reusable IconButton component that accepts size, fill, and icon as props
const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  size = "100%",
  fill = "black",
  containerSize = "7",
}) => {
  return (
    <div className={` size-${containerSize} flex`}>
      <Icon style={{ width: size, height: size }} fill={fill} />
    </div>
  );
};

export default IconButton;
