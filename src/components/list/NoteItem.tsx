import { DocumentData, setDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { documentState } from 'atoms';
import { ListItemContainer, Title } from 'style/main-page';
import ListMenu from './ListMenu';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetDocRef } from 'hooks';

export default function NoteItem({ note }: DocumentData) {
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
    <ListItemContainer>
      <IconContainer onClick={onClickList} className="show-editor-trigger">
        <FontAwesomeIcon icon={faNoteSticky} className="sub-icon" />
      </IconContainer>
      <Title
        className="show-editor-trigger"
        defaultValue={note.title}
        onClick={onClickList}
        {...register('noteTitle', {
          onBlur,
          onChange,
        })}
      />
      <ListMenu item={note} />
    </ListItemContainer>
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
