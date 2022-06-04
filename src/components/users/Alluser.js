import React, { useState, useEffect } from "react";
import axios from "axios";
import "./userPages.css";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Text,
} from "@chakra-ui/react";
import { Input, Select } from "@chakra-ui/react";

export default function Alluser() {
  const [users, setusers] = useState([]);

  let userData = JSON.parse(localStorage.getItem("userInfo"));
  let ID = userData._id;
  // console.log(ID);

  useEffect(() => {
    function getOrder() {
      axios
        .get("http://localhost:5000/api/user/all")
        .then((res) => {
          setusers(res.data);
        })
        .catch((err) => {
          alert(err.massage);
        });
    }
    getOrder();
  }, []);

  const filterSearch = (items, searchKey) => {
    // checks if an item name includes the sort by value , then pass the matched items to the state
    const result = items.filter(
      (item) =>
        item.name.includes(searchKey) ||
        item.name.toLowerCase().includes(searchKey)
    );
    setusers(result);
  };

  const handleSearch = (e) => {
    // executes when the value in sort serch is input
    const searchKey = e.currentTarget.value;
    axios
      .get("http://localhost:5000/api/user/all")
      .then((res) => {
        filterSearch(res.data, searchKey);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const filterSort = (items, searchKey) => {
    // checks if an item name includes the sort by value , then pass the matched items to the state
    const result = items.filter((item) => item.role.includes(searchKey));
    setusers(result);
  };

  const handleSort = (e) => {
    // executes when the value in sort field is clicked
    const searchKey = e.currentTarget.value;
    axios
      .get("http://localhost:5000/api/user/all")
      .then((res) => {
        filterSort(res.data, searchKey);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleUserRole = async (e, id) => {
    let role = e.currentTarget.value;
    console.log("helooo", role, id);

    await axios
      .put(`http://localhost:5000/api/user/role/${id}`, {
        role: String(role),
      })
      .then((res) => res.data);
  };

  return (
    <div className="usersLIstContainer">
      <Box
        className="usersBox"
        borderRadius="5px"
        bg="#E5E8E8"
        w="100%"
        p={4}
        color="black"
      >
        <div className="searchSort">
          <Input
            onChange={handleSearch}
            borderColor="black"
            className="searchUser"
            placeholder="Search users"
            color="black"
            _placeholder={{ color: "black" }}
          />
          <Select
            onChange={handleSort}
            className="sortUser"
            placeholder="Sort By Role"
            borderColor="black"
          >
            <option value="STUDENT">Student</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPERVISOR">Staff</option>
            {/* <option value="COSUPERVISOR">Co-Supervisor</option> */}
          </Select>
        </div>

        <TableContainer className="usersList">
          <Table variant="simple">
            <TableCaption>List of Users</TableCaption>
            <Thead>
              <Tr>
                <Th>User ID</Th>
                <Th>Name</Th>
                <Th>Role</Th>
                <Th>Phone</Th>
                <Th>Email</Th>
                {/* <Th>Update Role</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {users.map(function (f) {
                return (
                  <Tr key={f._id}>
                    <Td>{f._id}</Td>
                    <Td>{f.name} </Td>
                    <Td>{f.role} </Td>
                    <Td>{f.contactNo} </Td>
                    <Td>{f.email} </Td>
                    {ID !== f._id && (
                      <Td width="290px">
                        {" "}
                        <Select
                          placeholder="CHANGE ROLE"
                          onClick={(e) => handleUserRole(e, f._id)}
                        >
                          <option value="ADMIN">Admin</option>
                          <option value="STUDENT">Student</option>
                          <option value="SUPERVISOR">Supervisor</option>
                          <option value="COSUPERVISOR">Co-Supervisor</option>
                        </Select>
                      </Td>
                    )}
                    {ID === f._id && (
                      <Td>
                        <Text color="#E74C3C">Cannot Change Role</Text>
                      </Td>
                    )}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
