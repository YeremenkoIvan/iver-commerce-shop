import UserCard from "../../components/Cards/UserCard";
import ConsoleCard from "../../components/Cards/ConsoleCard/ConsoleCard";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import { useApi } from "../../hooks";

export default function Profile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { authFetch } = useApi();
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    authFetch("users/profile/", {
      method: "GET",
    })
      .then((data) => setProfile(data))
      .catch((error) => console.log(error));
    // .catch((error) => showAlert(error.toString()));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-4">
        <UserCard profile={profile} />
        <ConsoleCard profile={profile} className="flex-grow" />
      </div>
    </div>
  );
}
