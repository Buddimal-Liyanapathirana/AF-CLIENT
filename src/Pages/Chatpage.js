import { Route } from "react-router-dom";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import ChatBody from "./ChatBody";
import Main from "../components/main/main";
import Alluser from "../components/users/Alluser";
import Allstudent from "../components/users/Allstudent";
import MyGroup from "../components/groups/myGroup";
import Allsupervisor from "../components/users/Allsupervisor";
import AllCosupervisor from "../components/users/AllCosupervisor";

const Chatpage = () => {
  // const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Route path="/body/chats" component={ChatBody} />
      <Route path="/body/main" component={Main} />
      <Route path="/body/allUsers" component={Alluser} />
      <Route path="/body/allStudents" component={Allstudent} />
      <Route path="/body/allSupervisors" component={Allsupervisor} />
      <Route path="/body/allCoSupervisors" component={AllCosupervisor} />
      <Route path="/body/myGroup" component={MyGroup} />
    </div>
  );
};

export default Chatpage;
