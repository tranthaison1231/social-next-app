import Image from 'next/image';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  onClose: () => void;
}

export function Tag ({ onClose, children, className = '',...props}: Props) {
  return (
    <div {...props} className={`h-fit px-2 py-1 bg-[#F9f5ff] rounded-2xl text-[#942F70] ${className}`}>
      {children}
      <Image
        alt="close"
        src="./close.svg"
        width={8}
        height={8}
        className="cursor-pointer ml-1"
        onClick={onClose}
      />
    </div>
  );
}



