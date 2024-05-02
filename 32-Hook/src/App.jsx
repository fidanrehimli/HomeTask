import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import './App.css'
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { productFormSchema } from "./schema/productFrom.jsx";
errors.companyName?.message
const Table = () => {
  const [data, setData] = useState([])
  const [companyName, setCompanyName] = useState("")
  const [contactName, setContactName] = useState("")
  const [city, setCity] = useState("")
  const [region, setRegion] = useState("")

  useEffect(() => {
    axios("https://northwind.vercel.app/api/suppliers").then((res) => {
      console.log(res.data);
      setData(res.data)
    })
  }, [])

  return (
    <>
      <div className="inp">
        <input type="text" placeholder="companyName"
        {...register("companyName")}
         onChange={(e) => setCompanyName(e.target.value)}
          />
         {errors.companyName?.message && (
          <p style={{color:"red"}}>{errors.companyName?.message}</p>
         )}

        <input type="text" placeholder="contactName" onChange={(e) => setContactName(e.target.value)} />
        <input type="text" placeholder="city" onChange={(e) => setCity(e.target.value)} />
        <input type="text" placeholder="region" onChange={(e) => setRegion(e.target.value)} />
        <button type="submit" className="submitbtn" onClick={() => {
          const newData = { companyName: companyName, contactName: contactName,address:{ city: city, region: region} }
          axios.post("https://northwind.vercel.app/api/suppliers", newData).then((res) => {
            console.log(res.data);
          })
        }} >Submit</button>
      </div>
      <div className="tableData">
        <table className="table" border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>CompanyName</th>
              <th>ContactName</th>
              <th>City</th>
              <th>Region</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.id}</td>
                  <td>{val.companyName}</td>
                  <td>{val.contactName}</td>
                  <td>{val.address?.city}</td>
                  <td>{val.address?.region}</td>
                  <td>
                    <button className="deletebtn" onClick={() => {
                      let newArr = data.filter((item => item.id != val.id))
                      axios.delete("https://northwind.vercel.app/api/suppliers" + "/" + val.id)
                      setData(newArr)
                    }}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
export default Table