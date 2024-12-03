import Image from "@/components/ui/Image";
import Clickup from "@/assets/clickuplogo.png";
import Github from "@/assets/githublogo.png";
import { Icon } from "@iconify/react/dist/iconify.js";
const LoginHeader = () => {
  return (
    <section className="flex justify-center items-center gap-2">
      <Image src={Clickup} className="h-20 w-20" />
      <p className="text-5xl text-[#2B216A] mb-5">......</p>
      <Icon icon="iconoir:cloud-desync" className="text-5xl text-[#2B216A]" />
      <p className="text-5xl text-[#2B216A] mb-5">......</p>
      <Image src={Github} className="h-20 w-20" />
    </section>
  );
};

export default LoginHeader;

// icon = "iconoir:cloud-desync";
