import {useContext, useEffect, useState, useRef } from 'react';
import Context from '../Context/Context';
import{gsap} from 'gsap';  

// Declare global type for Shery
declare global {
  interface Window {
    Shery: any;
  }
}

export const Player = () => {
    //context wala sara samn yaha rakha hua hai
    const contextdata = useContext<any>(Context);
    const startvid = contextdata.startvid;
    const videolist = contextdata.vidnames;
 
    const [index, setIndex] = useState(0);
    const [time,settime]=useState('');
    const [days,setdays]=useState(['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']);
    const [dayindex,setdayindex]=useState(new Date().getDay());
    
    // Ref to track if Shery has been initialized
    const sheryInitialized = useRef(false);
   
    // Shery mouse follower effect
    useEffect(() => {
        const initializeShery = () => {
            if (window.Shery && !sheryInitialized.current) {
                try {
                    window.Shery.mouseFollower({
                        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
                        duration: 0.3,
                    });
                    
                    window.Shery.hoverWithMediaCircle(".over_vid" /* Element to target.*/, {
                        images: ["image1.jpg", "image2.jpg", "image3.jpg"] /*OR*/,
                        //videos: ["video1.mp4", "video2.mp4"],
                    });
                    
                    window.Shery.makeMagnet(".darkmode,.index,.about,.contact" , {
                        //Parameters are optional.
                        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
                        duration: 1,
                    });
                    sheryInitialized.current = true;
                    console.log('Shery mouse follower initialized');
                } catch (error) {
                    console.error('Error initializing Shery:', error);
                }
            }
        };

        // Check if Shery is already loaded
        if (window.Shery) {
            initializeShery();
        } else {
            // Wait for Shery to load
            const checkShery = setInterval(() => {
                if (window.Shery) {
                    clearInterval(checkShery);
                    initializeShery();
                }
            }, 100);

            // Cleanup interval after 5 seconds if Shery doesn't load
            setTimeout(() => {
                clearInterval(checkShery);
            }, 5000);
        }
    }, []);

    useEffect(() => {
        const tl= gsap.timeline();
        tl.to('.dslash',{
            opacity: 0,        
            duration: 0.5,      
            repeat: -1,        
            yoyo: true,        
        })
    },[])

    useEffect(() => {
        const foundIndex = videolist.findIndex((vidname: string) => vidname === startvid);
        if (foundIndex !== -1) {
            setIndex(foundIndex);
        }
    }, [videolist, startvid]);

    useEffect(()=>{
        settime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        const timeInterval = setInterval(() => {
            settime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);
       
        // Enhanced GSAP animations with smoother transitions
        const tl=gsap.timeline();
        tl.fromTo('.navbar',{
            opacity:0,
            y:-50,
            scale: 0.9
        },{
            opacity:1,
            y:0,
            scale: 1,
            ease:"power3.out",
            duration:0.5,
        }).fromTo('.midpic',{
            opacity:0,
            scale: 0.8,
            rotateY: 15
        },{
            opacity:1,
            scale: 1,
            rotateY: 0,
            ease:"power3.out",
            duration:0.4,
        },'-=0.2')

        // Cleanup interval on unmount
        return () => clearInterval(timeInterval);
    },[])

    return (
        <div className='mainscreen absolute bg-black w-full min-h-screen overflow-hidden'>
            {/* Responsive Navigation */}
            <nav className='navbar flex flex-col sm:flex-row justify-between items-center p-2 sm:p-4 gap-2 sm:gap-0 relative'>
                {/* Left Section - Time and Day */}
                <div className='nav_left flex justify-center sm:justify-start items-center gap-1 sm:gap-2 order-2 sm:order-1 sm:absolute sm:left-4' style={{ fontFamily: 'AeroSpace' }}>
                    <p className='text-xs sm:text-sm '>{days[dayindex]}</p>
                    <p className='dslash text-xs sm:text-sm'>//</p>
                    <p className='text-xs sm:text-sm '>{time}</p>
                </div>

                {/* Middle Section - Title - Always Centered */}
                <div className='nav_mid flex justify-center items-center order-1 sm:order-2 w-full' style={{ fontFamily: 'AeroSpace' }}>
                    <h1 className='text-xl sm:text-2xl lg:text-3xl text-center transition-all duration-500 hover:scale-105' style={{ fontFamily: 'Nitro' }}>
                        Music This Week
                    </h1>
                </div>

                {/* Right Section - Menu Items */}
                <div className='nav_right flex justify-center sm:justify-end items-center gap-2 sm:gap-3 order-3 text-xs sm:text-sm sm:absolute sm:right-4' style={{ fontFamily: 'AeroSpace' }}>
                    <p className='darkmode cursor-pointer hover:opacity-70 hover:scale-105 transition-all duration-300 transform '>Dark Mode</p>
                    <p className='index cursor-pointer hover:opacity-70 hover:scale-105 transition-all duration-300 transform '>Index</p>
                    <p className='about cursor-pointer hover:opacity-70 hover:scale-105 transition-all duration-300 transform '>About</p>
                    <p className='contact cursor-pointer hover:opacity-70 hover:scale-105 transition-all duration-300 transform '>Contact</p>
                </div>
            </nav>

            {/* Responsive Video Player Section */}
            <section className='playerdisplay relative w-full px-4 sm:px-8 lg:px-16 flex justify-center items-center mt-4 sm:mt-8'>
                <div className='midpic relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl h-64 sm:h-80 md:h-96 lg:h-[450px] bg-amber-50 rounded-2xl border-2 border-white overflow-hidden shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-3xl'>
                    <video 
                        src={`/Videos/${videolist[index]}`} 
                        className="w-full h-full object-cover transition-all duration-500"
                        controls
                        autoPlay={true}
                        muted={true}
                        onEnded={() => {
                            setIndex((prevIndex) => {
                                const nextIndex = prevIndex + 1;
                                return nextIndex < videolist.length ? nextIndex : 0; // Loop back to the start
                            });
                        }}
                        onLoadStart={() => {
                            // Add loading animation
                            const videoElement = document.querySelector('.midpic') as HTMLElement;
                            if (videoElement) {
                                videoElement.classList.add('animate-pulse');
                            }
                        }}
                        onLoadedData={() => {
                            // Remove loading animation
                            const videoElement = document.querySelector('.midpic') as HTMLElement;
                            if (videoElement) {
                                videoElement.classList.remove('animate-pulse');
                            }
                        }}
                    />
                    {/* Overlay for Shery effects */}
                    <div className='over_vid absolute inset-0 z-10 pointer-events-none'></div>
                </div>
            </section>

            {/* Enhanced Video Controls/Info */}
            <div className='flex justify-center mt-6 px-4 animate-fadeIn'>
                <div className='flex items-center gap-4 text-white text-sm bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-700 transition-all duration-300 hover:bg-opacity-70' style={{ fontFamily: 'AeroSpace' }}>
                    <span className='transition-all duration-300 hover:text-amber-200'>
                        Video {index + 1} of {videolist.length}
                    </span>
                    <div className='flex gap-2'>
                        <button 
                            onClick={() => {
                                setIndex(prev => prev > 0 ? prev - 1 : videolist.length - 1);
                                // Add smooth transition effect
                                const midpic = document.querySelector('.midpic') as HTMLElement;
                                if (midpic) {
                                    midpic.style.transform = 'scale(0.95)';
                                    setTimeout(() => {
                                        midpic.style.transform = 'scale(1)';
                                    }, 150);
                                }
                            }}
                            className='px-3 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:bg-amber-600 active:scale-95'
                            style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                        >
                            ←
                        </button>
                        <button 
                            onClick={() => {
                                setIndex(prev => prev < videolist.length - 1 ? prev + 1 : 0);
                                // Add smooth transition effect
                                const midpic = document.querySelector('.midpic') as HTMLElement;
                                if (midpic) {
                                    midpic.style.transform = 'scale(0.95)';
                                    setTimeout(() => {
                                        midpic.style.transform = 'scale(1)';
                                    }, 150);
                                }
                            }}
                            className='px-3 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:bg-amber-600 active:scale-95'
                            style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};