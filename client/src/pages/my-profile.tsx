import { useGetIdentity, useOne } from "@pankod/refine-core";

import { Profile } from "components";
import { CircularProgress } from "@pankod/refine-mui";

const MyProfile = () => {
  const { data: user } = useGetIdentity();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: user?.userid,
  });

  const myProfile = data?.data ?? [];

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Error...</div>;

  return (
    <Profile
      type="My"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default MyProfile;
