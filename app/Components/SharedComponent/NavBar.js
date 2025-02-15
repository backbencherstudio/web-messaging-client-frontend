import ThemeToggle from "../context/ThemeToggle";


const NavBar = () => {
    return (
       <div className="absolute top-0 left-0 w-full">
         <div className="max-w-[1552px] mx-auto mt-6 px-4 2xl:px-0 relative">
            <div className="rounded-full absolute -translate-y-[648px] left-1/2 -translate-x-1/2   backdrop-effect">

            </div>
            <div className="w-full py-6 2xl:px-[96px] xl:px-[56px] px-6 rounded-[12px] bg-nav-gradient backdrop-blur-3xl dark:bg-nav-dark-gradient flex justify-between items-center">
                <h1 className="text-[#070707] dark:text-white font-medium text-[32px] ">SayThat.sh</h1>

                {/* Theme Toggle & Sign In Button */}
                <div className="flex items-center space-x-6">
                    {/* <button className="w-[54px] h-[28px] flex items-center bg-white rounded-[77px] p-[7px] border ">
                        <span className="w-[18px] h-[18px] bg-black rounded-full"></span>
                    </button> */}
                    <ThemeToggle></ThemeToggle>
                    <button className="bg-[#070707] border border-[#070707] text-[#E3E6EF] px-6 py-[10px] text-base font-medium rounded-[99px]">Sign In</button>
                </div>
            </div>
        </div>
       </div>
    );
};

export default NavBar;