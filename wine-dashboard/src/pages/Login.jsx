import { Lock, Sprout, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";

const DEMO_CREDENTIALS = {
    username: "admin",
    password: "pwd"
};

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigateTo = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        // login simulation
        if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
            localStorage.setItem('user_username', username);
            onLogin(username);
            navigateTo('/dashboard');
        } else {
            setError('Username o password incorretti.')
        }
    };

    const fillDemoCredentials = () => {
        setUsername(DEMO_CREDENTIALS.username);
        setPassword(DEMO_CREDENTIALS.password);
        setError("");
    };

    return (
        <div className="w-screen min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center bg-gradient-to-br from-green-600 to-blue-600 p-4 rounded-2xl mb-4 shadow-lg">
                        <Sprout className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-gray-900 mb-2">Wine Dashboard</h1>
                    <p className="text-gray-500">Environmental & Production Monitoring</p>
                </div>

                {/* Login Card */}
                <div className="p-8 bg-white shadow-xl rounded-lg">
                    <div className="mb-6">
                        <h2 className="text-gray-900 mb-2">Sign In</h2>
                        <p className="text-gray-500 text-sm">
                            Enter your credentials to access the dashboard
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-gray-700 text-sm font-medium">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-medium">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <button className="button" type="submit">Login</button>
                        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                    </form>

                    {/* Demo Credentials Info */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                                <Lock className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-blue-900 text-sm mb-2">Demo Credentials</p>
                                <div className="space-y-1 text-blue-700 text-sm">
                                    <p>
                                        <span className="opacity-70">Username:</span>{" "}
                                        <code className="bg-blue-100 px-2 py-0.5 rounded">{DEMO_CREDENTIALS.username}</code>
                                    </p>
                                    <p>
                                        <span className="opacity-70">Password:</span>{" "}
                                        <code className="bg-blue-100 px-2 py-0.5 rounded">{DEMO_CREDENTIALS.password}</code>
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={fillDemoCredentials}
                                    className="mt-3 w-full py-1.5 px-3 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-100 text-sm"
                                >
                                    Use Demo Credentials
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    © 2025 Wine Analytics Platform. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default Login;