import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: 1px solid rgba(24, 24, 24, 0.1);
  &:hover {
    .toggle-menu-icon {
      opacity: 1;
    }
  }
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .camera-icon {
    position: absolute;
    color: rgba(255, 255, 255, 0.6);
    font-size: 24px;
    opacity: 0;
  }
  &:hover {
    .camera-icon {
      opacity: 1;
    }
  }
`;

export const DisplayNameInput = styled.input`
  padding: 0 10px;
  width: 100%;
  background-color: rgb(244, 244, 244);
  border: none;
  border-bottom: 1px solid lightgray;
  &:focus {
    outline: none;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const UserName = styled.h2`
  cursor: pointer;
  padding: 0 10px;
  width: 100%;
  ${({ theme }) => theme.textEllipsis};
`;
