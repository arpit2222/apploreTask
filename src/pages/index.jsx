import Image from "next/image";
import { Inter } from "next/font/google";
import MainNavbar from "@/components/mainPage/Navbar";
import { useEffect, useState } from "react";
import TypingEffect from "react-typing-effect";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SliderCard from "@/components/mainPage/SliderCard";
import { useRouter } from 'next/router';
import axios from 'axios';
import WriterCard from "@/components/mainPage/WriterCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [blogs,setBlogs] = useState([])
  const [writer,setWriter] = useState([])
  const router = useRouter();


  useEffect(()=>{

      async function fetchBlogs(){
        try {
            const response = await axios.get(`http://localhost:8000/api/user/all-active-blogs`); 
            setBlogs(response.data)
            console.log(response.data)
          } catch (error) {
            throw error;
          }
      }

      async function fetchWriters(){
        try {
            const response = await axios.get(`http://localhost:8000/api/user/getAllActiveUsers`); 
            setWriter(response.data)
            console.log(response.data)
          } catch (error) {
            throw error;
          }
      }
      fetchBlogs();
      fetchWriters();
      
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
      }, 10000);
      return () => clearInterval(interval);
      
},[])


  const texts = [
    '"You are the choosen one for protecting the community!! Join us to protect it." - by Ichigo Korosaki',
    '"Be the WriterKage of our hidden Blog of Internet" - by Naruto Uzumaki',
    '"Be the most free person to write about anime" - by Monkey D Luffy',
  ];

  return (
    <main className={`min-h-screen  ${inter.className}`}>
      <MainNavbar />
      {/* main section */}
      <div className="mainBG h-[90vh] overflow-hidden ">
        <div className=" relative scale-[110%] h-[100%]">
          <div className="absolute mt-6 bottom-4">
            <Image width={300} height={300} src="/ichigo.png" alt="anime1" />
          </div>
          <div className="absolute left-[470px] mt-8 -bottom-2">
            <Image
              width={200}
              height={200}
              src="/luffy.png"
              alt="anime1"
              className="scale-[90%]"
            />
          </div>
          <div className="absolute left-40 bottom-8 ">
            <Image
              width={440}
              height={440}
              src="/narutocenter.png"
              alt="anime1"
              className="scale-[110%]"
            />
          </div>

          <div className="text-red-500 absolute right-[200px] top-[100px]">
            <div>
              <p className="text-orange-200 text-[60px] text-center">
                Unveiling the World of <br />
                Animation
              </p>
            </div>
            <div className="border-2 border-white rounded-lg p-4 text-[30px] text-center my-auto mx-4 shadow-xl bg-opacity-25 bg-orange-400 mt-20 h-[200px] w-[700px] p-10 text-white">
              <div className="typing-effect">
                <TypingEffect
                  text={texts[activeIndex]}
                  speed={100}
                  eraseSpeed={50}
                  eraseDelay={1000}
                  typingDelay={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden">
        <div className="flex overflow-hidden">
          <div className="animate-scrolling w-[100vw]">
            <img src="./narutogif.gif" alt="Your GIF" className="w-32 py-4" />
          </div>
        </div>
      </div>

      <div className="mainBG1 h-[90vh] overflow-hidden ">
        <p className="text-center text-[50px] mt-4 text-white text-orange-400">Our Blogs</p>
        <div className="mx-auto mt-8 ml-20">
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024
              },
              items: 3,
              partialVisibilityGutter: 40
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 1,
              partialVisibilityGutter: 30
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464
              },
              items: 2,
              partialVisibilityGutter: 30
            }
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {
            blogs.map((singleBlog,index)=>(
              singleBlog.status?
              <div key={index}>
            <SliderCard singleBlog={singleBlog} index={index} />
          </div>:<div></div>
            ))
          }
          
        </Carousel>
        </div>
      </div>

      <div className="bg-white overflow-hidden">
        <div className="flex overflow-hidden">
          <div className="animate-r-scrolling w-[100vw]">
            <img src="./goku.gif" alt="Your GIF" className="w-32 py-4" />
          </div>
        </div>
      </div>

      <div className="mainBG3 h-[90vh] overflow-hidden ">
        <p className="text-center text-[50px] mt-4 text-white text-orange-400">Our Writers</p>
        <div className="mx-auto mt-8 ml-20">
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024
              },
              items: 3,
              partialVisibilityGutter: 40
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 1,
              partialVisibilityGutter: 30
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464
              },
              items: 2,
              partialVisibilityGutter: 30
            }
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
        { 
            writer.map((singleWriter,index)=>(
              singleWriter.status?
              <div key={index}>
            <WriterCard singleWriter={singleWriter} index={index} />
          </div>:""
            ))
          }
        </Carousel>
        </div>
      </div>

      <div className="bg-orange-500 text-center text-lg text-white py-4">
          <p>All right are reserved for this</p>
      </div>

    </main>
  );
}
