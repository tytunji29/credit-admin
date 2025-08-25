import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/allApi";
import { showAlert } from "../alert";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };
      const res = await login(payload);
      // if success
      if (res.status === 200 || res.status === 201) {
        sessionStorage.setItem("token", res.data.data.token);
        sessionStorage.setItem("fullName", res.data.data.fullName);
        sessionStorage.setItem("userId", res.data.data.id);
        showAlert("success", "Welcome!", "Login successfully.");
        navigate("/dashboard"); // redirect to dashboard
      }
    } catch (err) {
      console.error(err);
      showAlert(
        "error",
        "Login Failed",
        err.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600 text-white font-semibold"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
