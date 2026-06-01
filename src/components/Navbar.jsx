import OverlayMenu from "./OverlayMenu";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/Logo.png";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setFroceVisible] = useState(false);

  const lastScrollY = useRef(0);
  const timerId = useRef(null);

  useEffect(() => {
    const homeSection = document.querySelector("#home");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting) {
          setFroceVisible(true)
          setVisible(true)
        }else {
          setFroceVisible(false)
        }
        
      },{threshold: 0.1}

    )

    if (homeSection) observer.observe(homeSection);

    return () => {
      if(homeSection) observer.unobserve(homeSection)
    }
      
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      if(forceVisible){
        setFroceVisible(true)
        return
      }

      const currentScrollY = window.scrolly;
      if(currentScrollY > lastScrollY.current) {
        setVisible(false)
      }else {
        setVisible(true)
        if(timerId.current) clearTimeout(timerId.current)
          timerId.current = setTimeout(() => {
            setVisible(false)
          }, 3000);
      }

      lastScrollY.current = currentScrollY

    }

    window.addEventListener("scroll" , handleScroll , {passive:true})


    return () => {
      window.removeEventListener("scroll" , handleScroll)
      if(timerId.current) clearTimeout(timerId.current)
    }
  }, [forceVisible])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex items-center space-x-2">
  <img src={logo} alt="logo" className="w-8 h-8" />
  <div className="text-2xl font-bold text-white hidden sm:block">
    Fazal
  </div>
</div>

<div className="block lg:absolute lg:left-1/2 lg:-translate-x-1/2">
  <button
    onClick={() => setMenuOpen(true)}
    className="text-white text-3xl cursor-pointer"
  >
    <FiMenu />
  </button>
</div>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="bg-linear-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300"
          >
            Reach Out
          </a>
        </div>
      </nav>
      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
