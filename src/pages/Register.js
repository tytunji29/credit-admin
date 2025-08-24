import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <input type="text" placeholder="Full Name" className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600" />
        <input type="email" placeholder="Email" className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600" />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600" />
        <button className="w-full bg-green-500 p-2 rounded hover:bg-green-600">Register</button>
        <p className="mt-4 text-sm">
          Already have an account? <Link to="/" className="text-blue-400">Login</Link>
        </p>
      </div>
    </div>
  );
}
