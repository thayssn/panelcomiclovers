import styled from 'styled-components';

export default styled.section`
  width: 100%;
  max-width: 960px;
  background-color: white;
  padding: 20px;
  margin: 30px auto;

  form{
    width: 100%;
    padding: 20px 0;
  }

  .thumbnail{
    width: 150px;
  }

  .inputGroup{
    display: flex;
    align-items: center;

    button{
      flex-shrink: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  input {
    width: 100%;
    margin: 10px 0;
    padding: 5px;
    border-radius: 3px;
    font-size: 14px;
    border: 1px solid #DDD;
  }

  button{
    padding: 5px 30px;
    font-size: 16px;
    background-color: #333;
    border-radius: 3px;
    border: none;
    color: white;

    &:active{
      background-color: #111;
      outline: none;
    }
  }

  .error{
    color: red;
    font-size: 10px;
    margin-top: 10px;
  }
`;
