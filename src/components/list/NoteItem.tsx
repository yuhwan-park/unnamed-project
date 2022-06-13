import { updateDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { selectedListState } from 'atoms';
import { IconContainer, ListItemContainer, Title } from 'style/main-page';
import ListMenu from './ListMenu';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useGetAllDocRef,
  useGetDocRef,
  useGetListDocRef,
  useUpdateDocs,
} from 'hooks';
import { IDocument } from 'types';
import ListIcons from './ListIcons';

interface INoteItemProps {
  note: IDocument;
}

export default function NoteItem({ note }: INoteItemProps) {
  const navigator = useNavigate();
  const updator = useUpdateDocs();
  const { register } = useForm();
  const myList = useRecoilValue(selectedListState);
  const docRef = useGetDocRef(note);
  const ListDocRef = useGetListDocRef(note);
  const allDocRef = useGetAllDocRef(note.id);

  const onClickList = () => {
    if (myList) {
      navigator(`/main/lists/${myList.id}/tasks/${note.id}`);
    } else {
      navigator(`/main/${note.id}`);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updator(note, 'title', e.currentTarget.value, false);
  };

  const onBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value;
    if (ListDocRef) {
      await updateDoc(ListDocRef, { title });
    }
    if (docRef) {
      await updateDoc(docRef, { title });
    }
    if (allDocRef) {
      await updateDoc(allDocRef, { title });
    }
  };
  return (
    <ListItemContainer>
      <NoteIconContainer onClick={onClickList} className="show-editor-trigger">
        <FontAwesomeIcon icon={faNoteSticky} className="sub-icon" />
      </NoteIconContainer>
      <Title
        className="show-editor-trigger"
        defaultValue={note.title}
        onClick={onClickList}
        {...register('noteTitle', {
          onBlur,
          onChange,
        })}
      />
      <ListIcons item={note} />
      <ListMenu item={note} isEditor={false} />
    </ListItemContainer>
  );
}

const NoteIconContainer = styled(IconContainer)`
  z-index: 1;
  .sub-icon {
    color: rgba(0, 0, 0, 0.3);
    font-size: 20px;
  }
`;
