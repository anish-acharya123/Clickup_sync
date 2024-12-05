import MaxWidthContainer from "@/components/Wrapper/Maxwidth";

const DashBoard = () => {
  return (
    <MaxWidthContainer>
      <div className=" ">
        <div className="flex gap-4 w-full ">
          <div className=" w-full text-center ">
            <h1 className="text-5xl">Welcome <span className="font-medium">Anish</span></h1>
          </div>
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default DashBoard;
