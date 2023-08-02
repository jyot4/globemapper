import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Country.css'

function Country() {
    // var config = {
    //     method: 'get',
    //     url: 'https://api.countrystatecity.in/v1/countries/',
    //     headers: {
    //       'X-CSCAPI-KEY': 'TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA=='
    //     }
    //   };

    // var config = {
    //     method: 'get',
    //     url: 'https://api.countrystatecity.in/v1/states',
    //     headers: {
    //       'X-CSCAPI-KEY': 'API_KEY'
    //     }
    //   };

    const [country, setCountry] = useState([])
    const [state,setState] = useState([])
    const [cities,setCities] = useState([])
    const [selected ,setSelected] = useState("")
    const [stateSelected ,setstateSelected] = useState("")


console.log(selected)
console.log(stateSelected)


    useEffect(() => {
        axios.get('https://api.countrystatecity.in/v1/countries/', {
            headers: {
                'X-CSCAPI-KEY': 'TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA=='
            }
        })
            .then((response) => {
                // console.log(response.data)
                setCountry(response.data)
            })
    }, [])

    useEffect(() => {
        axios.get(`https://api.countrystatecity.in/v1/countries/${selected}/states`, {
            headers: {
                'X-CSCAPI-KEY': 'TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA=='
            }
        })
            .then((datas) => {
                console.log(datas.data)
             setState(datas.data)
            })
    }, [selected])

    useEffect(() => {
        axios.get(`https://api.countrystatecity.in/v1/countries/${selected}/states/${stateSelected}/cities`, {
            headers: {
                'X-CSCAPI-KEY': 'TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA=='
            }
        })
            .then((city) => {
                // console.log(city.data)
             setCities(city.data)
            })
    }, [stateSelected])
    return (
<>

        <div className='main'>
            <div className='country'>
                <h1>globeMapper</h1>
                <div className='option'>
            <select defaultValue={"select"} onChange={(e)=>setSelected(e.target.value)}>
                <option value= 'select' disabled >Please select countires</option>

                {
                    country.map((countires,index) => {
                        
                        return (

                            <option key={index} value={countires.iso2}>{countires.name}</option>

                        )
                    }

                    )
                }
            </select>
       
      
        <select defaultValue={"Stateselect"} onChange={(e)=>setstateSelected(e.target.value)}>
                <option value= 'Stateselect' disabled >State</option>

                {
                    state.map((states,index) => {
                       
                            
                        return (

                            <option value={states.iso2} key={index}>{states.name}</option>

                        )
                    }
                
                    )
                
                }
            </select>
            <select defaultValue={"citySelect"} >
                <option value='citySelect' disabled  >Cities</option>

                {
                    cities.map((cityy,index) => {
                    
                        return (

                            <option key={index}>{cityy.name}</option>

                        )
                    }
                
                    )
                }
            </select>
            </div>
            </div>
            </div>
       
        </>
    )
}

export default Country
