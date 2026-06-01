import { useState } from "react"
import "./App.css"
import CustomCursor from "./components/CustomCursor"
import Navbar from "./components/Navbar"
import About from "./sections/About"
import Contact from "./sections/Contact"
import Experiences from "./sections/Experiences"
import Footer from "./sections/Footer"
import Home from "./sections/Home"
import Projects from "./sections/Projects"
import Skill from "./sections/Skill"
import Testimonials from "./sections/Testimonials"
import IntroAnimation from "./components/IntroAnimation"
const App = () => {

  const [introDone , setIndroDone] = useState(false)

  return (
    <>
    {!introDone && <IntroAnimation onFinish={() => setIndroDone(true)} />}
    {introDone && (
    <div className="relative gradients text-white">
      <CustomCursor />

      <Navbar />
      <Home />
      <About />
      <Skill />
      <Projects />
      <Experiences />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
    )}
    </>
  )
}

export default App
