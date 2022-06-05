import { DocumentData, setDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { documentState } from '../atoms';
import { List, Title } from '../style/main-page';
import ListMenu from './ListMenu';
import { useGetDocRef } from '../hooks';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Note({ note }: DocumentData) {
  const setDocument = useSetRecoilState(documentState);
  const docRef = useGetDocRef(note.id);
  const navigator = useNavigate();
  const { register } = useForm();
  const onClickList = () => {
    navigator(`/main/${note.id}`);
  };
  const onChange = (e: any) => {
    setDocument(notes =>
      notes.map(value =>
        value.id === note.id ? { ...value, title: e.target.value } : value,
      ),
    );
  };

  const onBlur = async (e: any) => {
    if (docRef) {
      await setDoc(docRef, { title: e.target.value }, { merge: true });
    }
  };
  return (
    <List onClick={onClickList} className="show-editor-trigger">
      <IconContainer>
        <FontAwesomeIcon icon={faNoteSticky} className="sub-icon" />
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
  .sub-icon {
    color: rgba(0, 0, 0, 0.3);
    font-size: 20px;
  }
`;
