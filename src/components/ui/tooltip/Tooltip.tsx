import { ReactElement, ReactNode, useState } from "react";

interface TooltipProps {
  children: ReactNode;
  content: string;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
}

const Tooltip = ({ children, content, position = "top", className = '' }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const handleMouseEnter = () => {
    const child = children as ReactElement<HTMLButtonElement>;
    if(!child?.props?.disabled) {
      return
    }
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    const child = children as ReactElement<HTMLButtonElement>;
    if(!child?.props?.disabled) {
      return
    }
    setIsVisible(false);
  };

  return (
    <div
      className={`relative inline-block h-full ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 px-2 py-[3px] text-sm text-[#F9F9F9] bg-[#212121] rounded-[8px] shadow-lg whitespace-nowrap ${positionClasses[position]}`}
          role="tooltip"
        >
          {content}
          <div
            className={`absolute w-2 h-2 bg-[#212121] transform rotate-45 ${
              position === "top"
                ? "bottom-[-4px] left-1/2 -translate-x-1/2"
                : position === "bottom"
                ? "top-[-4px] left-1/2 -translate-x-1/2"
                : position === "left"
                ? "right-[-4px] top-1/2 -translate-y-1/2"
                : "left-[-4px] top-1/2 -translate-y-1/2"
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;