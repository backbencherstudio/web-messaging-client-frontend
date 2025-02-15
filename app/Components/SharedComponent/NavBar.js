

const NavBar = () => {
    return (
        <div className="max-w-[1552px] mx-auto mt-6 px-4 2xl:px-0">
            <div className="w-full py-6 px-[96px] rounded-lg bg-global-gradient backdrop-blur-3xl flex justify-between items-center">
                <h1 className="text-[#070707] font-medium text-[32px] ">SayThat.sh</h1>

                {/* Theme Toggle & Sign In Button */}
                <div className="flex items-center space-x-6">
                    <button className="w-[54px] h-7 flex items-center bg-white rounded-[77px] p-[7px] border ">
                        <span className="w-[18px] h-[18px] bg-black rounded-full"></span>
                    </button>
                    <button className="bg-[#070707] border border-[#070707] text-[#E3E6EF] px-4 py-2 rounded-[99px]">Sign In</button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;