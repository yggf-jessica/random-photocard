
"use client"

import { useState } from "react"
import "./App.css" // Import App.css for animation styles
import { Button } from "./components/ui/Button"
import { Input } from "./components/ui/Input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/Card"

// Function to construct image URL
const getAssetPath = (filename) => `${process.env.PUBLIC_URL || ""}${filename}`

const photocards = [
  { id: 1, url: getAssetPath("/IMG_1984.JPG"), alt: "Photocard 1984" },
  { id: 2, url: getAssetPath("/IMG_1985.JPG"), alt: "Photocard 1985" },
  { id: 3, url: getAssetPath("/IMG_1986.JPG"), alt: "Photocard 1986" },
  { id: 4, url: getAssetPath("/IMG_1987.JPG"), alt: "Photocard 1987" },
  { id: 5, url: getAssetPath("/IMG_1988.JPG"), alt: "Photocard 1988" },
  { id: 6, url: getAssetPath("/IMG_1989.JPG"), alt: "Photocard 1989" },
  { id: 7, url: getAssetPath("/IMG_1991.JPG"), alt: "Photocard 1991" },
  { id: 8, url: getAssetPath("/IMG_1996.JPG"), alt: "Photocard 1996" },
  { id: 9, url: getAssetPath("/IMG_1997.JPG"), alt: "Photocard 1997" },
  { id: 10, url: getAssetPath("/IMG_1998.JPG"), alt: "Photocard 1998" },
  { id: 11, url: getAssetPath("/IMG_1999.JPG"), alt: "Photocard 1999" },
  { id: 12, url: getAssetPath("/IMG_2001.JPG"), alt: "Photocard 2001" },
  { id: 13, url: getAssetPath("/IMG_2002.JPG"), alt: "Photocard 2002" },
  { id: 14, url: getAssetPath("/IMG_2003.JPG"), alt: "Photocard 2003" },
]

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <Card className="w-full max-w-md">
        {/* Conditional CardHeader based on state */}
        {isLoading ? (
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Drawing Photocard...</CardTitle>
            <CardDescription>Please wait... a member is coming to you ^^</CardDescription>
          </CardHeader>
        ) : drawnPhotocard ? (
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Congratulations, {userName}!</CardTitle>
            {/* No CardDescription here for the drawn state, as per previous requests */}
          </CardHeader>
        ) : (
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Welcome ENGENE!</CardTitle>
            <CardDescription>Enter your name and draw a random photocard from DESIRE:UNLEASH album ^^</CardDescription>
          </CardHeader>
        )}

        {/* Conditional CardContent based on state */}
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative w-[200px] h-[300px] border-4 border-dashed border-border rounded-lg overflow-hidden flex items-center justify-center">
                {/* Mystery photocard box with image */}
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
