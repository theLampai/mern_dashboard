import { useEffect, useRef } from "react";
import { useLogin } from "@pankod/refine-core";
import {
  Container,
  Box,
  FormControl,
  padding,
  border,
} from "@pankod/refine-mui";

import { yariga } from "../assets";

import { CredentialResponse } from "../interfaces/google";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []); // you can also add your client id as dependency here

    return <div ref={divRef} />;
  };

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: "#FCFCFC",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img src={yariga} alt="yariga logo" />
          </div>
          <Box mt={4}>
            <Box
              mb={4}
              sx={{
                display: "grid",
                alignItems: "center",
                gap: 2,
                width: "100%",
              }}
            >
              <input
                style={{
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid",
                }}
                type="email"
                placeholder="Username *"
              />
              <input
                style={{
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid",
                }}
                type="password"
                placeholder="Password *"
              />
            </Box>
            <GoogleButton />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};