// dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCamera } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import React, { useRef, useState } from 'react';
import shortUUID from 'short-uuid';
import { FieldValues, useForm } from 'react-hook-form';
// components
import UserAccountMenu from '../UserAccountMenu';
// states
import { userInfoState } from 'atoms';
// firebase
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { auth, storage } from 'firebase-source';
import { updateProfile } from 'firebase/auth';
// styles
import * as S from './style';

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
  const [user, setUser] = useRecoilState(userInfoState);
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

  const storeImage = async (fileURL: string | ArrayBuffer) => {
    const storageRef = ref(storage, `images/${shortUUID.generate()}`);
    await uploadString(storageRef, fileURL as string, 'data_url');
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const updateProfileImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = async event => {
      const resultURL = event.target?.result;
      if (!resultURL) return;
      try {
        const url = await storeImage(resultURL);
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

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    const file = e.currentTarget.files[0];
    updateProfileImage(file);
  };

  const onBlurNameInput = async (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    await setDisplayName(value);
  };

  const onSubmitNameInput = async ({ displayName }: FieldValues) => {
    await setDisplayName(displayName);
  };

  return (
    <S.Wrapper>
      <S.ProfileImageContainer onClick={onClickProfileImage}>
        {user?.photoURL ? (
          <S.ProfileImage src={user.photoURL} alt="user_profile" />
        ) : (
          <FontAwesomeIcon icon={faUser} style={userIconStyle} />
        )}
        <FontAwesomeIcon icon={faCamera} className="camera-icon" />
      </S.ProfileImageContainer>
      <S.FileInput
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        ref={fileRef}
        onChange={onChangeFile}
      />

      {isEditing ? (
        <form
          onSubmit={handleSubmit(onSubmitNameInput)}
          style={{ width: '100%' }}
        >
          <S.DisplayNameInput
            {...register('displayName', {
              required: true,
              onBlur: onBlurNameInput,
            })}
            defaultValue={user?.displayName || user?.email || ''}
            spellCheck="false"
          />
        </form>
      ) : (
        <S.UserName onClick={onClickDisplayName}>
          {user?.displayName || user?.email || '익명'}
        </S.UserName>
      )}

      <UserAccountMenu />
    </S.Wrapper>
  );
}

export default UserAccount;
