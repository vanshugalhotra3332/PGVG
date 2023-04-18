import React, { useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logIn, setUserData } from "@/slices/userSlice";
import { UilArrowLeft } from "@iconscout/react-unicons";

const Login = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const [openOTPwindow, setOpenOTPwindow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const handlePhoneNumberChange = (e) => {
    const inputPhoneNumber = e.target.value;
    if (/^\d{0,10}$/.test(inputPhoneNumber)) {
      setPhoneNumber(inputPhoneNumber);
    }
  };

  const { data: session } = useSession();

  const LoginWithGoogle = async () => {
    await signIn("google");
  };

  const loginWithPhone = async () => {
    if (phoneNumber.length) {
      setOpenOTPwindow(true);
    }
  };

  const sendLoginRequest = async (options) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", options);
      const data = await response.json();
      // after finally logging in,
      if (data.success) {
        dispatch(logIn());
        dispatch(setUserData(session.user));
        router.replace("/"); // redirecting to home page
      } else {
        // raise toast
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (session) {
    const userData = {
      email: session.user.email,
      verifiedByGoogle: true,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    sendLoginRequest(options);
    // raise a toast
  }

  return (
    <section className="login h-screen bg-blue-50/70 flex justify-center">
      <div className="login-card bg-white my-2 w-full md:w-[370px] border border-gray-200 border-opacity-60 shadow-md">
        {/* top image */}
        <div className="top-image border-b border-gray-100 relative h-[30%]">
          <Image
            alt="Login"
            layout="fill"
            style={{
              objectFit: "cover",
            }}
            src={"/assets/img/others/eazy.jpg"}
          />
          {openOTPwindow && (
            <div
              className="back-button relative top-3 left-2 cursor-pointer"
              onClick={() => {
                setOpenOTPwindow(false);
              }}
            >
              <UilArrowLeft className="h-7 w-7 font-semibold" />
            </div>
          )}
        </div>
        {/* buttons and labels */}
        {!openOTPwindow && (
          <div className="login-content py-8 px-8">
            {/* labels */}
            <div className="login-labels my-2">
              <h2 className="text-gray-500 font-medium text-center">
                <span className="font-semibold text-2xl mx-1 text-gray-700">
                  Login
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
            <div className="continue-button mt-6" onClick={loginWithPhone}>
              <button className="bg-blue-500 text-white text-sm tracking-tight w-full py-3 uppercase font-semibold rounded hover:bg-blue-600 focus:bg-blue-600">
                Continue
              </button>
            </div>

            {/* signup instead */}
            <div className="trouble-signing-in mt-4">
              <span className="text-xs text-gray-500 tracking-tight">
                Don&apos;t have an account?
                <span
                  className="text-blue-500 text-sm font-semibold ml-2 cursor-pointer"
                  onClick={() => {
                    router.push("/signup");
                  }}
                >
                  Sign Up
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
                onClick={LoginWithGoogle}
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
                  Login with Google
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
                  Login with Apple
                </span>
              </div>
            </div>
          </div>
        )}

        {openOTPwindow && (
          <div className="login-content py-8 px-8">
            {/* labels */}
            <div className="login-labels my-2">
              <h2 className="text-gray-500 font-medium text-center">
                <span className="font-semibold text-2xl mx-1 text-gray-700">
                  Verification Code
                </span>
              </h2>
            </div>

            {/* code send text*/}
            <div className="terms-conditions mt-5">
              <span className="text-sm text-center inline-block text-gray-600 leading-relaxed">
                We have sent the verification code to your Mobile Number
              </span>
              <p className="mobile text-center text-xl text-blue-700 py-4 tracking-widest">
                {phoneNumber}
              </p>
            </div>

            {/* continue button */}
            <div className="continue-button mt-6">
              <button className="bg-blue-500 text-white text-sm tracking-tight w-full py-3 uppercase font-semibold rounded hover:bg-blue-600 focus:bg-blue-600">
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
