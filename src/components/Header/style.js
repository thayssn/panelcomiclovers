import styled from 'styled-components';

const Header = styled.header`
  background: linear-gradient(to left, #41b69c, #00a5e3);
  border-bottom: 1px solid #DDD;
  color: white;


  .logo__wrapper{
    width: 100%;
    text-align: center;
    padding: 10px;
  }

  .header{
    &__container{
      width: 100%;
      padding: 0 20px;
      margin: 0 auto;
    }

    &__nav{
    display: flex;
    padding: 10px;
    padding-top: 0;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

      a{
        margin: 10px;
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 12px;
        transition: all 0.3s;
        border-bottom: 1px solid transparent;

        &:visited, &:active, &:focus{
          color: inherit;
        }

        &:hover{
          border-bottom-color: white;
        }
      }
    }
  }
`;

export default Header;
