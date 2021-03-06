import React, { Component } from "react";
import axios from "axios";
import { POKEMON_API_URL } from "../config";
import {
  CircularProgress,
  Box,
  withStyles,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { connect } from "react-redux";
import { toggleFavourite } from "../redux/actions";

const styles = (theme) => ({
  pokedexContainer: {
    height: "488px",
    backgroundColor: "black",
    color: "white",
    marginTop: 75,
    textAlign: "center",
    borderRadius: 5,
    paddingTop: 30,
    '@media (max-width: 599px)': {
      height: '580px',
    },
    '@media (min-width: 600px) and (max-width: 959px)': {
      height: '600px',
    },
  },
  textTitle: {
    textTransform: "upperCase",
    fontFamily: "Fantasy",
    '@media (max-width:599px)': {
      fontSize: '3rem',
    },
  },
  pokemonImage: {
    width: "170px",
    height: "170px",
  },
  pokemonInfoContainer: {
    bottom: '60',
    left: 15,
    position: "absolute",
    width: 'calc(100% - 30px)',
    
  },
  seperator: {
    height: "0.01mm",
    width: "95%",
  },
  favourite: {
    height: 50,
    width: 50,
    marginTop: 15,
  },
  text: {
    fontSize: 30,
  },
});

class PokemonDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match?.params;
    axios.get(POKEMON_API_URL + "/" + id).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        this.setState({ pokemon: response.data });
      }
    });
  }

  favouriteChecker(pokemon) {
    let found = false
    this.props.favourites?.map((p) => {
      if (p.id === pokemon.id) {
        found = true
      }
    })
    return found
  }
  render() {
    const { classes } = this.props;
    const { pokemon } = this.state;
    if (pokemon) {
      const { name, sprites, height, weight, types } = pokemon;
      return (
        <Box>
          <Box className={classes.pokedexContainer}>
          <Typography className={classes.textTitle} variant="h1">
              {name}
            </Typography>
            <img className={classes.pokemonImage} src={sprites.front_default} />
            <div className={classes.pokemonInfoContainer}>
            
            
              <hr className={classes.seperator} />
              <Grid container>
                <Grid item md={1} sm={6} xs={6}>
                  <Button
                    className={classes.favourite}
                    onClick={() => this.props.toggleFavourite(pokemon)}
                  >
                    <FavoriteIcon style={{ color: this.favouriteChecker(pokemon) ? "red" : "white", fontSize: 50 }} />
                  </Button>
                </Grid>
                <Grid item md={3} sm={6} xs={6}>
                  <Typography className={classes.text}>
                    Name
                    <br />
                    {name}
                  </Typography>
                </Grid>
                <Grid item md={2} sm={6} xs={6}>
                  <Typography className={classes.text}>
                    Height
                    <br />
                    {height}m
                  </Typography>
                </Grid>
                <Grid item md={2} sm={6} xs={6}>
                  <Typography className={classes.text}>
                    Weight
                    <br />
                    {weight}kg
                  </Typography>
                </Grid>
                {types.map((pokemonType) => {
                  const { name } = pokemonType.type;
                  return (
                    <Grid item md={2} sm={6} xs={6}>
                      <Typography className={classes.text}>
                        Type
                        <br />
                        {name}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </Box>
        </Box>
      );
    } else {
      return <CircularProgress />;
    }
  }
}

const mapStateToProps = (state) => ({
  favourites: state.favourites
});

const mapDispatchToProps = (dispatch) => ({
  toggleFavourite: (pokemon) => dispatch(toggleFavourite(pokemon)),
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(PokemonDetails)
);
