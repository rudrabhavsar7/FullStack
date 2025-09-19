import React, { useState } from 'react'
import { post } from '../api/client'

export function Login({ endpoint = '/user/login', onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.email || !form.password) {
      return setError('All fields are required')
    }

    setLoading(true)
    try {
      const res = await post(endpoint, { email: form.email, password: form.password })
      const data = res.data

      const token = data?.token
      if (token) {
        localStorage.setItem('token', token)
      }
      if (onSuccess) onSuccess({ token, user: data?.user })
    } catch (e) {
      const msg = e?.response?.data?.message || 'Login failed'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-semibold">Login</h2>
      {error && <div className="mb-3 rounded bg-red-50 p-2 text-red-700">{error}</div>}
      <label className="mb-3 block">
        <span className="mb-1 block text-sm text-gray-600">Email</span>
        <input className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring" type="email" name="email" value={form.email} onChange={onChange} autoComplete="email" />
      </label>
      <label className="mb-4 block">
        <span className="mb-1 block text-sm text-gray-600">Password</span>
        <input className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring" type="password" name="password" value={form.password} onChange={onChange} autoComplete="current-password" />
      </label>
      <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60">{loading ? 'Signing in...' : 'Login'}</button>
    </form>
  )
}
