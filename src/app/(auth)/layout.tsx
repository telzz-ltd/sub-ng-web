import Image from "next/image";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="grid md:grid-cols-2 min-h-screen bg-gray-50">
      <div className="bg-blue-900 hidden md:block"></div>
      <div className="flex flex-col items-center justify-center gap-8 px-4">
        <div className="">
          <Image src={"/logo.png"} width={200} height={100} alt="Subs.NG" />
        </div>
        <div className="w-full max-w-125">{children}</div>
      </div>
    </div>
  );
}
