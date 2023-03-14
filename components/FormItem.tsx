import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props {
  field?: FieldError | undefined;
  children: React.ReactNode;
  label?: string;
  className?: string
};

const FormItem = ({ field, children, label, className }: Props) => {
  return (
    <div className={twMerge('w-full', className)}>
      <label>
        <span className="block text-sm text-[#333333]"> {label} </span>
        {children}
        {field && <p className="text-red-500 m-0 mt-2">{field.message}</p>}
      </label>
    </div>
  );
}

export default FormItem
