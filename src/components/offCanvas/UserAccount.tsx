import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCamera } from '@fortawesome/free-solid-svg-icons';
import { userState } from 'atoms';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import UserAccountMenu from './UserAccountMenu';
import { useRef } from 'react';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { auth, storage } from 'firebase-source';
import { v4 as uuidv4 } from 'uuid';
import { updateProfile } from 'firebase/auth';

const userIconStyle = {
  width: '25px',
  height: '25px',
  padding: '5px',
  border: '2px solid #bbb',
  borderRadius: '50%',
  color: '#bbb',
};

function UserAccount() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useRecoilState(userState);

  const onClickProfileImage = () => {
    fileRef.current?.click();
  };

  const storageImage = async (fileURL: string | ArrayBuffer) => {
    const fileRef = ref(storage, `images/${uuidv4()}`);
    await uploadString(fileRef, fileURL as string, 'data_url');
    const url = await getDownloadURL(fileRef);
    return url;
  };

  const onChangeFile = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async event => {
      const resultURL = event.target?.result;
      try {
        if (!resultURL) return;
        const url = await storageImage(resultURL);
        setUser(user => ({ ...user, photoURL: url }));
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, { photoURL: url });
        }
      } catch (err) {
        console.error(err);
      }
    };
    reader.readAsDataURL(file);
  };
  return (
    <Wrapper>
      <ProfileImageContainer onClick={onClickProfileImage}>
        {user?.photoURL ? (
          <ProfileImage src={user.photoURL} alt="user_profile" />
        ) : (
          <FontAwesomeIcon icon={faUser} style={userIconStyle} />
        )}
        <FontAwesomeIcon icon={faCamera} className="camera-icon" />
      </ProfileImageContainer>
      <FileInput
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        ref={fileRef}
        onChange={onChangeFile}
      />
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

const ProfileImageContainer = styled.div`
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

const FileInput = styled.input`
  display: none;
`;

const UserName = styled.div`
  padding: 0 10px;
`;
