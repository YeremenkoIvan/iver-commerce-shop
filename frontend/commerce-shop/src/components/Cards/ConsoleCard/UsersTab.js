import UserMiniCard from "../UserMiniCard";
import { useApi } from "../../../hooks";
import { useContext, useEffect, useState } from "react";
// import { AlertContext } from "../../../context";

export default function UsersTab() {
  const { authFetch } = useApi();
  //   const { showAlert } = useContext(AlertContext);
  const [users, setUsers] = useState();

  useEffect(() => {
    authFetch("users/", {
      method: "GET",
    })
      .then((data) => setUsers(data))
      .catch((error) => {
        console.log(error);
      });
    //   .catch((error) => showAlert(error.toString()));
  }, []);

  return (
    <div className="max-h-[550px] overflow-y-auto ">
      <div className="flex flex-col p-0">
        {users &&
          users.map((user) => <UserMiniCard key={user.id} user={user} />)}
      </div>
    </div>
  );
}
