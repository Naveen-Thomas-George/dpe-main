import React from 'react';
import AuthCard from './AuthCard';


export default function AuthPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-zinc-950 px-4 overflow-hidden pt-24 pb-16">
      {/* Left side purplish gradient */}
      <div className="absolute top-1/2 -left-[20%] w-[60%] h-[80%] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-purple-900/10 to-transparent blur-[100px] rounded-full pointer-events-none" />
      
      {/* Right side dark blue gradient */}
      <div className="absolute top-1/2 -right-[20%] w-[60%] h-[80%] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-sky-900/10 to-transparent blur-[100px] rounded-full pointer-events-none" />

      {/* Additional subtle center glow to connect them */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[50%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-zinc-950/0 to-transparent blur-[100px] pointer-events-none" />

      {/* Centered Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        <AuthCard />
      </div>
    </div>
  );
}
