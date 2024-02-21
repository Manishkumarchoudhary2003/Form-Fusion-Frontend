import React, { useEffect } from "react";
import Home from "./Home";
import HomeLayout from "../../pages/HomeLayout";
import Features1 from "./Features1";
import Features2 from "./Features2";
import Features3 from "./Features3";
import ShareableForms from "./ShareableForms";
import GetStart from "./GetStart"; 

const Welcome = () => {
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  // const navgate = useNavigate();

  // const pressed = () =>{
  //    navgate("/all-forms")
  // }

  useEffect(() =>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])

  // useEffect(() => {
  //   const fetchWelcomeMessage = async () => {
  //     try {
  //       const response = await welcomeApi();
  //       setWelcomeMessage(response.data);
  //     } catch (error) {
  //       console.error("Error fetching welcome message:", error);
  //       setError("Error fetching welcome message");
  //     }
  //   };

  //   fetchWelcomeMessage();
  // }, []);

  return (
    <div>
      <HomeLayout> 
        <Home />
        <Features1 /> 
        <Features2 />
        <Features3 />
        <ShareableForms />
        <GetStart />
      </HomeLayout>  
    </div>
  );
};

export default Welcome;
