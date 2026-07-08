import React from 'react';

export default function SocialButtons({ mode }) {
  const actionText = mode === 'login' ? 'Log in' : 'Sign up';
  
  return (
    <div className="flex flex-col gap-3 font-inter">
      <button className="relative flex items-center justify-center gap-3 w-full py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] text-zinc-300 transition-colors duration-300 cursor-target group">
        <svg className="w-[17px] h-[17px] opacity-70 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.62-1.49 3.608-2.947 1.146-1.674 1.618-3.297 1.644-3.376-.039-.013-3.155-1.213-3.181-4.836-.026-3.039 2.48-4.502 2.597-4.58-1.545-2.261-3.934-2.52-4.752-2.585-2.078-.182-4.14 1.258-4.947 1.258zm-.39-1.298c.844-.987 1.415-2.364 1.26-3.738-1.182.052-2.645.792-3.515 1.804-.707.82-1.35 2.22-.169 3.557 1.309.09 2.598-.65 3.424-1.623z"/>
        </svg>
        <span className="text-[13px] font-medium">{actionText} with Apple</span>
      </button>

      <button className="relative flex items-center justify-center gap-3 w-full py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] text-zinc-300 transition-colors duration-300 cursor-target group">
        <svg className="w-[17px] h-[17px] opacity-70 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span className="text-[13px] font-medium">{actionText} with Google</span>
      </button>
    </div>
  );
}
