// "use client";

// import { FaEyeSlash } from "react-icons/fa6";
// import { MdRemoveRedEye } from "react-icons/md";
// import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
// import { MdOutlineCheckBox } from "react-icons/md";


// import { useState } from "react";


// export default function SignupForm() {

//   const [showPassword, setShowPassword] = useState([
//     {id: 1, value: false},
//     {id: 2, value: false}
//   ]);
//   const [showIcon, setShowIcon] = useState([
//     {id: 1, value: false},
//     {id: 2, value: false}
//   ])
//   const [check,setCheck] = useState(false)

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     location: "",
//     password: "",
//     confirmPassword: "",
//     agreed: false,
//   });

//   const formFields = [
//     {
//       id: 'name',
//       label: 'Your Name',
//       type: 'text',
//       placeholder: 'First name & last name',
//       fullWidth: true
//     },
//     {
//       id: 'email',
//       label: 'Your Email',
//       type: 'email',
//       placeholder: 'info@mail.com |',
//       fullWidth: true
//     },
//     {
//       id: 'location',
//       label: 'Your Location (optional)',
//       type: 'text',
//       placeholder: 'Area',
//       fullWidth: true
//     },
//     {
//       id: 'password',
//       label: 'Password',
//       type: 'password',
//       placeholder: '',
//       fullWidth: false
//     },
//     {
//       id: 'confirmPassword',
//       label: 'Confirm Password',
//       type: 'password',
//       placeholder: '',
//       fullWidth: false
//     }
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Signup Data:", formData);
//   };

//   const togglePasswordVisibility = (id) => {
//     console.log(id)
//     const update = showPassword.map((obj) => {
//       if (obj.id === id) {
//         return {
//           ...obj,
//           value: !obj.value,
//         }
//       }
//       return obj
//     })
//     setShowPassword(update);
//   };
//   console.log(showPassword[0].value)

//   const handleValue = (e, id) => {
//     console.log(id)
//     const update = showIcon.map((obj) => {
//       if (obj.id === id) {
//         return {
//           ...obj,
//           value: e.target.value ? true : false,
//         }
//       }
//       return obj
//     })
//     setShowIcon(update);
//   };

//   return (
//     <div>
//       <div
//         className=" lg:pt-[188px] md:pt-[156px] pt-[121px] dark:bg-[url('/bg.png')] bg-cover bg-no-repeat"
//       >
//         <div className="max-w-[896px] mx-auto px-5 2xl:px-0  md:pb-[115px] pb-[104px] leading-[130%] ">
//           <div>
//             <h1 className="text-[#070707] dark:text-[#FDFEFF] font-medium md:text-[28px] text-2xl lg:text-[32px] leading-[130%]">Create Your Account</h1>
//             <p className="text-c2 mt-3 leading-[130%] text-base dark:text-[#ECF0FE]">Register now to access your dashboard and manage your message post seamlessly</p>
//           </div>
//           <form onSubmit={handleSubmit} className="md:p-6 px-4 py-6 md:px-6 border dark:border-[#545460] rounded-[16px] md:mt-8 mt-6 dark:bg-custom-gradient">
//             <div className="flex flex-col gap-6">
//               {formFields
//                 .filter(field => field.type !== 'password')
//                 .map((field) => (
//                   <div
//                     key={field.id}
//                     className={`${field.fullWidth ? 'w-full' : 'md:w-1/2 w-full'} flex flex-col gap-3`}
//                   >
//                     <label htmlFor={field.id} className="text-base text-c2 dark:text-[#ECF0FE]">
//                       {field.label}
//                     </label>
//                     <input
//                       type={field.type}
//                       id={field.id}
//                       name={field.id}
//                       value={formData[field.id]}
//                       onChange={handleChange}
//                       placeholder={field.placeholder}
//                       className={`border ${field.id === "name" ? "border-c2  dark:border-[#C9CCD8] placeholder:text-c2 dark:placeholder:text-[#ECF0FE]" : "border-[#DFE1E7] placeholder:text-[#878991] dark:border-[#393C44] dark:text-[#878991] dark:placeholder:text-[#878991]"} rounded-[8px] md:p-6 px-6 py-5   dark:bg-[#0B0B0C]`}
//                     />
//                   </div>
//                 ))}

//               {/* Password fields container */}
//               <div className="flex md:flex-row flex-col gap-6">
//                 {formFields
//                   .filter(field => field.type === 'password')
//                   .map((field, index) => (
//                     <div key={field.id} className="flex flex-col gap-3 w-full">
//                       <label htmlFor={field.id} className="text-base text-c2 dark:text-[#ECF0FE]">
//                         {field.label}
//                       </label>
//                       <div className="relative ">
//                         <input
//                           onChange={(e) => handleValue(e, index + 1)}
//                           type={showPassword[index].value ? "text" : "password"} // Dynamically toggle type

//                           name="password"
//                           className="border dark:bg-[#0B0B0C] dark:border-[#393C44] rounded-[8px] md:p-6 px-6 py-5 placeholder:text-c2 w-full border-[#DFE1E7]"
//                         />

//                         {showIcon[index].value && (
//                           <button
//                             type="button"
//                             onClick={() => togglePasswordVisibility(index + 1)}
//                             className="absolute top-1/2 right-1 -translate-x-1/2 -translate-y-1/2 transform   text-[#2A2A2A]"
//                           >
//                             {showPassword[index].value ? <MdRemoveRedEye className='text-2xl dark:text-white' />
//                               : <FaEyeSlash className='text-2xl dark:text-white' />
//                             }
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>

//             <div className="mt-6 flex md:items-center items-start gap-[18px]">
//               <button onClick={() =>setCheck(!check)}>
//                 <div>
//                   {check ? <MdOutlineCheckBoxOutlineBlank className="text-2xl text-[#393C44]" /> :<MdOutlineCheckBox className="text-2xl text-[#393C44]" />}
//                 </div>
//               </button>
//               <label htmlFor="agreed" className="md:text-base text-[14px] text-c2 leading-[160%] dark:text-[#A8AAB4]">
//                 By agreeing to this, you acknowledge and accept the terms. Please note that this payment is non-refundable.
//               </label>
//             </div>
//             <div>
//               <button className="my-8 md:py-6 py-5 text-center w-full bg-[#070707] dark:bg-[#F3F6FE] dark:border dark:border-[#070707] dark:text-[#070707] text-white font-medium text-lg leading-normal rounded-[12px]" type="submit" text="Sign Up" disabled={check} > Sign Up</button>
//             </div>
//             <div>
//               <h2 className="text-c2 leading-[160%] dark:text-[#A8AAB4] text-base">Already have an account? <span className="font-medium text-[#070707]"><a href="" className="border-b border-[#070707] dark:text-[#FDFEFF]">Log in here</a></span></h2>
//             </div>
//           </form>
//         </div>

//       </div>
//     </div>
//   );
// }

"use client";



import { FaEyeSlash } from "react-icons/fa6";
import { MdRemoveRedEye } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";

export default function SignupForm({
  bgImage, // Background image URL
  formTitle = "Create Your Account",
  formSubHeader = "Register now to access your dashboard and manage your message post seamlessly.", // Form Title
  buttonText = "Sign Up", // Button text
  termsText = "By agreeing to this, you acknowledge and accept the terms. Please note that this payment is non-refundable.", // Terms text
  accountExist = "Already have an account? ",
  logs = "Log in here",
  forget,

  placeholderText = {
    email: "info@mail.com |",
    name: "First name & last name",
    location: "Area",
    password: "Password",
    confirmPassword: "Confirm Password",
  }, // Dynamic placeholders
  isSignIn = false, // Prop to differentiate Sign In or Sign Up
}) {

  // Adjust showPassword and showIcon for only one password field (Sign In)
  const [showPassword, setShowPassword] = useState([{ id: 1, value: false }]); // Initialize with one field
  const [showIcon, setShowIcon] = useState([{ id: 1, value: false }]); // Initialize with one icon
  const [check, setCheck] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  // Conditionally set the form fields for Sign In and Sign Up
  const formFields = [
    {
      id: "email",
      label: "Your Email",
      type: "email",
      placeholder: placeholderText.email,
      fullWidth: true,
    },
    ...(isSignIn ? [] : [ // Only add the 'name' and 'location' fields for Sign Up
      {
        id: "name",
        label: "Your Name",
        type: "text",
        placeholder: placeholderText.name,
        fullWidth: true,
      },
      {
        id: "location",
        label: "Your Location (optional)",
        type: "text",
        placeholder: placeholderText.location,
        fullWidth: true,
      }
    ]),
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: placeholderText.password,
      fullWidth: false,
    },
    ...(isSignIn ? [] : [
      {
        id: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: placeholderText.confirmPassword,
        fullWidth: false,
      }
    ]),
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isSignIn ? "Sign In Data:" : "Sign Up Data:", formData);
  };

  const togglePasswordVisibility = (id) => {
    // Safely toggle visibility
    const updatedPassword = [...showPassword];
    const passwordField = updatedPassword.find(p => p.id === id);
    if (passwordField) {
      passwordField.value = !passwordField.value;
      setShowPassword(updatedPassword);
    }
  };

  const handleValue = (e, id) => {
    // Safely check the value before accessing
    const updatedIcon = [...showIcon];
    const iconField = updatedIcon.find(i => i.id === id);
    if (iconField) {
      iconField.value = e.target.value ? true : false;
      setShowIcon(updatedIcon);
    }
  };

  return (
    <div>
      <div
        className="lg:pt-[188px] dark:bg-[url('/bg.png')] md:pt-[156px] pt-[121px] bg-cover bg-no-repeat"

      >
        <div className="max-w-[896px] mx-auto px-5 2xl:px-0 md:pb-[115px] pb-[104px] leading-[130%]">
          <div>
            <h1 className="text-[#070707] dark:text-[#FDFEFF] font-medium md:text-[28px] text-2xl lg:text-[32px] leading-[130%]">
              {formTitle}
            </h1>
            <p className="text-c2 mt-3 leading-[130%] text-base dark:text-[#ECF0FE]">
              {formSubHeader}
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="md:p-6 px-4 py-6 md:px-6 border dark:border-[#545460] rounded-[16px] md:mt-8 mt-6 dark:bg-custom-gradient"
          >
            <div className="flex flex-col gap-6">
              {formFields
                .filter((field) => field.type !== "password")
                .map((field) => (
                  <div
                    key={field.id}
                    className={`${field.fullWidth ? "w-full" : "md:w-1/2 w-full"} flex flex-col gap-3`}
                  >
                    <label htmlFor={field.id} className="text-base text-c2 dark:text-[#ECF0FE]">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className={`border ${field.id === "name"
                        ? "border-c2 dark:border-[#C9CCD8] placeholder:text-c2 dark:placeholder:text-[#ECF0FE]"
                        : "border-[#DFE1E7] placeholder:text-[#878991] dark:border-[#393C44] dark:text-[#878991] dark:placeholder:text-[#878991]"
                        } rounded-[8px] md:p-6 px-6 py-5 dark:bg-[#0B0B0C]  `} // Add dark styles here
                    />
                  </div>
                ))}

              {/* Password fields container */}
              <div className="flex md:flex-row flex-col gap-6">
                {formFields
                  .filter((field) => field.type === "password")
                  .map((field, index) => (
                    <div key={field.id} className="flex flex-col gap-3 w-full">
                      <label htmlFor={field.id} className="text-base text-c2 dark:text-[#ECF0FE]">
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          onChange={(e) => handleValue(e, index + 1)}
                          type={showPassword[index]?.value ? "text" : "password"} // Dynamically toggle type
                          name="password"
                          className="border dark:bg-[#0B0B0C] dark:border-[#393C44] rounded-[8px] md:p-6 px-6 py-5 placeholder:text-c2 w-full border-[#DFE1E7]"
                        />

                        {showIcon[index]?.value && (
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(index + 1)}
                            className="absolute top-1/2 right-1 -translate-x-1/2 -translate-y-1/2 transform text-[#2A2A2A]"
                          >
                            {showPassword[index]?.value ? (
                              <MdRemoveRedEye className="text-2xl dark:text-white" />
                            ) : (
                              <FaEyeSlash className="text-2xl dark:text-white" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="mt-6 flex md:items-center items-start gap-[18px]">
              <button onClick={() => setCheck(!check)}>
                <div>
                  {check ? (
                    <MdOutlineCheckBoxOutlineBlank className="text-2xl text-[#393C44] dark:text-[#A8AAB4]" />
                  ) : (
                    <MdOutlineCheckBox className="text-2xl text-[#393C44] dark:text-[#A8AAB4]" />
                  )}
                </div>
              </button>
              <label
                htmlFor="agreed"
                className="md:text-base text-[14px] text-c2 leading-[160%] dark:text-[#A8AAB4]"
              >
                {termsText}
              </label>
            </div>
            <div>
              <button
                className="my-8 md:py-6 py-5 text-center w-full bg-[#070707] dark:bg-[#F3F6FE] dark:border dark:border-[#070707] dark:text-[#070707] text-white font-medium text-lg leading-normal rounded-[12px]"
                type="submit"
                disabled={check}
              >
                {buttonText}
              </button>
            </div>
            <div>
            {forget && (
              <div>
                <a href="#" className="text-[#393C44] dark:text-[#ECF0FE] text-base font-medium">
                  {forget}
                </a>
              </div>
            )}
              <h2 className="text-c2 leading-[160%] dark:text-[#A8AAB4] text-base">
                {accountExist}
                <span className="font-medium text-[#070707]">
                  <Link href="/auth/signin" className="border-b border-[#070707] dark:text-[#FDFEFF] dark:border-[#A8AAB4]">
                    {logs}
                  </Link>

                </span>
              </h2>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

