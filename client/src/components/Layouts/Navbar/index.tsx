import MaxWidthContainer from "@/components/Wrapper/Maxwidth";
import Logo from "@/assets/clickuplogo.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-[#2B216A] py-4">
      <MaxWidthContainer>
        <div>
          <figure>
            <NavLink to={"/"}>
              <img src={Logo} alt="logo" className="h-14 w-14" />
            </NavLink>
          </figure>
        </div>
      </MaxWidthContainer>
    </nav>
  );
};

export default Navbar;
