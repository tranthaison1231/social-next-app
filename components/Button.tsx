import React from 'react'
import { Spin } from './Spin';
import { twMerge } from 'tailwind-merge';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loading?: boolean;
}

const Button = ({ loading, className, children, ...props }: Props) => {
  return (
    <button
      disabled={loading}
      className={twMerge(
        'bg-[#FEF452] text-[#942F70] text-xl cursor-pointer w-full rounded-lg h-12 border-none shadow-lg active:opacity-75',
        className
      )}
      {...props}
    >
      {loading && <Spin />}
      {children}
    </button>
  );
}


export default Button
