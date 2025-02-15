import SignupForm from "../signup/SignupForm";


const SignIn = () => {
    return (
        <div>
            <SignupForm
                bgImage="/path-to-signin-bg.png"
                formTitle="Sign In"
                formSubHeader="Welcome back! Please enter your credentials to access your dashboard."
                buttonText="Sign In"
                accountExist="Don't have an account? "
                logs="Register here"
                forget="Forgot Password?"
                placeholderText={{
                    email: "Enter your email",
                    password: "Enter your password",
                }}
                isSignIn={true}
            />

        </div>
    );
};

export default SignIn;