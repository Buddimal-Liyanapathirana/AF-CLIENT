import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Input,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState();
  const [contactNo, setContactNo] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`/api/user/${user._id}`);
      setName(data.name);
      setContactNo(data.contactNo);
      setEmail(data.email);
    };
    getUser();
  });

  const handleUpdate = async () => {
    console.log("submmit");
    await axios
      .put(`http://localhost:5000/api/user/${user._id}`, {
        name: String(name),
        email: String(email),
        contactNo: String(contactNo),
      })
      .then((res) => res.data);
  };

  const updateState = (user) => {};

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="610px">
          <ModalHeader
            fontSize="30px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />

            <form
              className="updateForm"
              style={{ width: 400 }}
              onSubmit={handleUpdate}
            >
              <FormControl>
                <FormLabel htmlFor="email">Name</FormLabel>
                <Input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                />
                <FormLabel htmlFor="email">Contact No</FormLabel>
                <Input
                  maxLength="10"
                  name="contactNo"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.currentTarget.value)}
                />
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </FormControl>
              <Button mt={4} colorScheme="teal" type="submit">
                Submit
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
