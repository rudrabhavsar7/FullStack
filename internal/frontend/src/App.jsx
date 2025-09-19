import { useState } from 'react'
import { Register } from './components/Register'
import { Login } from './components/Login'

export default function App() {
  const [tab, setTab] = useState('login')
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mx-auto mb-6 flex w-full max-w-md rounded-lg bg-white p-1 shadow">
          <button onClick={() => setTab('login')} className={`flex-1 rounded-md px-4 py-2 text-sm font-medium ${tab==='login' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}>Login</button>
          <button onClick={() => setTab('register')} className={`flex-1 rounded-md px-4 py-2 text-sm font-medium ${tab==='register' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}>Register</button>
        </div>
        {tab === 'login' ? (
          <Login endpoint="/user/login" onSuccess={({ user }) => console.log('Logged in as', user?.email)} />
        ) : (
          <Register endpoint="/user/signup" onSuccess={({ user }) => console.log('Registered', user?.email)} />
        )}
      </div>
    </div>
  )
}
