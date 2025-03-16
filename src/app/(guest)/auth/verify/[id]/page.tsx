import ActivateAccount from "@/components/auth/ActivateAccount";
import React from "react";

const VerifyPage = async ({ params }: { params: { id: string } }) => {
  return <ActivateAccount id={params.id} />;
};

export default VerifyPage;
