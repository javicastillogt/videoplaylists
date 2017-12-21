import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import '@firebase/firestore';
import styled from 'styled-components';
import { css } from 'styled-components';

const sizes = {
  small: 360,
  xmedium: 720,
  xlarge: 1200
}

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
		@media (min-width: ${sizes[label] / 16}em) {
			${css(...args)}
		}
	`
  return acc
}, {})

const StyledContainer = styled.div`
  padding: 20px;
  width: 100%;
`;
const StyledHeader = styled.div`
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 20px;
`;
const StyledContent = styled.div`
  list-style: none;
  width: calc(100% + 20px);
  margin-left: -10px;
  height: calc(100vh - 358px);
  overflow-y: auto;
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  ${media.xmedium`
    height: calc(100vh - 258px);
  `}
`;
const StyledUserItem = styled(Link)`
  padding: 20px 10px;
  border: 1px solid rgba(255,255,255,0.1);
  margin: 10px;
  text-align: center;
  width: 50%;
  color: #fff;
  text-decoration: none;
  transition: all .3s;
  ${media.xmedium`
    width: 33.3333%;
  `}
  ${media.xlarge`
    width: 25%;
  `}
  &:hover{
    border: 1px solid #fff;
  }
`;
const StyledUserImage = styled.img`
  border-radius: 50%;
  max-width: 60%;
  margin-bottom: 20px;
`;

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usersList: []
    };
  };


  componentWillMount() {

    //Get Users
    let usersRef = firebase.firestore().collection('users');

    //Order them by recently loged in
    usersRef = usersRef.orderBy("lastLogin", "desc");

    //Query Data
    usersRef.onSnapshot(querySnapshot => {
      const usersList = [];
      querySnapshot.forEach(function (doc) {
        usersList.push(doc.data());
      });
      this.setState({ usersList })
    });

  };

  render() {

    const userItems = this.state.usersList.map((user) => {
      return (
        <StyledUserItem to = {`/users/${user.uid}`} key={user.uid}> 
          <StyledUserImage src={user.photoURL} />
          <h4>{user.displayName}</h4>
          {/* <p>{user.uid}</p> */}
        </StyledUserItem>
      )
    });

    return (
      <StyledContainer>
        <StyledHeader>
          <h1>Recently Active Users</h1>
        </StyledHeader>
        <StyledContent>
          {userItems}
        </StyledContent>
      </StyledContainer>
    )
  }
}

export default Users;
