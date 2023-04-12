import React, { useState } from "react";
import Image from "next/image";
import { signIn, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const handlePhoneNumberChange = (e) => {
    const inputPhoneNumber = e.target.value;
    if (/^\d{0,10}$/.test(inputPhoneNumber)) {
      setPhoneNumber(inputPhoneNumber);
    }
  };

  const { data: session } = useSession();
  if (session) {
    console.log(session);
  }

  const handleSignInWithGoogle = async () => {
    await signIn("google");
  };

  return (
    <section className="Signup h-screen bg-blue-50/70 flex justify-center">
      <div className="signup-card bg-white my-2 w-full md:w-auto border border-gray-200 border-opacity-60 shadow-md">
        {/* top image */}
        <div className="top-image border-b border-gray-100 relative h-[30%]">
          <Image
            alt="Signup"
            layout="fill"
            style={{
              objectFit: "cover",
            }}
            src={"/assets/img/others/eazy.jpg"}
          />
        </div>
        {/* buttons and labels */}
        <div className="signup-content py-8 px-8">
          {/* labels */}
          <div className="signup-labels my-2">
            <h2 className="text-gray-500 font-medium text-center">
              <span className="font-semibold text-2xl mx-1 text-gray-700">
                Sign Up
              </span>
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

          {/* signup instead */}
          <div className="trouble-signing-in mt-4">
            <span className="text-xs text-gray-500 tracking-tight">
              Already have an account?
              <span
                className="text-blue-500 text-sm font-semibold ml-2 cursor-pointer"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Login
              </span>
            </span>
          </div>

          {/* or */}
          <div className="flex mb-6 items-center mt-6">
            <div className="w-full h-px bg-gray-300"></div>
            <span className="mx-4 text-xs text-gray-500 font-medium">OR</span>
            <div className="w-full h-px bg-gray-300"></div>
          </div>

          {/* continue with google & apple */}
          <div className="continue-with mt-4">
            {/* continue with google */}
            <div
              className="continue-with-card py-2 my-2 flex items-center cursor-pointer border-2 border-gray-200 hover:border-gray-700"
              onClick={handleSignInWithGoogle}
            >
              <div className="continue-with-icon relative w-8 h-8 inline-block mx-4">
                <Image
                  alt="Google"
                  layout="fill"
                  style={{
                    objectFit: "cover",
                  }}
                  src={"/assets/img/icons/google.svg"}
                />
              </div>
              <span className="inline-block mx-4 text-gray-600 text-sm font-medium">
                Sign up With Google
              </span>
            </div>
            <div className="continue-with-card py-2 my-2 flex items-center cursor-pointer border-2 border-gray-200 hover:border-gray-700">
              <div className="continue-with-icon relative w-8 h-8 inline-block mx-4">
                <Image
                  alt="Apple"
                  layout="fill"
                  style={{
                    objectFit: "cover",
                  }}
                  src={"/assets/img/icons/apple.svg"}
                />
              </div>
              <span className="inline-block mx-4 text-gray-600 text-sm font-medium">
                Sign up With Apple
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
