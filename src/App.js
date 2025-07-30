
"use client"

import { useState } from "react"
import "./App.css" // Import App.css for animation styles
import { Button } from "./components/ui/Button"
import { Input } from "./components/ui/Input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/Card"
// Removed: import AnimatedBackground from "./components/AnimatedBackground"

// Function to construct image URL
export const getAssetPath = (filename) => `${process.env.PUBLIC_URL || ""}${filename}` // Exported for use in other components if needed

const photocards = [
  { id: 1, url: getAssetPath("/1.JPG"), alt: "Photocard 1" },
  { id: 2, url: getAssetPath("/2.JPG"), alt: "Photocard 2" },
  { id: 3, url: getAssetPath("/3.JPG"), alt: "Photocard 3" },
  { id: 4, url: getAssetPath("/4.JPG"), alt: "Photocard 4" },
  { id: 5, url: getAssetPath("/5.JPG"), alt: "Photocard 5" },
  { id: 6, url: getAssetPath("/6.JPG"), alt: "Photocard 6" },
  { id: 7, url: getAssetPath("/7.JPG"), alt: "Photocard 7" },
  { id: 8, url: getAssetPath("/8.JPG"), alt: "Photocard 8" },
  { id: 9, url: getAssetPath("/9.JPG"), alt: "Photocard 9" },
  { id: 10, url: getAssetPath("/10.JPG"), alt: "Photocard 10" },
  { id: 11, url: getAssetPath("/11.JPG"), alt: "Photocard 11" },
  { id: 12, url: getAssetPath("/12.JPG"), alt: "Photocard 12" },
  { id: 13, url: getAssetPath("/13.JPG"), alt: "Photocard 13" },
  { id: 14, url: getAssetPath("/14.JPG"), alt: "Photocard 14" },
  { id: 15, url: getAssetPath("/15.JPG"), alt: "Photocard 15" },
  { id: 16, url: getAssetPath("/16.JPG"), alt: "Photocard 16" },
  { id: 17, url: getAssetPath("/17.JPG"), alt: "Photocard 17" },
  { id: 18, url: getAssetPath("/18.JPG"), alt: "Photocard 18" },
]

// Define the repeating text for the watermark
const repeatingText = "ENHYPEN ".repeat(10) // Repeat "ENHYPEN " 10 times for one line

function App() {
  const [userName, setUserName] = useState("")
  const [drawnPhotocard, setDrawnPhotocard] = useState(null)
  const [isLoading, setIsLoading] = useState(false) // New loading state

  const handleDrawPhotocard = () => {
    if (userName.trim() === "") {
      alert("Please enter your name first!")
      return
    }
    setIsLoading(true) // Start loading animation

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * photocards.length)
      setDrawnPhotocard(photocards[randomIndex])
      setIsLoading(false) // End loading animation and show photocard
    }, 3000) // Increased to 3 seconds
  }

  const handleSavePhotocard = async () => {
    if (!drawnPhotocard) return

    try {
      const response = await fetch(drawnPhotocard.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      const filename = `${userName.replace(/\s/g, "_")}_${drawnPhotocard.alt.replace(/\s/g, "-")}.png`
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      alert("Photocard saved successfully!")
    } catch (error) {
      console.error("Failed to save photocard:", error)
      alert("Could not save the photocard. Please try again.")
    }
  }

  // Create an array of repeating text lines
  const backgroundLines = Array(15).fill(repeatingText) // 15 lines of repeating text

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 relative">
      {/* Repeating Background Text Watermark */}
      <div className="background-watermark">
        {backgroundLines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>

      {/* Removed: Website Logo */}
      {/* <div className="mb-6 z-10">
        <img
          src={getAssetPath("/main-logo.png") || "/placeholder.svg"}
          alt="Website Logo"
          width={150}
          height={150}
          className="rounded-full shadow-lg"
        />
      </div> */}

      {/* Main content, ensure z-index is higher than background-watermark */}
      <Card className="w-full max-w-md z-10">
        {isLoading ? (
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Drawing Photocard...</CardTitle>
            <CardDescription>Please wait... a member is coming to you ^^</CardDescription>
          </CardHeader>
        ) : drawnPhotocard ? (
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Congratulations, {userName}!</CardTitle>
          </CardHeader>
        ) : (
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Welcome ENGENE!</CardTitle>
            <CardDescription>Enter your name and draw a random photocard from DESIRE:UNLEASH album ^^</CardDescription>
          </CardHeader>
        )}
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative w-[200px] h-[300px] border-4 border-dashed border-border rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={getAssetPath("/desireunleash.jpg") || "/placeholder.svg"}
                  alt="Mystery photocard"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : drawnPhotocard ? (
            <div className="mt-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="relative w-[200px] h-[300px] border-4 border-primary rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={drawnPhotocard.url || getAssetPath("/placeholder.svg")}
                    alt={drawnPhotocard.alt}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
              <Button onClick={handleSavePhotocard} className="mt-4">
                Save Photocard
              </Button>
              <p className="text-muted-foreground text-sm">Please support our boys, ENHYPEN!</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Your Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button onClick={handleDrawPhotocard} className="w-full py-2 text-lg">
                Draw Photocard
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default App
