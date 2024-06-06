import React from "react";

interface CustomButtonProps {
  label: string;
  handleClick: (e?: any) => any;
  disabled?: boolean;
  small?: boolean;
}

const CustomButton = ({
  label,
  handleClick,
  disabled,
  small,
}: CustomButtonProps) => {
  return (
    <section
      className="border-[3px] border-black rounded-xl"
      onClick={handleClick}
    >
      <p
        className={
          small
            ? `text-center py-2 hover:bg-[black] hover:text-[white] cursor-pointer text-sm`
            : `text-center py-2 hover:bg-[black] hover:text-[white] cursor-pointer text-3xl`
        }
      >
        {label}
      </p>
    </section>
  );
};

export default CustomButton;
