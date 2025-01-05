export default function ForgotPassword() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-md">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Forgot Password
          </h1>
          <p className="mt-4 text-center text-gray-600">
            Passwords can be reset by admin. <br />
            Please contact your local IT team.
          </p>
  
          {/* Back to Login Button */}
          <div className="mt-6">
            <a
              href="/login"
              className="block w-full px-4 py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    );
  }
  