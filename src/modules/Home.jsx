import React /*, { useEffect }*/ from "react";
import '../style/App.scss';

export default function Home() {
  // const fetchData = async (url) => {
  //   const response = await fetch(url)
  //   const body = await response.json();
  //   return body;
  // };
  
  // NOTE: running this on the HOME component for test purposes. Check if the dev server is running properly
  // useEffect(() => {
  //   // fetchData('/rest/data/get/freshmanmeritwithtest')
  //   // .then(res => {
  //   //   console.log(res.express);
  //   // });
    
  // }, []);

  return (
    <p>Select from an item in the drop-down above to access the dashboard for the element data</p>
  );
}