import React, { useState } from 'react'
import iitrLogo from '../assets/iitr_logo.svg'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileName, setFileName] = useState('or drag and drop the file here')
  const [predictionResult, setPredictionResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv')) {
        setSelectedFile(file)
        setFileName(file.name)
        setPredictionResult(null)
        setError('')
      } else {
        setSelectedFile(null)
        setFileName('Please upload a valid .csv file')
        setError('Invalid file type. Please upload a .csv file.')
        event.target.value = null
      }
    } else {
      setSelectedFile(null)
      setFileName('or drag and drop the file here')
    }
  }

  const handleStartAnalysis = async () => {
    if (!API_BASE_URL) {
      setError('API URL is not configured. Please check environment variables.')
      console.error('Error: REACT_APP_API_BASE_URL is not set.')
      return
    }
    if (!selectedFile) {
      setError('Please select a CSV file first.')
      return
    }

    setIsLoading(true)
    setError('')
    setPredictionResult(null)

    const formData = new FormData()
    formData.append('ecg_file', selectedFile)

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        body: formData,
      })

      setIsLoading(false)
      const responseData = await response.json()

      if (!response.ok) {
        const errorMessage = responseData.error || response.statusText || `HTTP error! status: ${response.status}`
        throw new Error(errorMessage)
      }
      
      setPredictionResult(responseData)
    } catch (err) {
      console.error('API Call error:', err)
      setIsLoading(false)
      setError(err.message || 'Failed to get prediction. Check console for details.')
    }
  }

  return (
    <div
      className="relative flex w-full min-h-screen flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="flex h-full flex-grow flex-col">
        <header className="flex items-center justify-between border-b border-[#f4f0f1] px-10 py-3">
          <div className="flex items-center gap-4 text-[#181112]">
            <div className="w-20 h-20">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_heartcare_logo)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_heartcare_logo">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-[#181112] text-lg font-bold">HeartCare</h2>
          </div>

          <div className="flex items-center gap-8">
            <nav className="flex items-center text-[#181112] text-sm font-medium">
              <a href="/how-it-works">How it works</a>
            </nav>
            
            <div className="flex items-center">
              <img 
                src={iitrLogo} 
                alt="IIT Roorkee Logo" 
                className="h-20 w-auto" 
              />
            </div>
          </div>
        </header>

        <main className="flex flex-1 justify-center px-4 sm:px-6 lg:px-40 py-5">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-[18rem] flex-col gap-3">
                <p className="text-[#181112] text-4xl font-bold">
                  Detect atrial fibrillation with ECG data
                </p>
                <p className="text-[#88636a] text-sm">
                  Upload a 12-lead ECG CSV file and we'll analyze it for atrial fibrillation
                </p>
              </div>
            </div>

            <section className="px-4">
              <h3 className="text-lg font-bold">Instructions for CSV format</h3>
              <div className="pb-3 pt-1 text-base text-gray-700">
                Please ensure your CSV file is formatted as follows:
                <ul className="list-disc list-outside pl-5 space-y-1 my-2">
                  <li>
                    <span>The <strong>first row must be the header row</strong>, containing the column names (e.g., "I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6").</span>
                  </li>
                  <li>
                    <span>Following the header, there must be exactly <strong>5000 rows of ECG data</strong>.</span>
                  </li>
                  <li>
                    <span>The file should contain <strong>12 columns</strong> corresponding to the standard 12 ECG leads, in the order: I, II, III, aVR, aVL, aVF, V1, V2, V3, V4, V5, and V6.</span>
                  </li>
                  <li>
                    <span>The ECG recording frequency should be <strong>500 Hz</strong>.</span>
                  </li>
                </ul>
              </div>
              <a
                href="/sample_ecg.csv"
                download="sample_ecg_for_afib_detector.csv"
                className="inline-block mb-6 rounded-xl bg-gray-100 px-5 py-3 font-bold text-gray-700 hover:bg-gray-200 transition-colors no-underline"
              >
                Download sample CSV
              </a>
            </section>

            <section className="px-4">
              <h3 className="text-lg font-bold pb-2 pt-4">Upload your CSV file</h3>
              <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#e61942] px-5 py-3 text-white w-max hover:bg-red-700 transition-colors">
                <input
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M216,72H131.31L104,44.69A15.86,15.86,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.4,15.4,0,0,0,39.38,216H216.89A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM40,56H92.69l16,16H40ZM216,200H40V88H216Z"/>
                </svg>
                <span>Choose file</span>
              </label>
              <p className="pb-3 pt-1 text-sm text-gray-600">{fileName}</p>
              
              <button 
                className="rounded-xl bg-[#e61942] px-4 py-2 text-sm font-bold text-white disabled:opacity-50 hover:bg-red-700 transition-colors"
                onClick={handleStartAnalysis}
                disabled={!selectedFile || isLoading}
              >
                {isLoading ? 'Analyzing...' : 'Start analysis'}
              </button>
            </section>

            {error && (
              <section className="px-4 pt-4">
                <div className="p-3 border border-red-300 bg-red-50 rounded-md">
                  <p className="text-red-700 font-semibold">Error: <span className="font-normal">{error}</span></p>
                </div>
              </section>
            )}

            <section className="px-4 pt-4">
              <h3 className="text-lg font-bold">Results</h3>
              {isLoading && <p className="text-gray-600">Loading results...</p>}
              {!isLoading && !predictionResult && !error && (
                <p className="text-gray-600">No results yet. Upload a file and click "Start analysis".</p>
              )}
              {predictionResult && (
                <div className="mt-2 p-4 border border-gray-200 rounded-md bg-gray-50 shadow-sm">
                  <p className="text-lg mb-1">
                    <strong>Prediction:</strong> 
                    <span className={`ml-1 font-bold ${predictionResult.prediction_label?.includes("Detected") ? "text-red-600" : "text-green-600"}`}>
                      {predictionResult.prediction_label}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <strong>Probability of Atrial Fibrillation:</strong> 
                    <span className="font-semibold ml-1">{(predictionResult.probability_afib * 100).toFixed(2)}%</span>
                  </p>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
