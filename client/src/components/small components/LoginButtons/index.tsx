import { Button } from "@/components/ui/button";

const LoginButton = () => {
  const handleLogin = async () => {
    window.location.href = "http://localhost:5000/auth/login";
  };
  return (
    <section>
      <Button
        onClick={handleLogin}
        className="bg-[#2B216A] hover:bg-[#4d419a] px-4 w-full py-2 text-white rounded-md"
      >
        Login Now
      </Button>
    </section>
  );
};

export default LoginButton;
