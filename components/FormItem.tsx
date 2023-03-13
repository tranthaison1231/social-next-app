import { FieldError } from "react-hook-form";

interface Props {
  field?: FieldError | undefined;
  children: React.ReactNode;
  label?: string
};

const FormItem = ({ field, children, label}: Props) => {
  return (
    <div className="w-full">
      {label ? <label className="block text-sm text-[#333333]">Description {children}</label> : children}
      {field && <p className="text-red-500 m-0 mt-2">{field.message}</p>}
    </div>
  );
}

export default FormItem
