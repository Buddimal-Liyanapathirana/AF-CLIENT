import React, { Component } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
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
  Text,
  Box,
} from "@chakra-ui/react";
import "./groups.css";
import { Button } from "@chakra-ui/button";
import { Input, Select } from "@chakra-ui/react";

function MyGroup() {
  const [myGroup, setMyGroup] = useState([]);

  useEffect(() => {
    const getStudentGroup = () => {
      // gets in which group the student exists
      let user = JSON.parse(localStorage.getItem("userInfo"));
      axios
        .get(`http://localhost:5000/api/studentGroup/user/${user._id}`)
        .then((res) => {
          setMyGroup(res.data["studentGroup"][0]["students"]);
        })
        .catch((err) => {
          console.log(err.massage);
        });
    };
    getStudentGroup();
  }, []);

  return (
    <div className="groupClass">
      <Box borderRadius="5px" bg="#E5E8E8" w="100%" p={4} color="black">
        <TableContainer className="usersList">
          <Table variant="simple">
            {!!myGroup.length && (
              <TableCaption>Your Group Members</TableCaption>
            )}
            {!myGroup.length && (
              <TableCaption>
                {" "}
                <Text color="red" fontSize="lg">
                  Your dont have a group
                </Text>
              </TableCaption>
            )}

            {!!myGroup.length && (
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                </Tr>
              </Thead>
            )}
            {myGroup && (
              <Tbody>
                {myGroup.map((e) => {
                  return (
                    <Tr key={e._id}>
                      <Td>{e.name}</Td>
                      <Td>{e.email}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default MyGroup;
