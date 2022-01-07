import axios from 'axios';
import React, { useState } from 'react';
import Recommandation from './recommandation';


const Login = (props) => {
    const [data,setData] = useState({});
    const [address,setAddress] = useState("");

    function clickHandler(addresse){
        axios.get("http://localhost:5000/" + addresse).then(data => {
            setData(data.data);
        })
        
    }
  return (
    <>
      <section className='showcase login'>
        <div className='showcase-overlay'>
        <h1> Travel Airplane Recommander</h1>
        <p>
          Get to tour the world in style. Select your destination with us, and off you go!
        </p>

          <div className='form-control'>
            <input
              type='text'
              name='address'
              id='email'
              placeholder='Your address'
              required
              onChange={(e)=>{setAddress(e.target.value)}}
            />
            <button className="base" onClick={()=> {clickHandler(address)}}>Recommand</button>
            <button className="review" onClick={props.setYes}>Make Your Review</button>
            </div>
            <div className="space">
            {
                data? <div><h2>We recommand for You: </h2><h3><Recommandation data={data.airpline}/></h3></div>:<div></div>
            }
            </div>
            </div>
      </section>
      

    </>
  )
}

export default Login