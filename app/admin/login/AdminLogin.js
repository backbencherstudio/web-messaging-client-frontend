import SignupForm from "../../auth/signup/SignupForm";


const AdminLogin = () => {
    return (
        <div className="flex h-screen">
            <div className=" w-[37%] bg-[#FDFEFF] md:pr-[20px] lg:pr-[40px]  md:flex hidden flex-col justify-between ">
                <div className="lg:pt-[104px] md:pt-[60px] md:pl-[40px] lg:pl-[83px]">
                    <a href="" className="lg:text-[35.81px] md:text-[28px] text-2xl font-medium leading-normal ">
                        SayThat.sh
                    </a>
                </div>
                <div>
                    <img className="w-full " src="/Group.png" alt="" />
                </div>
            </div>
            <div className="xl:w-[48%] lg:w-[56%] md:w-[70%] mx-auto">
                <SignupForm
                    bgImage="/path-to-signin-bg.png"
                    formTitle="Admin Log In"
                    formSubHeader="Welcome back! Please enter your credentials to access your dashboard."
                    buttonText="Sign In"
                    accountExist=""
                    logs=""
                    forget="Forgot Password?"
                    placeholderText={{
                        email: "Enter your email",
                        password: "Enter your password",
                    }}
                    isSignIn={true}
                />

            </div>
        </div>
    );
};

export default AdminLogin;