import ThemeToggle from "../context/ThemeToggle";

const NavBar = () => {
  const handleNavigation = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full">
      <div className="max-w-[1552px] mx-auto md:mt-6 mt-3 px-[6px] 2xl:px-0 relative">
        <div className="w-full md:py-6 py-[14px] 2xl:px-[96px] xl:px-[56px]  px-[14px] rounded-[12px] bg-nav-gradient backdrop-blur-3xl dark:bg-nav-dark-gradient flex justify-between items-center">
          <h1 className="text-[#070707] dark:text-white font-medium lg:text-[32px] text-2xl md:text-[28px]">
            SayThat.sh
          </h1>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleNavigation("home")}
              className="text-[#070707] dark:text-white"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("leaderboard")}
              className="text-[#070707] dark:text-white"
            >
              Leaderboard
            </button>
            <button
              onClick={() => handleNavigation("faq")}
              className="text-[#070707] dark:text-white"
            >
              FAQ
            </button>
            <button
              onClick={() => handleNavigation("about")}
              className="text-[#070707] dark:text-white"
            >
              About
            </button>
            <button
              onClick={() => handleNavigation("contact")}
              className="text-[#070707] dark:text-white"
            >
              Contact
            </button>
          </div>

          {/* Theme Toggle & Sign In Button */}
          <div className="flex items-center lg:space-x-6 space-x-4">
            <ThemeToggle></ThemeToggle>
            <button className="bg-[#070707] border border-[#070707] text-[#E3E6EF] px-6 py-[10px] text-base font-medium rounded-[99px] hidden md:block">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
