import Image from "next/image";
import { Inter } from "next/font/google";
import MainNavbar from "@/components/mainPage/Navbar"
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SliderCard from "@/components/mainPage/SliderCard";
import { useRouter } from 'next/router';
import axios from 'axios';
import { Grid } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Blog() {
  const [blogs,setBlogs] = useState([])
  const [mainBlog, setMainBlog] = useState({})
  const router = useRouter();

  useEffect(()=>{
    const index = parseInt(localStorage.getItem('selectedBlogIndex'));
      async function fetchBlogs(){
        try {
            const response = await axios.get(`http://localhost:8000/api/user/all-active-blogs`); 
            setBlogs(response.data)

            if(index){
              setMainBlog(response.data[index])
            }else{
              setMainBlog(response.data[0])
            }
            console.log(response.data)
          } catch (error) {
            throw error;
          }
      }
      fetchBlogs();
      
},[])


  return (
    <main className={`min-h-screen  ${inter.className}`}>
      <MainNavbar />
      {/* main section? */}

      <div>
      <Image width={900} height={400} src="/banner.jpeg" alt="anime1" className="mx-auto mt-8 rounded border-orange-600 border-4"/>
      </div>

      <div className="px-[15%]">
        <p className="text-center mt-8 text-[50px] text-orange-400">{mainBlog?.title}</p>
        {
           mainBlog.sections && mainBlog.sections.map((section,indexs)=>(
            indexs%2==0?
            <Grid container spacing={2}>
            <Grid item xs={8}>
            <h2 className="mt-8 text-[40px] text-center">{section?.subtitle}</h2>
            <p className="mt-8 text-[30px] ">{section?.data}</p>
            </Grid>
            <Grid item xs={4}>
            <Image width={600} height={300} src="/gear5.png" alt="anime1" className="mx-auto mt-8"/>
            </Grid>
          </Grid>:
          <Grid container spacing={2}>
          <Grid item xs={5} className="pt-10">
            <Image width={350} height={300} src="/punchgif.gif" alt="anime1" className=" mt-20 ml-10 rounded-full border-2 border-orange-400"/>
            </Grid>
            <Grid item xs={7}>
            <h2 className="mt-8 text-[40px] text-center">{section?.subtitle}</h2>
            <p className="mt-8 text-[30px] ">{section?.data}</p>
            <p></p>
            </Grid>
            
          </Grid>
          ))
        }
        <div>
        </div>
      </div>

      <div className="h-[90vh] overflow-hidden ">
        <p className="text-center text-[50px] mt-4 text-orange-400">Our Blogs</p>
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
              <div key={index}>
            <SliderCard singleBlog={singleBlog} index={index} />
          </div>
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
