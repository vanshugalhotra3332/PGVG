import React, { useState } from "react";
import Image from "next/image";

const Login_signup = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (e) => {
    const inputPhoneNumber = e.target.value;
    if (/^\d{0,10}$/.test(inputPhoneNumber)) {
      setPhoneNumber(inputPhoneNumber);
    }
  };

  return (
    <section className="login_signup h-screen bg-blue-50 flex justify-center">
      <div className="login-signup-card bg-white w-[25vw] my-6 border border-gray-200 border-opacity-60">
        {/* top image */}
        <div className="top-image border-b border-gray-100 relative h-[30%]">
          <Image
            alt="Login Signup"
            layout="fill"
            style={{
              objectFit: "cover",
            }}
            src={"/assets/img/others/eazy.jpg"}
          />
        </div>
        {/* buttons and labels */}
        <div className="login-content py-8 px-8">
          {/* labels */}
          <div className="login-signup-labels my-2">
            <h2 className="text-gray-500 font-medium">
              <span className="font-semibold text-xl mx-1 text-gray-700">
                Login
              </span>{" "}
              or{" "}
              <span className="font-semibold text-xl mx-1 text-gray-700">
                Signup
              </span>{" "}
            </h2>
          </div>
          {/* input box */}
          <div className="phone-input mt-6 relative">
            <input
              type="text"
              className="text-gray-700 text-sm tracking-tight outline-none border border-gray-200 py-3 w-full px-14 placeholder:text-sm focus:border-gray-800 appearance-none"
              placeholder="Mobile Number*"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            <div className="absolute inset-y-0 left-1 flex items-center">
              <span className="text-gray-500 mx-2 text-sm">
                +91{" "}
                <span className="text-gray-500 text-sm mx-1 font-thin mb-1">
                  |
                </span>
              </span>
            </div>
          </div>
          {/* terms & conditions */}
          <div className="terms-conditions mt-5">
            <span className="text-xs text-gray-500 tracking-tight">
              By Continuing, I agree to the{" "}
              <span className="text-blue-500 font-semibold mr-1 cursor-pointer">
                Terms of Use
              </span>{" "}
              &
              <span className="text-blue-500 font-semibold ml-1 cursor-pointer">
                Privacy Policy
              </span>
            </span>
          </div>

          {/* continue button */}
          <div className="continue-button mt-6">
            <button className="bg-blue-500 text-white text-sm tracking-tight w-full py-3 uppercase font-semibold rounded hover:bg-blue-600 focus:bg-blue-600">
              Continue
            </button>
          </div>

          {/* getting trouble */}
          <div className="trouble-signing-in mt-4">
            <span className="text-xs text-gray-500 tracking-tight">
              Have trouble loggin in ?
              <span className="text-blue-500 font-semibold ml-1 cursor-pointer">
                Get Help
              </span>{" "}
            </span>
          </div>

          {/* or */}
          <div class="flex mb-6 items-center mt-6">
            <div class="w-full h-px bg-gray-300"></div>
            <span class="mx-4 text-xs text-gray-500 font-medium">OR</span>
            <div class="w-full h-px bg-gray-300"></div>
          </div>

          <div className="continue-with mt-4">

          </div>

        </div>
      </div>
    </section>
  );
};

export default Login_signup;
