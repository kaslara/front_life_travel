import  Link  from "next/link";
import Layout from "../components/Layout"
import {useEffect, useState} from "react";
import Footer from "../components/Footer"


export default function Home({buses}){
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    (
        async () => {
            try {
                const response = await fetch('http://travelephant-backend-service/user', {
                    credentials: 'include',
                });

                const content = await response.json();
                console.log(content);
                setAuth(true);
            } catch (e) {
                setAuth(false);
            }
        }
    )();
});

    return ( 
      <Layout auth={auth}>
        <div className="mt-1">
        <div className="flex bg-white h-96 container mx-auto">
          <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
                Welcome to <span className="text-indigo-600">ElephanTravel</span>
              </h2>
              <p className="mt-2 text-sm text-gray-500 md:text-base">
                Welcome to my Personal website. Here you can get to know About
                me and as well as you can explore the blogs section and get to know
                what sort of things I post here. Find best bus lines.
              </p>
              <div className="flex justify-center lg:justify-start mt-6">
                <button className="md:mt-0 mt-2 ml-2 md:mr-0 mr-2 bg-indigo-500 px-5 py-3 rounded-xl text-sm text-white hover:text-white shadow-xl hover:shadow-xl hover:shadow-indigo-300/80 shadow-indigo-400/40 hover:bg-indigo-600"><Link href="/search"><a>Search buses</a></Link></button> 
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2" style={{clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)"}}>
            <div className="h-full object-cover" style={{backgroundImage: `url('https://www.kaleidoscopeadventures.com/wp-content/uploads/2019/07/tour-bus.jpg')`}}>
              <div className="h-full bg-black opacity-25"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      </Layout>
      )
    }
