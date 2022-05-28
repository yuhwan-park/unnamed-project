import { User } from 'firebase/auth';
import { doc, DocumentData } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { dateSelector } from '../atoms';
import { List, Title } from '../style/main-page';
import { auth, db } from '../firebase';
import { setTitle } from '../utils';
import ListMenu from './ListMenu';

export default function Note({ note }: DocumentData) {
  const date = useRecoilValue(dateSelector);
  const navigator = useNavigate();
  const { register } = useForm({
    mode: 'onBlur',
  });
  const docRef = doc(
    db,
    `${(auth.currentUser as User).uid}/${date}/Document/${note.id}`,
  );
  const onClickList = () => {
    navigator(`/main/${note.id}`);
  };

  const onBlur = async (e: any) => {
    await setTitle(docRef, e);
  };
  return (
    <List onClick={onClickList}>
      <IconContainer>
        <i className="fa-solid fa-note-sticky"></i>
      </IconContainer>
      <Title
        defaultValue={note.title}
        {...register('noteTitle', {
          onBlur,
        })}
      />
      <ListMenu document={note} />
    </List>
  );
}

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  i {
    color: rgba(0, 0, 0, 0.3);
    font-size: 20px;
  }
`;
