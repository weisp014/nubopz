import React from "react";
import Footer from "../Footer/Footer";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function InfoPage() {
  return (
    <>
      <center>
        <Box m="auto" sx={{ width: "100%", maxWidth: 460 }}>
          <Paper sx={{ pt: 2, pb: 2, mb: 2 }}>
            <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
              Technologies:
              <br></br>
              React, Redux, Node,
              <br></br>
              Express, Material UI, OAuth 2.0
              <br></br>
              APIs:
              <br></br>
              Ticketmaster & Spotify
            </Typography>
          </Paper>
        </Box>
        <Box m="auto" sx={{ width: "100%", maxWidth: 460 }}></Box>
        <Paper sx={{ pt: 2, pb: 2 }}>
          <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
            LinkedIn:
            <br></br>
            <a href="https://www.linkedin.com/in/ryan-weispfenning/">
              https://www.linkedin.com/in/ryan-weispfenning/
            </a>
            <br></br>
            GitHub:
            <br></br>
            <a href="https://github.com/weisp014">
              https://github.com/weisp014
            </a>
          </Typography>
        </Paper>
      </center>

      <Footer />
    </>
  );
}

export default InfoPage;
