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
import { useGetDocRef, useGetListDocRef, useUpdateDocs } from 'hooks';
import { IDocument } from 'types';

interface INoteItemProps {
  note: IDocument;
}

export default function NoteItem({ note }: INoteItemProps) {
  const navigator = useNavigate();
  const updator = useUpdateDocs();
  const { register } = useForm();
  const myList = useRecoilValue(selectedListState);
  const docRef = useGetDocRef(note.id);
  const ListDocRef = useGetListDocRef(myList?.id, note.id);

  const onClickList = () => {
    if (myList) {
      navigator(`/main/lists/${myList.id}/tasks/${note.id}`);
    } else {
      navigator(`/main/${note.id}`);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updator(note.id, 'title', e.currentTarget.value);
  };

  const onBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (myList) {
      if (ListDocRef)
        await updateDoc(ListDocRef, { title: e.currentTarget.value });
    } else {
      if (docRef) await updateDoc(docRef, { title: e.currentTarget.value });
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
