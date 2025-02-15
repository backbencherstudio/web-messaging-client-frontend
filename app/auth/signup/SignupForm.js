"use client";

import { FaEyeSlash } from "react-icons/fa6";
import { MdRemoveRedEye } from "react-icons/md";

import { useState } from "react";
// import TermsCheckbox from "./TermsCheckbox";
// import InputField from "@/components/InputField";
// import PasswordField from "@/components/PasswordField";
// import Button from "@/components/Button";

export default function SignupForm() {

  const [showPassword, setShowPassword] = useState([
    {
      id: 1, value: false
    },
    {
      id: 2, value: false
    }
  ]);
  const [showIcon, setShowIcon] = useState([
    {
      id: 1, value: false
    },
    {
      id: 2, value: false
    }
  ])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const formFields = [
    {
      id: 'name',
      label: 'Your Name',
      type: 'text',
      placeholder: 'First name & last name',
      fullWidth: true
    },
    {
      id: 'email',
      label: 'Your Email',
      type: 'email',
      placeholder: 'info@mail.com |',
      fullWidth: true
    },
    {
      id: 'location',
      label: 'Your Location (optional)',
      type: 'text',
      placeholder: 'Area',
      fullWidth: true
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: '',
      fullWidth: false
    },
    {
      id: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: '',
      fullWidth: false
    }
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
    console.log("Signup Data:", formData);
  };

  const togglePasswordVisibility = (id) => {
    console.log(id)
    const update = showPassword.map((obj) => {
      if (obj.id === id) {
        return {
          ...obj,
          value: !obj.value,
        }
      }
      return obj
    })
    setShowPassword(update);
  };
  console.log(showPassword[0].value)

  const handleValue = (e, id) => {
    console.log(id)
    const update = showIcon.map((obj) => {
      if (obj.id === id) {
        return {
          ...obj,
          value: e.target.value ? true : false,
        }
      }
      return obj
    })
    console.log(update)
    setShowIcon(update);
  };

  return (
    <div>
      <div className="bg-[#FDFEFF] dark:dark-bg mt-[188px]">



        <div className="max-w-[896px] mx-auto px-4 2xl:px-0 mt-[73px] mb-[115px] leading-[130%] ">
          <div>
            <h1 className="text-[#070707] dark:text-[#FDFEFF] font-medium md:text-[28px] text-2xl lg:text-[32px] leading-[130%]">Create Your Account</h1>
            <p className="text-c2 mt-3 leading-[130%] dark:text-[#ECF0FE]">Register now to access your dashboard and manage your message post seamlessly</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 border dark:border-[#545460] rounded-[16px] mt-8 dark:bg-custom-gradient">
            <div className="flex flex-col gap-6">
              {formFields
                .filter(field => field.type !== 'password')
                .map((field) => (
                  <div
                    key={field.id}
                    className={`${field.fullWidth ? 'w-full' : 'md:w-1/2 w-full'} flex flex-col gap-3`}
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
                      className={`border ${field.id === "name" ? "border-c2  dark:border-[#C9CCD8] placeholder:text-c2 dark:placeholder:text-[#ECF0FE]" : "border-[#DFE1E7] placeholder:text-[#878991] dark:border-[#393C44] dark:text-[#878991] dark:placeholder:text-[#878991]"} rounded-[8px] p-6  dark:bg-[#0B0B0C]`}
                    />
                  </div>
                ))}

              {/* Password fields container */}
              <div className="flex md:flex-row flex-col gap-6">
                {formFields
                  .filter(field => field.type === 'password')
                  .map((field, index) => (
                    <div key={field.id} className="flex flex-col gap-3 w-full">
                      <label htmlFor={field.id} className="text-base text-c2 dark:text-[#ECF0FE]">
                        {field.label}
                      </label>
                      {/* <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="border border-c2 rounded-[8px] p-6 placeholder:text-c2"
                    /> */}
                      <div className="relative ">
                        <input
                          onChange={(e) => handleValue(e, index + 1)}
                          type={showPassword[index].value ? "text" : "password"} // Dynamically toggle type

                          name="password"
                          className="border dark:bg-[#0B0B0C] dark:border-[#393C44] rounded-[8px] p-6 placeholder:text-c2 w-full border-[#DFE1E7]"
                        />

                        {showIcon[index].value && (
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(index + 1)}
                            className="absolute top-1/2 right-1 -translate-x-1/2 -translate-y-1/2 transform   text-[#2A2A2A]"
                          >
                            {showPassword[index].value ? <MdRemoveRedEye className='text-2xl dark:text-white' />
                              : <FaEyeSlash className='text-2xl dark:text-white' />
                            }
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-[18px]">
              <input
                type="checkbox"
                id="agreed"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                className=" h-5 w-5   border-[2px] border-c2 p-[2px]"
              />
              <label htmlFor="agreed" className="text-base text-c2 leading-[160%] dark:text-[#A8AAB4]">
                By agreeing to this, you acknowledge and accept the terms. Please note that this payment is non-refundable.
              </label>
            </div>
            <div>
              <button className="my-8 px-[64px] py-6 text-center w-full bg-[#070707] dark:bg-[#F3F6FE] dark:border dark:border-[#070707] dark:text-[#070707] text-white font-medium text-lg rounded-[12px]" type="submit" text="Sign Up" disabled={!formData.agreed} > Sign Up</button>
            </div>
            <div>
              <h2 className="text-c2 font-">Already have an account? <span className="font-medium text-[#070707]"><a href="" className="underline">Log in here</a></span></h2>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
