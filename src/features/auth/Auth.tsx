import { Card, CardContent, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../../components/auth/SignIn";
import Signup from "../../components/auth/Signup";

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Auth = () => {
  const [tab, setTab] = useState<number>(0);
  const moveToSignIn = () => setTab(0);
  useEffect(() => {
  }, []);
  return (
    <React.Fragment>
      <Container sx={{ marginTop: "50px" }} maxWidth="sm">
        <Card variant="elevation" elevation={8}>
          <Tabs
            sx={{ border: '0.5px solid lightgrey' }}
            indicatorColor="primary"
            textColor="primary"
            value={tab}
            onChange={(e: SyntheticEvent, newTab: number) => setTab(newTab)}
            variant="fullWidth"
          >
            <Tab label="Sign In" {...a11yProps(0)} />
            <Tab label="Register" {...a11yProps(1)} />
          </Tabs>
          <CardContent>
            {
              tab === 0 ? <SignIn /> : <Signup moveToSignIn={moveToSignIn} />
            }
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Auth;