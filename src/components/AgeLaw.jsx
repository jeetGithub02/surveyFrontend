import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const AgeLaw = () => {
  const[date, setDate]=useState("6 April, 2025");
  const[participators, setParticipators]= useState([{"Date":""}]);


  useEffect(()=>{
      axios.get(`http://192.168.116.124:4080/get-participators`).then(response=>
      {
        setParticipators(response.data)
        // console.log(male)
      }
      )
  },[]);

  return (
    <div className="container">
        <div className="border-2 p-2 rounded-md cursor-pointer bg-sky-100" title="Tap for more details">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <h1 className="font-medium text-xl ">Age on the first time</h1>
        <div className="text-[green] font-medium">Date : {date}</div>
        <p className="col-span-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam deserunt qui ducimus sunt expedita, perferendis eveniet labore repellendus. Maiores, quasi!</p>

        <div className="col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 font-medium">
                <div>Participants : {participators.length}</div>
                <div>Males : {participators.filter(par=> par.Gender == "male").length}</div>
                <div>Females : {participators.filter(par=> par.Gender == "female").length}</div>
                <div>Last Update : {participators.at(-1).Date}</div>
            </div>
        </div>
      </div>
    </div>
    </div>
  )
}
