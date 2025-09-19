import React, { useState } from "react";
import { post } from "../api/client";

export function Register({ endpoint = "/user/signup", onSuccess }) {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.email || !form.password) {
      return setError("All fields are required");
    }
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    try {
      const { data } = await post(endpoint, { username: form.username, email: form.email, password: form.password });
      if (onSuccess) onSuccess(data);
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-semibold">Create account</h2>
      {error && <div className="mb-3 rounded bg-red-50 p-2 text-red-700">{error}</div>}
      <label className="mb-3 block">
        <span className="mb-1 block text-sm text-gray-600">Username</span>
        <input className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring" name="username" value={form.username} onChange={onChange} autoComplete="username" />
      </label>
      <label className="mb-3 block">
        <span className="mb-1 block text-sm text-gray-600">Email</span>
        <input className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring" type="email" name="email" value={form.email} onChange={onChange} autoComplete="email" />
      </label>
      <label className="mb-3 block">
        <span className="mb-1 block text-sm text-gray-600">Password</span>
        <input className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring" type="password" name="password" value={form.password} onChange={onChange} autoComplete="new-password" />
      </label>
      <label className="mb-4 block">
        <span className="mb-1 block text-sm text-gray-600">Confirm Password</span>
        <input className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring" type="password" name="confirmPassword" value={form.confirmPassword} onChange={onChange} autoComplete="new-password" />
      </label>
      <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60">{loading ? "Creating..." : "Register"}</button>
    </form>
  );
}