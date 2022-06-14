import { setDoc, updateDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { dateState, selectedListState } from 'atoms';
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
import dayjs from 'dayjs';

interface INoteItemProps {
  note: IDocument;
}

export default function NoteItem({ note }: INoteItemProps) {
  const navigator = useNavigate();
  const updator = useUpdateDocs();
  const { register } = useForm();
  const myList = useRecoilValue(selectedListState);
  const setDate = useSetRecoilState(dateState);
  const docRef = useGetDocRef(note);
  const ListDocRef = useGetListDocRef(note);
  const allDocRef = useGetAllDocRef();
  const { pathname } = useLocation();

  const onClickList = () => {
    if (note.list && myList) {
      navigator(`/main/lists/${myList.id}/tasks/${note.id}`);
    } else if (pathname.includes('all')) {
      navigator(`/main/all/tasks/${note.id}`);
    } else {
      setDate(dayjs(note.date));
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
      await setDoc(
        allDocRef,
        { docMap: { [note.id]: { ...note, title } } },
        { merge: true },
      );
    }
  };
  return (
    <ListItemContainer>
      <NoteIconContainer onClick={onClickList} className="show-editor-trigger">
        <FontAwesomeIcon icon={faNoteSticky} className="sub-icon" size="lg" />
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
    width: 20px;
  }
`;
