import axios from 'axios';
import React, { useState } from 'react'

export default function Review() {
    const [airline,setAirline] = useState("") ;
    const [score,setScore] = useState(0) ;
    const [data,setData] = useState("") ;

    function handleClick(){
        axios.get("http://localhost:5000/" + airline + "/" + score).then(d => {
            setData(d.data.success);
        })
    }

    return (
        <>
        <section className='showcase login'>
          <div className='showcase-overlay'>
            <div className='form-control'>
              <input
                type='text'
                name='username'
                id='username'
                placeholder='Name'
                required
              />
              <input
                type='text'
                name='email'
                id='email'
                placeholder='Airline'
                required
                onChange={(e)=>{setAirline(e.target.value)}}
              />
              <input
                type='text'
                name='password'
                id='password'
                placeholder='Score'
                onChange={(e)=>{setScore(e.target.value)}}
              />
              <input
                type='Text'
                name='password2'
                id='password2'
                placeholder='Reason ..'
              />
              <button className="base" onClick={handleClick} type='submit'>Review the Airline</button>
            </div>
            {
                data? <div> {data} </div>:<div></div>
            }
          </div>
        </section>
      </>
    )
}
