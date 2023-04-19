import React, { useState, useEffect } from "react";
import Image from "next/image";
import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { UilEye, UilEyeSlash, UilArrowLeft } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { logIn, setUserData } from "@/slices/userSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const [openSetPasswordWindow, setOpenSetPasswordWindow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  var { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setOpenSetPasswordWindow(true);
    } else {
      setOpenSetPasswordWindow(false);
    }
  }, [session]);

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };

  const handlePhoneNumberChange = (e) => {
    const inputPhoneNumber = e.target.value;
    if (/^\d{0,10}$/.test(inputPhoneNumber)) {
      setPhoneNumber(inputPhoneNumber);
    }
  };

  const handleSignInWithGoogle = async () => {
    await signIn("google");
  };

  const SignUp = async () => {
    if (password === confirmPassword) {
      // making api request

      const userData = {
        name: session.user.name,
        email: session.user.email,
        password: password,
      };

      const options = {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await fetch(
          "http://localhost:3000/api/signup",
          options
        );
        const data = await response.json();
        if (data.success) {
          // after finally signing up
          dispatch(logIn());
          dispatch(setUserData(session.user));
          router.replace("/"); // redirecting to home page
          // raise toast
        } else {
          // raise toast
        }
      } catch (error) {
        console.error(error);
      }

      setPassword("");
      setConfirmPassword("");
    } else {
      setConfirmPassword("");
    }
  };

  return (
    <section className="Signup h-screen bg-blue-50/70 flex justify-center">
      <div className="signup-card bg-white my-2 w-full md:w-[370px] border border-gray-200 border-opacity-60 shadow-md">
        {/* top image */}
        <div className="top-image border-b border-gray-100 relative h-[30%]">
          <Image
            alt="Signup"
            fill
            style={{
              objectFit: "cover",
            }}
            src={"/assets/img/others/eazy.jpg"}
          />
          {openSetPasswordWindow && (
            <div
              className="back-button relative top-3 left-2 cursor-pointer"
              onClick={() => {
                signOut("google");
              }}
            >
              <UilArrowLeft className="h-7 w-7 font-semibold" />
            </div>
          )}
        </div>

        {/* buttons and labels */}
        {!openSetPasswordWindow && (
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
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                    src={"/assets/img/icons/google.svg"}
                  />
                </div>
                <span className="inline-block mx-4 text-gray-600 text-sm font-medium">
                  Sign up with Google
                </span>
              </div>
              <div className="continue-with-card py-2 my-2 flex items-center cursor-pointer border-2 border-gray-200 hover:border-gray-700">
                <div className="continue-with-icon relative w-8 h-8 inline-block mx-4">
                  <Image
                    alt="Apple"
                    fill
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
        )}

        {/* set password */}
        {openSetPasswordWindow && (
          <div className="signup-content py-8 px-8">
            {/* labels */}
            <div className="signup-labels my-2">
              <h2 className="text-gray-500 font-medium text-center">
                <span className="font-semibold text-2xl mx-1 text-gray-700">
                  Set Password
                </span>
              </h2>
            </div>

            {/* password input */}
            {/* input box */}
            <div className="password-input mt-6">
              <label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  className="text-gray-700 text-sm tracking-tight outline-none border-2 border-gray-200 py-3 w-full px-8 placeholder:text-sm focus:border-gray-800 appearance-none mt-2"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <span
                    className="text-gray-700 mx-2 mt-1 cursor-pointer"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {!showPassword && (
                      <UilEye className="h-6 w-6 font-semibold" />
                    )}
                    {showPassword && (
                      <UilEyeSlash className="h-6 w-6 font-semibold" />
                    )}
                  </span>
                </div>
              </div>
            </div>
            {/* confirm password input box */}
            <div className="confirm-password-input mt-6">
              <label
                htmlFor="confirm-password"
                className="text-gray-700 font-medium"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  className="text-gray-700 text-sm tracking-tight outline-none border-2 border-gray-200 py-3 w-full px-8 placeholder:text-sm focus:border-gray-800 appearance-none mt-2"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <span
                    className="text-gray-700 mx-2 mt-1 cursor-pointer"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {!showPassword && (
                      <UilEye className="h-6 w-6 font-semibold" />
                    )}
                    {showPassword && (
                      <UilEyeSlash className="h-6 w-6 font-semibold" />
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* signup button */}
            <div className="signup-button mt-6" onClick={SignUp}>
              <button className="bg-blue-500 text-white text-sm tracking-tight w-full py-3 uppercase font-semibold rounded hover:bg-blue-600 focus:bg-blue-600">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Signup;
