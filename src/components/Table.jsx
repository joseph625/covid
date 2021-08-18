import React from 'react'
import './table.css'
function Table({countries}) {

    return (
        <div className="table">
            {countries.map(({country, cases, countryInfo},index) => (
                <tr key={index}>
                    <td>
                        <img src={countryInfo.flag} alt="" style={{width: "25px", height: "25px", borderRadius:"100%"}} />
                    </td>
                    <td> {country} </td>
                    <td>
                        <strong>{cases}</strong>
                    </td>
                </tr>
            ) )}
        </div>
    )
}

export default Table
