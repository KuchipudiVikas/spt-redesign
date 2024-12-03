import React from "react";
import MainLayout from "@/components/Layout";
import RegisterPage from "@/page_components/Auth/RegisterPage";

const Register = () => {
  return (
    <MainLayout
      title="Register - Self Publishing Titans"
      description="Register to Self Publishing Titans"
      keywords="register, self publishing titans"
      Title={<></>}
      Body={<RegisterPage />}
    />
  );
};

export default Register;
