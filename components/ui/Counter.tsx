import React from "react";

const UNIT_LIST = ["%", "px"] as const;
type UnitType = typeof UNIT_LIST[number];

function sanitizeInput(value: string) {
  value = value.replace(/,/g, ".");
  value = value.replace(/(?!^)-/g, "");
  value = value.replace(/[^\d.-]/g, "");
  const minus = value.startsWith("-") ? "-" : "";
  value = value.replace(/-/g, "");
  const parts = value.split(".");
  if (parts.length > 2) {
    value = parts[0] + "." + parts.slice(1).join("");
  }
  value = minus + value;
  if (value === "" || value === "-" || value === "." || value === "-." ) {
    return "0";
  }
  return value;
}

function clampValue(num: number, unit: UnitType) {
  if (isNaN(num)) return 0;
  if (num < 0) return 0;
  if (unit === "%" && num > 100) return 100;
  return num;
}

const Count: React.FC = () => {
  const [unit, setUnit] = React.useState<UnitType>("%");
  const [count, setCount] = React.useState("0");
  const [isFocused, setIsFocused] = React.useState(false);
  const prevUnit = React.useRef(unit);

  React.useEffect(() => {
    if (prevUnit.current !== unit && unit === "%") {
      const num = parseFloat(count);
      if (num > 100) setCount("100");
    }
    prevUnit.current = unit;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(sanitizeInput(e.target.value));
  };

  const handleBlur = () => {
    const num = clampValue(parseFloat(count), unit);
    setCount(num.toString());
  };

  const handleMinus = () => {
    const num = clampValue(parseFloat(count) - 1, unit);
    setCount(num.toString());
  };

  const handlePlus = () => {
    const num = clampValue(parseFloat(count) + 1, unit);
    setCount(num.toString());
  };

  const num = parseFloat(count);
  const disableMinus = num <= 0;
  const disablePlus = unit === "%" && num >= 100;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-[#AAAAAA] text-[12px]">Unit</p>
        <div className=" flex mb-1 w-[140px] h-[36px] bg-[#181818] rounded-[8px]">
          {UNIT_LIST.map((u) => (
            <button
              key={u}
              className={`px-4 py-1 flex-1 rounded-lg font-normal text-base transition-all duration-150
                ${unit === u ? "bg-blue-500 text-white shadow" : "bg-transparent text-neutral-400 hover:bg-[#232323]"}
              `}
              onClick={() => setUnit(u)}
              type="button"
            >
              {u}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[#AAAAAA] text-[12px]">Value</p>
        <div
          className={`w-[140px] h-[40px] bg-[#212121] rounded-lg flex items-center justify-between transition-all border ${
            isFocused ? "border-blue-400" : "border-transparent"
          }`}
        >
          <button
            className={`w-[36px] cursor-pointer h-full flex items-center justify-center rounded-tl-[8px] rounded-bl-[8px] rounded-br-none rounded-tr-none transition-opacity ${
              disableMinus ? "opacity-40 cursor-not-allowed" : "hover:bg-[#333] active:bg-[#444]"
            }`}
            onClick={handleMinus}
            disabled={disableMinus}
            tabIndex={-1}
            aria-label="Decrease"
          >
            <IconMinus />
          </button>
          <div className="relative flex-1 flex items-center">
            <input
              type="text"
              value={count}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                handleBlur();
              }}
              className="w-full h-full text-[16px] bg-transparent text-white font-normal text-2xl outline-none text-center color-[#F9F9F9] p-2 rounded border-none"
              inputMode="decimal"
            />
          </div>
          <button
            className={`w-[36px] h-full rounded-tr-[8px] rounded-br-[8px] rounded-bl-none rounded-tl-none flex items-center justify-center rounded transition-opacity cursor-pointer ${
              disablePlus ? "opacity-40 cursor-not-allowed" : "hover:bg-[#333] active:bg-[#444]"
            }`}
            onClick={handlePlus}
            disabled={disablePlus}
            tabIndex={-1}
            aria-label="Increase"
          >
            <IconPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

const IconMinus = () => (
  <svg
    width="12"
    height="2"
    viewBox="0 0 12 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0.75C0 0.335786 0.335786 0 0.75 0L11.25 0C11.6642 0 12 0.335786 12 0.75C12 1.16421 11.6642 1.5 11.25 1.5H0.75C0.335786 1.5 0 1.16421 0 0.75Z"
      fill="#F9F9F9"
    />
  </svg>
);

const IconPlus = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.75 0.75C6.75 0.335786 6.41421 0 6 0C5.58579 0 5.25 0.335786 5.25 0.75V5.25H0.75C0.335786 5.25 0 5.58579 0 6C0 6.41421 0.335786 6.75 0.75 6.75H5.25L5.25 11.25C5.25 11.6642 5.58579 12 6 12C6.41421 12 6.75 11.6642 6.75 11.25V6.75H11.25C11.6642 6.75 12 6.41421 12 6C12 5.58579 11.6642 5.25 11.25 5.25H6.75V0.75Z"
      fill="#F9F9F9"
    />
  </svg>
);

export default Count;
