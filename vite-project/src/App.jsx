import { useEffect, useState } from "react";
import "./index.css";
// import QRCodeGenerator from "./components/QRcodegenerator";
import LandingPage from "./components/LandingPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [product,setProduct]=useState(false)
  


  useEffect(() => {
    // Get the customer ID from the root element
    const customerId = document
      .getElementById("root")
      .getAttribute("data-customerid");
console.log(customerId)
    if (customerId) {
      console.log("Customer is logged in, ID:", customerId);
      setIsLoggedIn(true);
    } else {
      console.log("Customer is not logged in");
      setIsLoggedIn(false);
    }

getdata(customerId)

  }, []);

  const getdata = async (customerId) => {


    try {
      let data = await fetch(
        `https://${window.location.host}/apps/test-1/api/authenticate/get`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ customerId }),
        },
      );
      let res = await data.json();
      console.log("res", res);
      if(res){
        setProduct(true)
      }
    } catch (error) {
      console.log("Fetch error",error)
    }
  };



 

  useEffect(() => {
    console.log("Product state updated:", product);
  }, [product]);
  return (
    <>
      {isLoggedIn && product ? (
        <LandingPage />
      ) : (
        <div>
          <h2>You don't have access </h2>
        </div>
      )}
    </>
  );
}

export default App;
