import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./style.css";
// import Spinner from './Spinner';
import TextField from "@mui/material/TextField";
import Modal from "./Modal";

const Tables = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [nameValue, setNameValue] = useState("");
  const [supplierIdValue, setsupplierIdValue] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);


  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://northwind.vercel.app/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    await axios.delete(`https://northwind.vercel.app/api/products/${id}`);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    await axios.post("https://northwind.vercel.app/api/products", {
      name: nameValue,
      supplierId: supplierIdValue,
    });
    getData();
  };

  useEffect(() => {
    getData();
  });
  return (
    <div className="tables">
      <form action="" onSubmit={addProduct}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={nameValue}
          onChange={(e) => {
            setNameValue(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="supplier Id"
          variant="outlined"
          value={supplierIdValue}
          name={supplierIdValue}
          onChange={(e) => {
            setsupplierIdValue(e.target.value);
          }}
        />
        <button className="addbtn" variant="contained" type="submit">
          Add
        </button>
      </form>
      <TableContainer component={Paper}>
        {/* {loading ? <Spinner/:} */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">quantityPerUnit</TableCell>
              <TableCell align="right">unitPrice</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .sort((a, b) => a.id - b.id)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row?.id}
                  </TableCell>
                  <TableCell align="right">{row?.name}</TableCell>
                  <TableCell align="right">{row?.quantityPerUnit}</TableCell>
                  <TableCell align="right">{row?.unitPrice}</TableCell>
                  <TableCell>
                    <button
                      className="deletebtn"
                      onClick={() => {setIsModalOpen(true)
                        deleteProduct(row.id)}}
                    >
                      Delete
                    </button>
                  </TableCell>
                  <TableCell>
                    <button
                      className="updatebtn "
                      onClick={() => {
                        let newname = prompt(`${row.name} modified`, row.name);
                        axios.patch(
                          `https://northwind.vercel.app/api/products/${row.id}`,
                          { name: newname }
                        );
                        let newArr = products.map((el) => {
                          if (el.id == row.id) {
                            el.name = newname;
                          }
                          return el;
                        });
                        setProducts(newArr);
                      }}
                    >
                      Update
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tables;
