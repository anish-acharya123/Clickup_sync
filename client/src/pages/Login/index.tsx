import LoginButton from "@/components/small components/LoginButtons";
import LoginHeader from "@/components/small components/LoginHeader";
import MaxWidthContainer from "@/components/Wrapper/Maxwidth";

const Login = () => (
  <div className="py-44 ">
    <MaxWidthContainer>
      <div className="flex justify-center flex-col items-center  gap-10">
        <section className="space-y-4 text-center">
          <h1 className="text-6xl font-bold">The everything app, for work.</h1>
          <p className="text-2xl ">
            Sync your tasks seamlessly between{" "}
            <span className="font-bold uppercase">ClickUp</span> and{" "}
            <span className="font-bold uppercase">GitHub</span>
          </p>
        </section>
        <LoginHeader />
        <LoginButton />
      </div>
    </MaxWidthContainer>
  </div>
);

export default Login;
