import { useOne } from "@pankod/refine-core";
import { useParams } from "@pankod/refine-react-router-v6";

import { Profile } from "components";
import { CircularProgress } from "@pankod/refine-mui";

const AgentProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string,
  });

  console.log(data);

  const myProfile = data?.data ?? [];

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>error...</div>;

  return (
    <Profile
      type="Agent"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default AgentProfile;
