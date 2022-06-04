import React, { useState } from "react";
import axios from "axios";
import { Box, Text, Button } from "@chakra-ui/react";

export default function CreateMarking() {
  const [attachment, setAttachment] = useState("");

  const handleFileUpload = (event) => {
    event.persist();

    let files = event.target.files;
    setAttachment(files[0]);
  };

  async function sendData(e) {
    e.preventDefault();

    if (attachment) {
      var data = new FormData();
      var fileUrl = "";
      data.append("attachment", attachment);

      await axios
        .post("http://localhost:5000/api/files/uploadFile", data)
        .then(async (res) => {
          if (res.status == 200) {
            console.log(res);
            fileUrl = res.data.path.replace(/\\/g, "/");

            const newMarking = {
              attachment: fileUrl,
            };

            await uploadSchemeData(newMarking);
          } else {
            console.log(res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const newMarking = {
        attachment: fileUrl,
      };

      await uploadSchemeData(newMarking);
    }
  }

  async function uploadSchemeData(newMarking) {
    console.log(newMarking);
    await axios
      .post("http://localhost:5000/api/marking", newMarking)
      .then((res) => {
        console.log(res);

        if (res.status == 201) {
          window.location.reload(false);
        } else {
          //error
        }
        // if (willcreate) {
        //   swal({
        //     title: "Success",
        //     text: "Marking Scheme Successfully Created",
        //     icon: "success",
        //     type: "success",
        //   }).then(function () {
        //     window.location.href = "/allmarkings";
        //   });
        // } else {
        //   swal("Create Marking Scheme Failed!");
        // }
      });
  }

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
        <div className="container">
          <form onSubmit={sendData}>
            <br />
            <center>
              <Text color="#2874A6" fontSize="2xl">
                Upload Marking Schemes
              </Text>
            </center>
            <br />

            <div class="form-group">
              <Text color="#2874A6" fontSize="1xl">
                Attachments
              </Text>
              <input
                type="file"
                class="form-control"
                id="attachment"
                placeholder="Select Attachment"
                onChange={(e) => handleFileUpload(e)}
              />
            </div>
            <br />
            <Button type="submit" colorScheme="teal">
              Submit
            </Button>
          </form>
        </div>
      </Box>
    </div>
  );
}
