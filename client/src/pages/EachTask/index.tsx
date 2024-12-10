import EachTaskCard from "@/components/Layouts/EachTaskCard";
import MaxWidthContainer from "@/components/Wrapper/Maxwidth";

const EachTask = () => {
  return (
    <MaxWidthContainer>
      <div className=" mx-auto p-4 space-y-4">
        <EachTaskCard />
      </div>
    </MaxWidthContainer>
  );
};

export default EachTask;
