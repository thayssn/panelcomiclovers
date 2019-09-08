import styled from 'styled-components';

const Header = styled.header`
  background: linear-gradient(to left, #41b69c, #00a5e3);
  height: 72px;
  border-bottom: 1px solid #DDD;
  color: white;

  a{
    margin: 0 10px;
    color: #fff;
    text-decoration: none;

    &:visited, &:active, &:focus{
      color: inherit;
    }
  }

  .header{
    &__container{
      width: 100%;
      max-width: 980px;
      padding: 0 20px;
      margin: 0 auto;
      height: 72px;

      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

export default Header;
