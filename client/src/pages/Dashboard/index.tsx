import Sidebar from "@/components/Layouts/SideBar";
import MaxWidthContainer from "@/components/Wrapper/Maxwidth";

const DashBoard = () => {
  return (
    <div className=" ">
      <MaxWidthContainer>
        <div className="flex gap-4 w-full ">
          <Sidebar />
          <div className="border w-3/4 bg-white">dashboard</div>
        </div>
      </MaxWidthContainer>
    </div>
  );
};

export default DashBoard;
