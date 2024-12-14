import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCars } from "../services/apiCars";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  useEffect(function(){
    getCars().then((data)=>console.log("the data",data))
  },[])
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      {/* <p>TEST</p> */}
      <CabinTableOperations/>
    </Row>
    <Row>
      <CabinTable/>
      <AddCabin/>
    </Row>
    </>
  );
}

export default Cabins;
