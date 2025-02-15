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
    <div className="bg-[#FDFEFF]">
      {/* <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Create Your Account</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Register to manage your posts seamlessly.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Your Name" type="text" name="name" value={formData.name} onChange={handleChange} />
        <InputField label="Your Email" type="email" name="email" value={formData.email} onChange={handleChange} />
        <InputField label="Your Location (optional)" type="text" name="location" value={formData.location} onChange={handleChange} />
        <PasswordField label="Password" name="password" value={formData.password} onChange={handleChange} />
        <PasswordField label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        
        <TermsCheckbox checked={formData.agreed} onChange={handleChange} />

        <Button type="submit" text="Sign Up" disabled={!formData.agreed} />
      </form> */}

      <div className="max-w-[896px] mx-auto px-4 2xl:px-0 mt-[73px] mb-[115px] leading-[130%]">
        <div>
          <h1 className="text-[#070707] font-medium md:text-[28px] text-2xl lg:text-[32px] leading-[130%]">Create Your Account</h1>
          <p className="c2 mt-3 leading-[130%]">Register now to access your dashboard and manage your message post seamlessly</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 border rounded-[16px] mt-8">
          <div className="flex flex-col gap-6">
            {formFields
              .filter(field => field.type !== 'password')
              .map((field) => (
                <div
                  key={field.id}
                  className={`${field.fullWidth ? 'w-full' : 'md:w-1/2 w-full'} flex flex-col gap-3`}
                >
                  <label htmlFor={field.id} className="text-base c2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`border ${field.id === "name" ? "border-c2" : "border-[#DFE1E7]"} rounded-[8px] p-6 placeholder:text-c2`}
                  />
                </div>
              ))}

            {/* Password fields container */}
            <div className="flex md:flex-row flex-col gap-6">
              {formFields
                .filter(field => field.type === 'password')
                .map((field, index) => (
                  <div key={field.id} className="flex flex-col gap-3 w-full">
                    <label htmlFor={field.id} className="text-base c2">
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
                        className="border  rounded-[8px] p-6 placeholder:text-c2 w-full border-[#DFE1E7]"
                      />

                      {showIcon[index].value && (
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(index + 1)}
                          className="absolute top-1/2 right-1 -translate-x-1/2 -translate-y-1/2 transform   text-[#2A2A2A]"
                        >
                          {showPassword[index].value ? <MdRemoveRedEye className='text-2xl' />
                            : <FaEyeSlash className='text-2xl' />
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
            <label htmlFor="agreed" className="text-base c2">
              By agreeing to this, you acknowledge and accept the terms. Please note that this payment is non-refundable.
            </label>
          </div>
          <div>
            <button className="my-8 px-[64px] py-6 text-center w-full bg-[#070707] text-white font-medium text-lg rounded-[12px]" type="submit" text="Sign Up" disabled={!formData.agreed} > Sign Up</button>
          </div>
          <div>
            <h2 className="c2 font-">Already have an account? <span className="font-medium text-[#070707]"><a href="" className="underline">Log in here</a></span></h2>
          </div>
        </form>
      </div>

    </div>
  );
}
