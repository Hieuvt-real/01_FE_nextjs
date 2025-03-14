import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
