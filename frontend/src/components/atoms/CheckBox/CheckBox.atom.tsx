type CheckBoxProps = {
  selected: boolean;
  onChange: () => void;
};

export const CheckBox = ({ selected, onChange }: CheckBoxProps) => {
  return (
    <input
      type="checkbox"
      className="w-[1.6rem] h-[1.6rem] accent-text cursor-pointer border-2 border-text"
      checked={selected}
      onChange={onChange}
    />
  );
};
