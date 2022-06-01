import { User } from 'firebase/auth';
import { doc, DocumentData, setDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { dateSelector, noteState, paramState } from '../atoms';
import { List, Title } from '../style/main-page';
import { auth, db } from '../firebase';
import ListMenu from './ListMenu';

export default function Note({ note }: DocumentData) {
  const setParams = useSetRecoilState(paramState);
  const setNotes = useSetRecoilState(noteState);
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
    setParams(note.id);
    navigator(`/main/${note.id}`);
  };
  const onChange = (e: any) => {
    setNotes(notes =>
      notes.map(value =>
        value.id === note.id ? { ...value, title: e.target.value } : value,
      ),
    );
  };

  const onBlur = async (e: any) => {
    await setDoc(docRef, { title: e.target.value }, { merge: true });
  };
  return (
    <List onClick={onClickList} className="show-editor-trigger">
      <IconContainer>
        <i className="fa-solid fa-note-sticky"></i>
      </IconContainer>
      <Title
        defaultValue={note.title}
        {...register('noteTitle', {
          onBlur,
          onChange,
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
