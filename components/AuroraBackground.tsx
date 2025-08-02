// components/AuroraBackground.tsx
"use client";

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Layer 1 */}
      <div className="absolute -top-32 -left-32 w-[800px] h-[800px] rounded-full 
        bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500 
        opacity-30 blur-3xl animate-[spin_60s_linear_infinite]" />
      
      {/* Layer 2 */}
      <div className="absolute -bottom-20 -right-40 w-[700px] h-[700px] rounded-full 
        bg-gradient-to-r from-blue-400 via-cyan-400 to-green-300 
        opacity-25 blur-3xl animate-[spin_90s_linear_infinite]" />

      {/* Layer 3 */}
      <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] 
        -translate-x-1/2 -translate-y-1/2 rounded-full 
        bg-gradient-to-br from-indigo-400 via-fuchsia-500 to-red-400 
        opacity-20 blur-3xl animate-[spin_120s_linear_infinite]" />
    </div>
  );
}
