import Tooltip from "./tooltip/Tooltip";

const TooltipExample = () => {
  return (
    <div className="p-4">
      <Tooltip content="This button is disabled because you need to complete the previous step">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled
        >
          Submit
        </button>
      </Tooltip>
    </div>
  );
};

export default TooltipExample; 