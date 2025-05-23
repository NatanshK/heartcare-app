// src/components/HomePage.js
import React from 'react';

export default function HomePage() {
  return (
    <div
      className="relative flex w-full min-h-screen flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="flex h-full flex-grow flex-col">
        {/* ─── HEADER ───────────────────────────────────────────────────── */}
        <header className="flex items-center justify-between border-b border-[#f4f0f1] px-10 py-3">
          <div className="flex items-center gap-4 text-[#181112]">
            <div className="w-8 h-8">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-[#181112] text-lg font-bold">HeartCare</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <nav className="flex items-center gap-9 text-[#181112] text-sm font-medium">
              <a href="/how-it-works">How it works</a>
              <a href="/pricing">Pricing</a>
              <a href="/faqs">FAQs</a>
            </nav>
            <div className="flex gap-2">
              <button className="rounded-xl bg-[#e61942] px-4 py-2 text-sm font-bold text-white">
                Log in
              </button>
              <button className="rounded-xl bg-[#f4f0f1] px-4 py-2 text-sm font-bold text-[#181112]">
                Sign up
              </button>
            </div>
          </div>
        </header>

        {/* ─── MAIN CONTENT ─────────────────────────────────────────────── */}
        <main className="flex flex-1 justify-center px-40 py-5">
          <div className="flex max-w-[960px] flex-1 flex-col">
            {/* Hero */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-[18rem] flex-col gap-3">
                <p className="text-[#181112] text-2xl font-bold">
                  Detect atrial fibrillation with ECG data
                </p>
                <p className="text-[#88636a] text-sm">
                  Upload a 12-lead ECG CSV file and we'll analyze it for atrial fibrillation
                </p>
              </div>
            </div>

            {/* Instructions */}
            <section className="px-4">
              <h3 className="text-lg font-bold">Instructions for CSV format</h3>
              <p className="pb-3 pt-1 text-base">
              Please ensure that the CSV file contains 12 columns, organized in the following order: I, II, III, aVR, aVL, aVF, V1, V2, V3, V4, V5, and V6. Each column must contain a minimum of 5000 rows, and the ECG frequency should be 500 Hz.
              </p>
              <button className="mb-6 rounded-xl bg-[#f4f0f1] px-5 py-3 font-bold">
                Download sample CSV
              </button>
            </section>

            {/* File Upload */}
            <section className="px-4">
              <h3 className="text-lg font-bold pb-2 pt-4">Upload your CSV file</h3>
              <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#e61942] px-5 py-3 text-white">
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => console.log(e.target.files[0])}
                />
                {/* folder icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M216,72H131.31L104,44.69A15.86,15.86,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.4,15.4,0,0,0,39.38,216H216.89A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM40,56H92.69l16,16H40ZM216,200H40V88H216Z"/>
                </svg>
                <span>Choose file</span>
              </label>
              <p className="pb-3 pt-1">or drag and drop the file here</p>
              <button className="rounded-xl bg-[#e61942] px-4 py-2 text-sm font-bold text-white">
                Start analysis
              </button>
            </section>

            {/* Results */}
            <section className="px-4 pt-4">
              <h3 className="text-lg font-bold">Results</h3>
              <p>No results yet. Upload a file to start analysis.</p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
