import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="grid lg:grid-cols-2 h-screen">
      <div className="bg-primary h-full w-full hidden  lg:flex items-center justify-center">
        <div className="flex flex-col">
          <h1 className="font-bold text-white text-7xl">BEINCOM</h1>
          <span className="text-white text-xs">
            The Future Of Community Engagement
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <SignUp />
      </div>
    </div>
  );
}
