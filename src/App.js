import { useState, useEffect, useRef } from 'react';
import './App.css'
import github from './img/github.png'
import linkedin from './img/linkedin.png'
import ship from './img/ship.png'
import jee from './img/jeesw.png'
import rust from './img/rust.png'
import poke from './img/pokeia.png'
import terre from './img/terre.jpg'
import rustLogo from './img/rustLogo.png'
import java from './img/java.png'
import js from './img/js.png'
import css from './img/css.png'
import html from './img/html5.png'
import node from './img/node.png'
import python from './img/python.png'
import spring from './img/spring.png'
import sea from './sound/sea.mp3'
import water from './sound/underwater.mp3'
import off from './img/volumeOff.png'
import on from './img/volumeOn.png'
import arrow from './img/arrow.webp'





function Links(){
  return(
    <ul>
      <li>
        <a href="https://github.com/Izilyph">
          <img src={github} alt="Github"/>
        </a>
      </li>
      <li>
        <a href="https://fr.linkedin.com/in/edouard-outrebon-838356224">
          <img src={linkedin} alt="LinkedIn"/>
        </a>
      </li>
      
    </ul>
  );
}

function Menu(){
  const scrollToPos = (x) =>{
    window.scrollTo({
      top: x,
      behavior:'smooth'
    });
  }
  const scrollToDiv = (className) => {
    const element = document.getElementsByClassName(className)[0];
    if (element) {
      const targetScrollPosition = element.offsetTop - 80;
      window.scrollTo({ top: targetScrollPosition, behavior: 'smooth' });
    }
  }
  return(
    <>
      <button onClick={() => scrollToPos(0)}>Home</button>
      <button onClick={()=> scrollToDiv("project1")}>Projects</button>
      <button onClick={()=> scrollToDiv("about")}>About me</button>
      <button onClick={()=> scrollToDiv("contact-form")}>Contact</button>
    </> 
  );
}

function ToggleMenu(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return(
    <>
      {isMenuOpen && (<div className={`menu ${isMenuOpen ? 'open':''}`}>
        <Menu />
        <SoundPlayer />
      </div>)}
      <div className={isMenuOpen ? 'toggle-menu' : 'toggle-menu menu-open'}>
        <img className='arrow' src={arrow} alt='arrow' onClick={toggleMenu}></img>
      </div>
    </>
    
  );
}

function SoundPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const togglePlay = () => {
    console.log(hasScrolled)

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); 
      } else {
        audioRef.current.play(); 
      }
      setIsPlaying(!isPlaying); 
    }
  };

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      const threshold = 500;
      if ( scrollPosition > threshold) {
        setHasScrolled(true);
        if(isPlaying){
          playSound();
        }
      }else{
        setHasScrolled(false);
        if(isPlaying){
          playSound();
        }
      }
    }
    handleScroll()

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled,isPlaying]);

  return (
    <div>
      <audio ref={audioRef} src={hasScrolled ? water : sea} loop/>
      <img className="soundbutton" onClick={togglePlay} src={isPlaying ? on : off} alt='Sound'></img>
    </div>
  );
}

function Bubbles(){
  const [scrollDarkness, setScrollDarkness] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      const threshold = 500;
      if ( scrollPosition > threshold) {
        setHasScrolled(true);
      }else{
        setHasScrolled(false);
      }
      if(hasScrolled){
        const maxScroll = 20000; 
        const darknessPercentage = Math.min(scrollPosition / maxScroll, 1); 
        setScrollDarkness(darknessPercentage);  
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled]);
  
  function calculateDarkenedColor(scrollDarkness) {
    const originalColor = [127, 179, 213]; 
    const darkenedColor = originalColor.map(channel => Math.max(0, channel - scrollDarkness * 255));
    return `rgb(${darkenedColor.join(', ')})`;
  }
  return(
    <>
      <div className="bubble-container" style={{ display: hasScrolled ? "block" : "none" }}>
        <div className="bubble" style={{ backgroundColor: calculateDarkenedColor(scrollDarkness) }}></div>
        <div className="bubble" style={{ backgroundColor: calculateDarkenedColor(scrollDarkness) }}></div>
        <div className="bubble" style={{ backgroundColor: calculateDarkenedColor(scrollDarkness) }}></div>
        <div className="bubble" style={{ backgroundColor: calculateDarkenedColor(scrollDarkness) }}></div>
        <div className="bubble" style={{ backgroundColor: calculateDarkenedColor(scrollDarkness) }}></div>
        <div className="bubble" style={{ backgroundColor: calculateDarkenedColor(scrollDarkness) }}></div>
        <div className="bubble" style={{ backgroundColor: calculateDarkenedColor(scrollDarkness) }}></div>
        <div className="bubble" style={{ backgroundColor: calculateDarkenedColor(scrollDarkness) }}></div>
        <div className="bubble" style={{ backgroundColor: calculateDarkenedColor(scrollDarkness) }}></div>
        <div className="bubble" style={{ backgroundColor: calculateDarkenedColor(scrollDarkness) }}></div>
      </div>
    </>
  )
}

function Ship(){
  const [isAnimating, setIsAnimating] = useState(false);

  function sink(){
    setIsAnimating(true);
  }

  return(
    <div className={`ship ${isAnimating ? 'ship_sail' : ''}`} onClick={sink}>
      <img src={ship} alt='Ship'/>
    </div>
  );
}

function Projects(){
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);

  const divRef1 = useRef(null);
  const divRef2 = useRef(null);
  const divRef3 = useRef(null);

  useEffect(() => {
    const observer1 = new IntersectionObserver(
      (entries) => {
        setIsVisible1(entries[0].isIntersecting); 
      },
      { threshold: 0.6 } 
    );

    if (divRef1.current) {
      observer1.observe(divRef1.current);
    }

    const observer2 = new IntersectionObserver(
      (entries) => {
        setIsVisible2(entries[0].isIntersecting); 
      },
      { threshold: 0.6 } 
    );

    if (divRef2.current) {
      observer2.observe(divRef2.current);
    }

    const observer3 = new IntersectionObserver(
      (entries) => {
        setIsVisible3(entries[0].isIntersecting); 
      },
      { threshold: 0.6 } 
    );

    if (divRef3.current) {
      observer3.observe(divRef3.current);
    }
    const ref1 = divRef1.current;
    const ref2 = divRef2.current;
    const ref3 = divRef3.current;

    return () => {
      if (ref1) {
        observer1.unobserve(ref1);
      }
      if (ref2) {
        observer2.unobserve(ref2);
      }
      if (ref3) {
        observer3.unobserve(ref3);
      }
    };
  }, []);
  return(
    <>
      <div ref={divRef1} className={`project1 project ${isVisible1 ? 'fade-in' : 'fade-out'}`}>
        <h2>JEEsw</h2>
        <div className='content-container'>
          <div className='logo-container'>
            <img className="logo-spring" src={spring} alt='Spring'/>
            <img className="logo-java" src={java} alt='Java'/>
            <img className="logo-js" src={js} alt='Js'/>
            <img className="logo-css" src={css} alt='CSS'/>
          </div>
          <div className='img-and-text'>
            <div className='short-desc'>A website that brings together information and tools about the mobile game Summoners War.</div>
            <div className='desc-container'>In Summoners War, players can collect monsters and engrave them with runes and artifacts to make them stronger. The goal of this website was to offer various tools such as efficiency calculator for runes and artifacts and thus help players to develop there knowledge of the game.</div>
            <img className="project1-img" src={jee} alt=''/>
          </div>
          
        </div>
        
      </div>

      <div ref={divRef2} className={`project2 project ${isVisible2 ? 'fade-in' : 'fade-out'}`}>
        <h2>GameBoy Emulator</h2>
        <div className='content-container'>
          <div className='logo-container rust-logo-container'>
            <div className='crab-container'>
              <img className="logo-rust" src={rustLogo} alt='Rust'/>

            </div>
            <div class="curved-text-container">
              <p class="curved-text">Rust</p>
            </div>

          </div>
          <div className='img-and-text'>
            <div className='short-desc'>A gameboy emulator capable of running a Tetris rom entirely built in Rust.</div>
            <div className='desc-container'>The Gameboy is one of the most famous portable console created by Nintendo. Tetris on the other hand is one of the pillars of video games. Understanding the processes hidden behind how the Gameboy works and the mechanism of emulation were a great experience.</div>
            <img className="project2-img" src={rust} alt=''/>

          </div>
        </div>
        
      </div>

      <div ref={divRef3} className={`project3 project ${isVisible3 ? 'fade-in' : 'fade-out'}`}>
        <h2>PokéIA</h2>
        <div className='content-container'>
          <div className='logo-container'>
            <img className="logo-node" src={node} alt='Node'/>
            <img className="logo-python" src={python} alt='Python'/>
            <img className="logo-html" src={html} alt='Html'/>
            <img className="logo-css" src={css} alt='CSS'/>
          </div>
          <div className='img-and-text'>
            <div className='short-desc'>A website where anyone can battle an AI in a Pokemon duel.</div>
            <div className='desc-container'>Pokemon is known across the world for its creatures, but the games developed by GameFreak revealed the strategic potential of Pokemon. With this website, everyone can try their hand at strategy</div>  
            <img className="project3-img" src={poke} alt=''/>
          </div>
        </div>
        

      </div>
    </>
    
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const [isVisible, setIsVisible] = useState(false);

  const divRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.5 } 
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }
    const ref = divRef.current;

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, []);

  return (
    <div ref={divRef} className={` contact-form project ${isVisible ? 'fade-in' : 'fade-out'}`}>
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button className="contact-submit" type="submit">Submit</button>
      </form>
    </div>
  );
}

function About(){
  const [isVisible, setIsVisible] = useState(false);

  const divRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.5 } 
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }
    const ref = divRef.current;

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, []);
  return(
    <div ref={divRef} className={`about project ${isVisible ? 'fade-in' : 'fade-out'}`}>
      <h2>An incursion into the heart of the ocean</h2>

      <div className='short-desc'>A world filled with magic and mysterious creatures, a world of songs and music.</div>
      <div className='desc-container'>This is a novel that tells Zhia's journey, beyond fear, anger and wonder.</div>
      <img className="map-img" src={terre} alt='map'/>
    </div>
  );
}


export default function App() {
  const [scrollDarkness, setScrollDarkness] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      const threshold = 500;
      if (!hasScrolled && scrollPosition > threshold) {
        setHasScrolled(true);
      }
      if(hasScrolled){
        const maxScroll = 20000; 
        const darknessPercentage = Math.min(scrollPosition / maxScroll, 1); 
        setScrollDarkness(darknessPercentage);  
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled]);
  
  function calculateDarkenedColor(scrollDarkness) {
    const originalColor = [0, 119, 181]; 
    const darkenedColor = originalColor.map(channel => Math.max(0, channel - scrollDarkness * 255));
    return `rgb(${darkenedColor.join(', ')})`;
  }

  return (
    <>
      <Ship />
      <div className='cloud cloud1'>
        <div className='links'>
          <Links />
        </div>
      </div>
      <div className='cloud cloud2'>
        <div className='cloud2-title'>
            <div>Edouard Outrebon</div>
        </div>
      </div>
      <div className='cloud cloud3'>
        <div className='title'>
            <div>Ingénieur informatique</div>
        </div>
      </div>

      <div className='sky'></div>
      <div className='sea'></div>
      <Bubbles />
      <div className='depths'style={{ backgroundColor: calculateDarkenedColor(scrollDarkness) }}>
        <Projects />
        <About />
        <ContactForm />
      </div>
      <ToggleMenu />
    </>
  );
}

