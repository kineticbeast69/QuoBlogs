import logo from "../assets/logo.svg";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-col md:flex-row lg:flex-row  items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 bg-slate-600/75 text-white">
      <div className="flex items-center">
        <img src={logo} alt="quoblog_image" className="w-32 sm:w-24" />
        <span className="text-2xl">QuoBlog</span>
      </div>
      <p className="py-4 text-center text-sm md:text-base ">{`Copyright ${year} QuoBlog - All rights reserved.`}</p>
    </div>
  );
}
