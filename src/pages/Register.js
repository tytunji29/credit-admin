import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, login } from "../api/allApi";
import { showAlert } from "../alert"; // ✅ from our SweetAlert util

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type === "text" ? "fullName" : e.target.type]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const payload ={
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      };
      const res = await register(payload);

      // if success
      if (res.status === 200 || res.status === 201) {
        showAlert("success", "Registered!", "Account created successfully.");
        navigate("/dashboard"); // redirect to dashboard
      }
    } catch (err) {
      console.error(err);
      showAlert("error", "Registration Failed", err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-white">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white"
          value={formData.fullName}
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          className="w-full bg-green-500 p-2 rounded hover:bg-green-600 text-white"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
