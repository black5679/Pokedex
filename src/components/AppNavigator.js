import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  AppBar: {
    backgroundColor: "black",
  },
  link: {
    textDecoration: "none",
  },
  title: {
    cursor: 'pointer',
    color: 'white'
  }
}));

export default function AppNavigator() {
  const classes = useStyles();

  return (
    // <AppBar className={classes.AppBar} position="fixed">
    //   <Toolbar>
    //     <Link to="/" className={classes.link}>
    //       <Typography className={classes.title} variant="h6">Pokedex</Typography>
    //     </Link>
    //     <Link to="/favourites" className={classes.link}>
    //       <Typography className={classes.title} variant="h6" style={{ marginLeft: 15 }}>Favourites</Typography>
    //     </Link>
    //   </Toolbar>
    // </AppBar>
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" position="fixed">
      <Container fluid>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {/* <Link to="/" className={classes.link}>
          Pokedex
        </Link> */}
        <Nav.Link href="/">Home</Nav.Link>
         <Nav.Link href="/favourites">
          Favourites
         </Nav.Link>
        </Nav>
        <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
