import Image from "next/image";

export default function Header({ className }: { className: string}) {
  return (
    <div className={`${className} flex items-center justify-between`}>
      <Image src="/logo.svg" alt="Vercel Logo" width={200} height={35.56} priority />
      <ul className="flex gap-12 list-none">
        <li> Blog </li>
        <li> Socials </li>
        <li> Past Socials </li>
        <li> Clubs </li>
        <li> Contact </li>
      </ul>
    </div>
  );
}
