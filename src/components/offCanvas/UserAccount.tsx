import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCamera } from '@fortawesome/free-solid-svg-icons';
import { userState } from 'atoms';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import UserAccountMenu from './UserAccountMenu';
import { useRef, useState } from 'react';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { auth, storage } from 'firebase-source';
import shortUUID from 'short-uuid';
import { updateProfile } from 'firebase/auth';
import { FieldValues, useForm } from 'react-hook-form';

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
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const { register, setFocus, handleSubmit } = useForm();

  const onClickProfileImage = () => {
    fileRef.current?.click();
  };

  const onClickDisplayName = () => {
    setIsEditing(true);
    setTimeout(() => setFocus('displayName'), 200);
  };

  const setDisplayName = async (value: string) => {
    setUser(user => ({ ...user, displayName: value }));
    setIsEditing(false);
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: value });
    }
  };

  const storageImage = async (fileURL: string | ArrayBuffer) => {
    const fileRef = ref(storage, `images/${shortUUID.generate()}`);
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

  const onBlurNameInput = async (e: any) => {
    const value = e.target.value;
    await setDisplayName(value);
  };

  const onSubmitNameInput = async (values: FieldValues) => {
    const value = values.displayName;
    await setDisplayName(value);
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

      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmitNameInput)}>
          <DisplayNameInput
            {...register('displayName', {
              required: true,
              onBlur: onBlurNameInput,
            })}
            defaultValue={user?.displayName || user?.email || ''}
          />
        </form>
      ) : (
        <UserName onClick={onClickDisplayName}>
          {user?.displayName || user?.email || ''}
        </UserName>
      )}

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

const DisplayNameInput = styled.input`
  margin: 0 10px;
  width: 60%;
  background-color: rgb(244, 244, 244);
  border: none;
  border-bottom: 1px solid lightgray;
  &:focus {
    outline: none;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const UserName = styled.div`
  cursor: pointer;
  padding: 0 10px;
`;
