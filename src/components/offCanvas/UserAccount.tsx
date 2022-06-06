import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { userState } from 'atoms';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import UserAccountMenu from './UserAccountMenu';

const userIconStyle = {
  width: '25px',
  height: '25px',
  padding: '5px',
  border: '2px solid #bbb',
  borderRadius: '50%',
  color: '#bbb',
};

function UserAccount() {
  const user = useRecoilValue(userState);
  return (
    <Wrapper>
      {user?.photoURL ? (
        <ProfileImage src={user.photoURL} alt="user_profile" />
      ) : (
        <FontAwesomeIcon icon={faUser} style={userIconStyle} />
      )}
      <UserName>{user?.displayName || user?.email || '익명'}</UserName>
      <UserAccountMenu />
    </Wrapper>
  );
}

export default UserAccount;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: 1px solid rgba(24, 24, 24, 0.1);
  white-space: nowrap;
  &:hover {
    .toggle-menu-icon {
      opacity: 1;
    }
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const UserName = styled.div`
  padding: 0 10px;
`;
