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
  Text,
  Box,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Input, Select } from "@chakra-ui/react";

let stud = []; //this array holds the student id's before adding them to the database

export default function Allstudent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setusers] = useState([]);
  const [hasGroup, setHasGroup] = useState([]);

  useEffect(() => {
    function getOrder() {
      axios
        .get("https://project-fix-sliit.herokuapp.com/api/user/students")
        .then((res) => {
          setusers(res.data);
        })
        .catch((err) => {
          alert(err.massage);
        });
    }
    getOrder();
  }, []);

  const onAdd = (id) => {
    //adds members to student array
    if (stud.includes(id)) {
      return;
    } else if (stud.length >= 3) {
      return;
    }
    stud.push(id);
  };

  const handleCreateGroup = () => {
    // adds selected members to the group by sending request
    let user = JSON.parse(localStorage.getItem("userInfo"));
    let reqObj = { students: [user._id, ...stud] };

    axios.put(
      `https://project-fix-sliit.herokuapp.com/api/user/groupSet/${user._id}`,
      {
        hasGroup: Boolean(true),
      }
    );

    stud.forEach((id) => {
      axios.put(
        `https://project-fix-sliit.herokuapp.com/api/user/groupSet/${id}`,
        {
          hasGroup: Boolean(true),
        }
      );
    });

    axios
      .post("https://project-fix-sliit.herokuapp.com/api/studentGroup/", reqObj)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.massage);
      });
  };

  const getStudentGroup = () => {
    // gets in which group the student exists
    let user = JSON.parse(localStorage.getItem("userInfo"));
    axios
      .get(
        `https://project-fix-sliit.herokuapp.com/api/studentGroup/user/${user._id}`
      )
      .then((res) => {
        setHasGroup(res.data.studentGroup.length);
      })
      .catch((err) => {
        alert(err.massage);
      });
  };
  getStudentGroup();

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
      .get("https://project-fix-sliit.herokuapp.com/api/user/students")
      .then((res) => {
        filterSearch(res.data, searchKey);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const filterSort = (items, searchKey) => {
    // console.log(searchKey);
    // // checks if an item name includes the sort by value , then pass the matched items to the state
    // const result = items.filter((item) => item.hasGroup == searchKey);
    // setusers(result);
  };

  const handleSort = (e) => {
    const searchKey = e.currentTarget.value;
    axios
      .get("https://project-fix-sliit.herokuapp.com/api/user/students")
      .then((res) => {
        filterSort(res.data, searchKey);
      })
      .catch((err) => {
        console.log(err.message);
      });
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
            onClick={handleSort}
            className="sortUser"
            placeholder="Sort By Role"
            borderColor="black"
          >
            <option value={true}>With a group</option>
            <option value={false}>Without a group</option>
          </Select>
        </div>
        {/* Table for display Students details */}
        <TableContainer className="usersList">
          <Table variant="simple">
            <TableCaption>
              {!hasGroup && (
                <Button onClick={onOpen}>View Students Group</Button>
              )}
              {!!hasGroup && (
                <Text color="red" fontSize="lg">
                  You are already in a group
                </Text>
              )}
            </TableCaption>
            <Thead>
              <Tr>
                <Th>User ID</Th>
                <Th>Name</Th>
                <Th>Role</Th>
                <Th>Phone</Th>
                <Th>Email</Th>
                <Th></Th>
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
                    <Td>
                      {!hasGroup && (
                        <Button
                          colorScheme="green"
                          onClick={() => onAdd(f._id)}
                        >
                          Add
                        </Button>
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        {/* popup modal for "View Students Group" button */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TableContainer className="usersList">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>User ID</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {stud.map(function (f) {
                      return (
                        <Tr key={f}>
                          <Td>{f}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="twitter" onClick={handleCreateGroup}>
                Register Group
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </div>
  );
}
