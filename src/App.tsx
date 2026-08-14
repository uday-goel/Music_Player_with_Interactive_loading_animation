import {useContext, useEffect,useRef, useState} from 'react';
import { gsap } from 'gsap';
import './App.css';
import {Infoloader2} from './Infoloader2';
import type { JSX } from 'react';
import Context  from './Context/Context';
import { Timenode } from './Timenode';
import { Musicnode } from './Musicnode';
import { useNavigate } from 'react-router-dom';

function App() {
  const fillTextRef = useRef<HTMLParagraphElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  let firstloader = useRef<HTMLDivElement>(null);
  let projectref=useRef<HTMLDivElement>(null);
  let timeref=useRef<HTMLDivElement>(null);
  let musicref=useRef<HTMLDivElement>(null);
  const datafetched=useContext(Context);
  const project:string[]= datafetched?.data.Project || [];
  const time:string[]= datafetched?.data.Time || [];
  const music:string[]= datafetched?.data.Music || [];
  const musiccover:string[]= datafetched?.imgname || [];
  
  const [prjectsnode,setprojectsnode]=useState<JSX.Element[]>([])
  const [timesnode,settimesnode]=useState<JSX.Element[]>([])
  const [musicsnode,setmusicnode]=useState<JSX.Element[]>([])
  const navigate = useNavigate();
  const startvid = datafetched?.startvid || '';
  const setstartvid = datafetched?.setstartvid;
  
  const [imgfirst,setimgfirst]=useState<string>('');
  const [imgsecond,setimgsecond]=useState<string>('');
  const [imgthird,setimgthird]=useState<string>('');
  const [imgfourth,setimgfourth]=useState<string>('');
  const [imgfifth,setimgfifth]=useState<string>('');
  const [imgsixth,setimgsixth]=useState<string>('');
  const [imgseventh,setimgseventh]=useState<string>('');
  const [imgeighth,setimgeighth]=useState<string>('');
  const [imgninth,setimgninth]=useState<string>('');

  // Add state to control shuffling
  const [isShufflingComplete, setIsShufflingComplete] = useState<boolean>(false);

  // Function to get corresponding video name from image name
  const getVideoNameFromImage = (imageName: string): string => {
    // Remove .jpg extension and add .mp4
    const videoName = imageName.replace('.jpg', '.mp4');
    return videoName;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const timeinter = setInterval(() => {
        // Only shuffle if shuffling is not complete
        if (!isShufflingComplete) {
          let index: number[] = [];
          for (let i = 0; i < 9; i++) {
            const idx = Math.floor(Math.random() * musiccover.length);
            index.push(idx);
          }
          
          setimgfirst(musiccover[index[0]]);
          setimgsecond(musiccover[index[1]]);
          setimgthird(musiccover[index[2]]);
          setimgfourth(musiccover[index[3]]);
          setimgfifth(musiccover[index[4]]);
          setimgsixth(musiccover[index[5]]);
          setimgseventh(musiccover[index[6]]);
          setimgeighth(musiccover[index[7]]);
          setimgninth(musiccover[index[8]]);
        }
      }, 200);  

      const clearInt = setTimeout(() => {
        // Stop shuffling first
        setIsShufflingComplete(true);
        clearInterval(timeinter);
        
        // After the animation completes, set startvid to the final imgfifth value
        setTimeout(() => {
          // Get the current imgfifth value and convert it to video name
          setimgfifth(current => {
            if (current && setstartvid) {
              const videoName = getVideoNameFromImage(current);
              setstartvid(videoName);
              console.log('Setting startvid to:', videoName);
            }
            return current;
          });
        }, 100); // Small delay to ensure imgfifth is set
        
      }, 3000);

      return () => {
        clearInterval(timeinter);
        clearTimeout(clearInt);
      };
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [musiccover, setstartvid, isShufflingComplete]);

  useEffect(() => {
    const nodes = time.map((val, index) => (
      <Timenode key={index} data={val} />
    ));
    settimesnode(nodes);
  }, []); // Fixed dependency

  useEffect(() => {
    const nodes = project.map((val, index) => (
      <Infoloader2 key={index} data={val} />
    ));
    setprojectsnode(nodes);
  }, []);

  useEffect(() => {
    const nodes = music.map((val, index) => (
      <Musicnode key={index} data={val} />
    ));
    setmusicnode(nodes);
  }, []); // Fixed dependency

  useEffect(() => {
    if (projectref.current) {
      const elements = projectref.current.querySelectorAll('.project-item');
      const h1ref = projectref.current.querySelector('.project-ref h1');
      
      const tl = gsap.timeline();

      tl.fromTo(
        elements,
        { opacity: 0 },
        {
          opacity: 0.3, 
          duration: 0.7,
          stagger: 0.05,
          delay: 1.8,
        }
      ).to(
        elements,
        {
          opacity: 1,
          delay: 0.3,
          duration: 0.7,
          stagger: 0.05,
        },
        '-=0.7'
      ).to(
        h1ref,{
          opacity:0
        },
        '-=0.7'
      ).to(
        elements,
        {
          opacity: 0,
          delay: 0.3,
          duration: 0.5,
          stagger: 0.05,
        },
        '-=0.7'
      );

      return () => {
        tl.kill();
      };
    }
  }, [prjectsnode]);

  useEffect(() => {
    if (timeref.current) {
      const elements = timeref.current.querySelectorAll('.project-item');
      const h1ref = timeref.current.querySelector('.project-ref h1');
      
      const tl = gsap.timeline();

      tl.fromTo(
        elements,
        { opacity: 0 },
        {
          opacity: 0.3, 
          duration: 0.7,
          stagger: 0.05,
          delay: 1.8,
        }
      ).to(
        elements,
        {
          opacity: 1,
          delay: 0.3,
          duration: 0.7,
          stagger: 0.05,
        },
        '-=0.7'
      ).to(
        h1ref,{
          opacity:0
        },
        '-=0.7'
      ).to(
        elements,
        {
          opacity: 0,
          delay: 0.3,
          duration: 0.5,
          stagger: 0.05,
        },
        '-=0.7'
      );

      return () => {
        tl.kill();
      };
    }
  }, [prjectsnode]);

  useEffect(() => {
    const img_elements= document.querySelectorAll('.imgdiv img, .midimgdiv img');
    const imgnonmid_elements = document.querySelectorAll('.imgdiv');
    const midimg_div = document.querySelectorAll('.midimgdiv');
    const midimg=document.querySelectorAll('.midimgdiv img');
    const secondloader = document.querySelector('.second-loader');
    const navbar = document.querySelector('.navbar');
    const firstloader = document.querySelector('.first-loader');
    const tl = gsap.timeline();
    
    tl.fromTo(img_elements,{
      opacity: 0,
      scale: 0.8, 
    },{
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.1,
      delay: 2
    }).to(imgnonmid_elements,{
      height: '0px',
      delay:1,
      ease: 'power2.inOut',
    }).to(midimg_div,{
      height:'350px',
      width:'350px',
      x:'-170px',
      y:'-100px',
      duration: 0.5,
      ease: 'power2.inOut',
    }).to(midimg,{
      height: '100%',
      width: '100%',
      duration: 0.5,
      ease: 'power2.inOut',
    },'-=0.5').to(midimg_div,{
      opacity:0,
      scale:3,
      duration: 0.8,
      ease: 'power2.inOut',
      rotate:-10
    }).to(secondloader,{
      opacity:0,
      duration: 0.2,
      ease: 'power2.inOut'
    },'-=0.3').to(midimg_div,{
      width:'0px',
      duration:0.1,
      onComplete: () => {
        navigate('/player');
        console.log(startvid)
      }
    }).fromTo(navbar,{
      opacity:0,
      y:-50,
    },{
      opacity:1,
      y:0,
      duration: 0.4,
      ease: 'power2.inOut',
    },'-=0.3').to(firstloader,{
      x:'-1000000px',
      duration: 0.1,
    }).to(secondloader,{
      x:'-1000000px',
      duration: 0.1,
    })
  },[])

  useEffect(() => {
    if (musicref.current) {
      const elements = musicref.current.querySelectorAll('.project-item');
      const h1ref = musicref.current.querySelector('.music-ref h1');
      
      const tl = gsap.timeline();

      tl.fromTo(
        elements,
        { opacity: 0 },
        {
          opacity: 0.3, 
          duration: 0.7,
          stagger: 0.05,
          delay: 1.8,
        }
      ).to(
        elements,
        {
          opacity: 1,
          delay: 0.3,
          duration: 0.7,
          stagger: 0.05,
        },
        '-=0.7'
      ).to(
        h1ref,{
          opacity:0
        },
        '-=0.7'
      ).to(
        elements,
        {
          opacity: 0,
          delay: 0.3,
          duration: 0.5,
          stagger: 0.05,
        },
        '-=0.7'
      );

      return () => {
        tl.kill();
      };
    }
  }, [prjectsnode]);

  useEffect(() => {
    if (maskRef.current) {
      gsap.to(maskRef.current, {
        y: '100%',
        duration: 1,
        ease: 'power2.inOut',
        delay: 0.1,
      });
    }
  }, []);

  useEffect(()=>{
    gsap.to(firstloader.current,{
      opacity:0,
      duration:.8,
      delay:1.1,
      ease:'power2.inOut'
    })
  },[])

  return (
    <>
      <main className="relative">
        <div className='absolute second-loader w-full min-h-screen bg-black flex flex-col lg:flex-row overflow-hidden'>
          {/* First Column - Projects */}
          <div className='firstcol min-h-screen w-full lg:w-[15%] mx-1 px-2 lg:px-0'>
            <div className='project-ref flex flex-col items-center lg:items-start' ref={projectref}>
              <h1 className='text-white mx-2 my-4 lg:my-7 text-lg lg:text-2xl text-center lg:text-left' style={{fontFamily:'AeroSpace'}} >Projects</h1>
              {prjectsnode}
            </div>
          </div>
          
          {/* Second Column - Time */}
          <div className='secondcol min-h-screen w-full lg:w-[15%] mx-1 px-2 lg:px-0'>
             <div className='project-ref flex flex-col items-center lg:items-end' ref={timeref}>
              <h1 className='text-white mx-2 my-4 lg:my-7 text-lg lg:text-2xl text-center lg:text-right whitespace-nowrap' style={{fontFamily:'AeroSpace'}} >TIME TO BUILD</h1>
              {timesnode}
             </div>
          </div>
          
          {/* Third Column - Images Grid */}
          <div className='thirdcol relative min-h-screen w-full lg:w-[50%] mx-1 flex flex-col justify-center items-center lg:block'>
            {/* Mobile: Stack images vertically */}
            <div className='lg:hidden grid grid-cols-3 gap-2 p-4'>
              <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-xl overflow-hidden'>
                <img src={`/music_cover_photos/${imgfirst}`} alt="image 1" className="w-full h-full object-cover imgdiv-img" />
              </div>
              <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-xl overflow-hidden'>
                <img src={`/music_cover_photos/${imgsecond}`} alt="image 2" className="w-full h-full object-cover imgdiv-img" />
              </div>
              <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-xl overflow-hidden'>
                <img src={`/music_cover_photos/${imgthird}`} alt="image 3" className="w-full h-full object-cover imgdiv-img" />
              </div>
              <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-xl overflow-hidden'>
                <img src={`/music_cover_photos/${imgfourth}`} alt="image 4" className="w-full h-full object-cover imgdiv-img"/>
              </div>
              <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-xl overflow-hidden midimgdiv'>
                <img src={`/music_cover_photos/${imgfifth}`} alt="image 5" className="midimg w-full h-full object-cover"/>
              </div>
              <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-xl overflow-hidden'>
                <img src={`/music_cover_photos/${imgsixth}`} alt="image 6" className="w-full h-full object-cover imgdiv-img"/>
              </div>
              <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-xl overflow-hidden'>
                <img src={`/music_cover_photos/${imgseventh}`} alt="image 7" className="w-full h-full object-cover imgdiv-img"/>
              </div>
              <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-xl overflow-hidden'>
                <img src={`/music_cover_photos/${imgeighth}`} alt="image 8" className="w-full h-full object-cover imgdiv-img"/>
              </div>
              <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-xl overflow-hidden'>
                <img src={`/music_cover_photos/${imgninth}`} alt="image 9" className="w-full h-full object-cover imgdiv-img"/>
              </div>
            </div>

            {/* Desktop: Original absolute positioning */}
            <div className='hidden lg:block'>
              <div className='row-one'>
                <div className='imgdiv absolute w-32 h-32 xl:w-40 xl:h-40 m-2 top-30 left-25 rounded-xl overflow-hidden'>
                  <img src={`/music_cover_photos/${imgfirst}`} alt="image 1" className="w-full h-full object-cover" />
                </div>
                <div className='imgdiv absolute w-32 h-32 xl:w-40 xl:h-40 m-2 top-30 left-70 rounded-xl overflow-hidden'>
                  <img src={`/music_cover_photos/${imgsecond}`} alt="image 2" className="w-full h-full object-cover" />
                </div>
                <div className='imgdiv absolute w-32 h-32 xl:w-40 xl:h-40 m-2 top-30 left-115 rounded-xl overflow-hidden'>
                  <img src={`/music_cover_photos/${imgthird}`} alt="image 3" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className='row-two'>
                <div className='imgdiv absolute w-32 h-32 xl:w-40 xl:h-40 m-2 top-75 left-25 rounded-xl overflow-hidden'>
                  <img src={`/music_cover_photos/${imgfourth}`} alt="image 4" className="w-full h-full object-cover"/>
                </div>
                <div className='midimgdiv absolute w-32 h-32 xl:w-40 xl:h-40 m-2 top-75 left-70 rounded-xl overflow-hidden'>
                  <img src={`/music_cover_photos/${imgfifth}`} alt="image 5" className="midimg w-full h-full object-cover"/>
                </div>
                <div className='imgdiv absolute w-32 h-32 xl:w-40 xl:h-40 m-2 top-75 left-115 rounded-xl overflow-hidden'>
                  <img src={`/music_cover_photos/${imgsixth}`} alt="image 6" className="w-full h-full object-cover"/>
                </div>
              </div>
              <div className='row-three'>
                <div className='imgdiv absolute w-32 h-32 xl:w-40 xl:h-40 m-2 top-120 left-25 rounded-xl overflow-hidden'>
                  <img src={`/music_cover_photos/${imgseventh}`} alt="image 7" className="w-full h-full object-cover"/>
                </div>
                <div className='imgdiv absolute w-32 h-32 xl:w-40 xl:h-40 m-2 top-120 left-70 rounded-xl overflow-hidden'>
                  <img src={`/music_cover_photos/${imgeighth}`} alt="image 8" className="w-full h-full object-cover"/>
                </div>
                <div className='imgdiv absolute w-32 h-32 xl:w-40 xl:h-40 m-2 top-120 left-115 rounded-xl overflow-hidden'>
                  <img src={`/music_cover_photos/${imgninth}`} alt="image 9" className="w-full h-full object-cover"/>
                </div>
              </div>
            </div>
          </div>
          
          {/* Fourth Column - Music */}
          <div className='fourthcol min-h-screen w-full lg:w-[20%] mx-1 px-2 lg:px-0'>
            <div className='music-ref flex flex-col items-center lg:items-start' ref={musicref}>
              <h1 className='text-white mx-3 my-4 lg:my-7 text-lg lg:text-2xl text-center lg:text-left whitespace-nowrap' style={{fontFamily:'AeroSpace'}} >MUSIC USED</h1>
              {musicsnode}
             </div>
          </div>
        </div>

        <div className="absolute first-loader w-full min-h-screen bg-black flex justify-center items-center" ref={firstloader}>
          <div className="name-block relative flex justify-center items-center px-4">
            <div className="absolute overflow-hidden z-0">
              <p className="text-3xl sm:text-4xl lg:text-5xl opacity-100 whitespace-nowrap text-white text-center" style={{ fontFamily: 'Mustang' }}>
                Ridhiv Sharma*
              </p>
              <div ref={maskRef} className="absolute top-0 left-0 w-full h-full bg-black" style={{ transform: 'translateY(0%)' }}/>
            </div>

            <div className="absolute z-10">
              <p ref={fillTextRef} className="text-3xl sm:text-4xl lg:text-5xl opacity-20 whitespace-nowrap text-white text-center" style={{ fontFamily: 'Mustang' }}>
                Ridhiv Sharma*
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;