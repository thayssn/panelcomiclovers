import styled from 'styled-components';

const CollectionContainer = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 30px 20px;
  max-width: 960px;

  header{
    display: flex;
    justify-content: space-between;

    p{
      margin-top: 20px;
      font-size: 14px;
      font-weight: 300;
    }

    .button{
      background-color: #333;
      padding: 10px;
      color: white;
      border-radius: 5px;
      text-decoration: none;
      margin: 0 5px;
      font-size: 14px;
      cursor: pointer;
    }
  }

  .collection{
    background-color: white;
    border-radius: 3px;
    padding: 20px;
    display: flex;
    margin-bottom: 30px;

    &__header{
      display: flex;
      justify-content: space-between;
      align-items: center;

      a{
        padding: 5px 30px;
        font-size: 16px;
        background-color: #333;
        border-radius: 3px;
        border: none;
        color: white;
        margin: 20px 0;
      }
    }

    &__thumbnail{
      margin-right: 20px;
      flex-shrink: 0;
      width: 150px;
      height: 200px;

      img{
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }

    &__title{
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    &__info{
      margin: 10px 0;

      &__block{
        line-height: 1.4;
        margin-bottom: 15px;
      }

      span{
        font-weight: bold;
      }
    }
  }

  .book{
    width: 100%;
    background-color: #FFF;
    border: 1px solid #DDD;
    margin-top: 30px;
    border-radius: 3px;
    display: flex;

    &__thumbnail{
      width: 110px;
      height: 150px;
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
      }
    }

    &__info{
      padding: 10px;
      flex: 1;

      @media (max-width: 540px){
        padding: 5px;
      }
    }

    &__action{
      padding: 30px;
      flex-shrink: 0;
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


export default CollectionContainer;
