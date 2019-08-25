import styled from 'styled-components';

const BookContainer = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 30px 20px;
  max-width: 960px;

  .book{
    background-color: white;
    border-radius: 3px;
    padding: 20px;
    display: flex;

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
`;


export default BookContainer;
