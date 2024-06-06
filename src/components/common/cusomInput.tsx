import React from "react";

interface CustomInputProps {
  value: string | number;
  onChange: (v: any) => any;
  isTextArea?: boolean;
  label?: string;
  type?: string;
}

const CustomInput = ({
  value,
  onChange,
  isTextArea,
  label,
  type,
}: CustomInputProps) => {
  return (
    <section className="my-4 text-2xl">
      <p className="font-bold">{label}</p>
      <section className="flex border-[3px] border-black rounded-xl px-2 py-2">
        {isTextArea ? (
          <textarea
            value={value}
            onChange={onChange}
            className="w-full outline-none h-[80px]"
          />
        ) : (
          <input
            type={type || "string"}
            className="outline-none w-full"
            value={value}
            onChange={onChange}
          />
        )}
      </section>
    </section>
  );
};

export default CustomInput;
