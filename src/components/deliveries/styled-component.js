import styled from "styled-components";

export const StyledDeliveries = styled.div`
  .tool-bar {
    background: #5082ed;
    color: #ffffff;

    svg {
      color: #ffffff;
    }
  }
  .search-box {
    padding: 20px;
    font-size: 20px;
    color: #000000;

    .wrapper {
      position: relative;

      .search_icon {
        height: 30px;
        width: 30px;
        padding: 4px;
        position: absolute;
        box-sizing: border-box;
        top: 50%;
        left: 2px;
        transform: translateY(-50%);
      }
      input {
        padding-left: 30px;
        width: 100%;
        outline: 0;
        border-width: 0 0 1px;
        border-color: rgb(136, 136, 136);

        &:focus {
          outline: 0;
        }
      }
    }
  }
`;
