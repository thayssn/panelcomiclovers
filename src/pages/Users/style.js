import styled from 'styled-components';

const UsersList = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 30px 20px;

  @media (min-width: 992px){
    max-width: 960px;
  }

  header{
    display: flex;
    justify-content: space-between;

    a{
      background-color: #333;
      padding: 10px;
      color: white;
      border-radius: 5px;
      text-decoration: none;
    }
  }

  .user{
    width: 100%;
    background-color: #FFF;
    border: 1px solid #DDD;
    margin-top: 30px;
    border-radius: 3px;
    display: flex;

    &__thumbnail{
      width: 110px;
      height: 110px;
      background-color: #DDD;
      flex-shrink: 0;

      @media (max-width: 540px){
        width: 60px;
        height: 75px;
      }

      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        flex-shrink: 0;
      }
    }

    &__info{
      padding: 10px;

      @media (max-width: 540px){
        padding: 5px;
      }
    }

    &__title{
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;

      @media (max-width: 540px){
        font-size: 14px;
        margin-bottom: 5px;
      }
    }
  }
`;


export default UsersList;
