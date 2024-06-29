import LogoTitle from "@/components/auth/LogoTitle";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-lightBeige to-mediumBeige">
      <div className="-mt-16">
        <LogoTitle />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
