
// Anime Video Website (Login + Razorpay + Upload Interface)

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fakeUser = {
  email: "user@example.com",
  password: "password123",
};

export default function Home() {
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [animeType, setAnimeType] = useState("face");
  const [videoStatus, setVideoStatus] = useState("");

  const handleLogin = () => {
    if (
      loginForm.email === fakeUser.email &&
      loginForm.password === fakeUser.password
    ) {
      setUser({ email: loginForm.email });
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  const handlePayment = async (plan) => {
    const options = {
      key: "RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
      amount: plan.amount * 100,
      currency: "INR",
      name: "Anime Video Generator",
      description: `${plan.name} Subscription`,
      handler: function (response) {
        alert("Payment Successful! Subscription Activated.");
      },
      prefill: {
        email: user?.email || "user@example.com",
      },
      theme: { color: "#F37254" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleGenerate = () => {
    if (!selectedFile) {
      alert("Please upload an image or story file.");
      return;
    }
    setVideoStatus("Generating your anime video...");
    setTimeout(() => {
      setVideoStatus("✅ Your anime video is ready! (This is a demo)");
    }, 3000);
  };

  const plans = [
    { name: "1 Month", amount: 299 },
    { name: "3 Months", amount: 599 },
    { name: "6 Months", amount: 999 },
    { name: "1 Year", amount: 1599 },
  ];

  if (!user) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-2 border rounded"
          value={loginForm.email}
          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-2 border rounded"
          value={loginForm.password}
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome, {user.email}</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Upload for Anime Video</h2>
        <input
          type="file"
          className="mb-2"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <select
          className="p-2 border rounded mb-2 block"
          value={animeType}
          onChange={(e) => setAnimeType(e.target.value)}
        >
          <option value="face">Face to Anime</option>
          <option value="avatar">Avatar Animation</option>
          <option value="story">Story-based</option>
        </select>
        <Button onClick={handleGenerate}>Generate Video</Button>
        {videoStatus && <p className="mt-2 text-green-600">{videoStatus}</p>}
      </div>

      <h2 className="text-xl font-semibold text-center mb-4">Subscription Plans</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className="rounded-2xl shadow-lg p-4">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-lg mb-4">₹{plan.amount}</p>
              <Button className="w-full" onClick={() => handlePayment(plan)}>
                Subscribe
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
