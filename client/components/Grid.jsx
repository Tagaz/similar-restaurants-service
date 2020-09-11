import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

// eslint-disable-next-line import/extensions
import CardsList from './CardsList.jsx';
// eslint-disable-next-line import/extensions
import GridHeader from './GridHeader.jsx';

const Container = styled.div`
  background-color: rgb(250,250,250);
  width: 100%;
  margin-top: 48px;
  color: #101820;
  font-family: Roboto, "Helvetica Neue", sans-serif;
`;

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: window.location.pathname.split('/')[1],
      currentName: '',
      currentCategory: '',
      similarRestaurants: [],
      photos: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { currentId } = this.state;
    this.getInfo(currentId);
  }

  getInfo(id) {
    axios.get(`/restaurants/${id}`)
      .then((res) => {
        this.setState({
          currentName: res.data.restaurant.name,
          currentCategory: res.data.restaurant.category,
          similarRestaurants: res.data.similar,
          photos: res.data.photos,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  handleClick(e, id) {
    this.handleClick = e.preventDefault();
    this.handleClick = window.open(`/${id}`, '_blank');
  }

  render() {
    const {
      currentCategory, currentName, similarRestaurants, photos,
    } = this.state;

    if (similarRestaurants.length < 2) {
      return null;
    }

    return (
      <Container>
        <GridHeader
          currentCategory={currentCategory}
          currentName={currentName}
        />
        <CardsList
          similarRestaurants={similarRestaurants}
          photos={photos}
          handleClick={this.handleClick}
        />
      </Container>
    );
  }
}

export default Grid;
