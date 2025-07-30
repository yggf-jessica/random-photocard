// Define the background elements with their properties
const backgroundElements = [
  // Letters of ENHYPEN
  {
    id: "e1",
    type: "text",
    content: "E",
    size: "text-9xl",
    color: "text-primary/20",
    x: "5%",
    y: "10%",
    delay: "0s",
    duration: "15s",
  },
  {
    id: "n1",
    type: "text",
    content: "N",
    size: "text-8xl",
    color: "text-secondary/20",
    x: "20%",
    y: "70%",
    delay: "2s",
    duration: "17s",
  },
  {
    id: "h1",
    type: "text",
    content: "H",
    size: "text-7xl",
    color: "text-accent/20",
    x: "40%",
    y: "20%",
    delay: "4s",
    duration: "14s",
  },
  {
    id: "y1",
    type: "text",
    content: "Y",
    size: "text-9xl",
    color: "text-primary/20",
    x: "60%",
    y: "85%",
    delay: "1s",
    duration: "16s",
  },
  {
    id: "p1",
    type: "text",
    content: "P",
    size: "text-8xl",
    color: "text-secondary/20",
    x: "75%",
    y: "5%",
    delay: "3s",
    duration: "13s",
  },
  {
    id: "e2",
    type: "text",
    content: "E",
    size: "text-7xl",
    color: "text-accent/20",
    x: "90%",
    y: "40%",
    delay: "5s",
    duration: "18s",
  },
  {
    id: "n2",
    type: "text",
    content: "N",
    size: "text-9xl",
    color: "text-primary/20",
    x: "15%",
    y: "50%",
    delay: "0.5s",
    duration: "15.5s",
  },

  // Abstract shapes (circles and squares for simplicity)
  {
    id: "s1",
    type: "shape",
    shape: "circle",
    size: "w-24 h-24",
    color: "bg-primary/10",
    x: "10%",
    y: "50%",
    delay: "1s",
    duration: "10s",
  },
  {
    id: "s2",
    type: "shape",
    shape: "square",
    size: "w-20 h-20",
    color: "bg-secondary/10",
    x: "70%",
    y: "20%",
    delay: "3s",
    duration: "12s",
  },
  {
    id: "s3",
    type: "shape",
    shape: "circle",
    size: "w-28 h-28",
    color: "bg-accent/10",
    x: "30%",
    y: "5%",
    delay: "5s",
    duration: "11s",
  },
  {
    id: "s4",
    type: "shape",
    shape: "square",
    size: "w-16 h-16",
    color: "bg-muted/10",
    x: "85%",
    y: "80%",
    delay: "2s",
    duration: "9s",
  },
  {
    id: "s5",
    type: "shape",
    shape: "circle",
    size: "w-22 h-22",
    color: "bg-primary/10",
    x: "50%",
    y: "60%",
    delay: "4s",
    duration: "13s",
  },
]

export default function AnimatedBackground() {
  return (
    <div className="animated-background-container">
      {backgroundElements.map((el) => (
        <div
          key={el.id}
          className={`animated-background-element absolute ${el.size} ${el.color} ${el.shape === "circle" ? "rounded-full" : ""}`}
          style={{
            left: el.x,
            top: el.y,
            animationDelay: el.delay,
            animationDuration: el.duration,
          }}
        >
          {el.type === "text" && el.content}
        </div>
      ))}
    </div>
  )
}
