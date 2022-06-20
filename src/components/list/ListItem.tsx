import React from 'react';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetDocRef, useGetListDocRef, useUpdateDocs } from 'hooks';
import { IconContainer, ListItemContainer, Title } from 'style/main-page';
import ListMenu from './ListMenu';
import CheckBox from 'components/common/CheckBox';
import { IDocument } from 'types';
import ListIcons from './ListIcons';
import { useRecoilValue } from 'recoil';
import { screenStatusState } from 'atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from 'firebase-source';

interface ITodoItemProps {
  item: IDocument;
}

function ListItem({ item }: ITodoItemProps) {
  const updator = useUpdateDocs();
  const docRef = useGetDocRef(item);
  const ListDocRef = useGetListDocRef(item);
  const navigator = useNavigate();
  const { register } = useForm();
  const screenStatus = useRecoilValue(screenStatusState);

  const onClickList = () => {
    if (item.list && screenStatus === 'List') {
      navigator(`/main/lists/${item.list.id}/tasks/${item.id}`);
    } else if (screenStatus === 'All') {
      navigator(`/main/all/tasks/${item.id}`);
    } else {
      navigator(`/main/${item.id}`);
    }
  };

  const onChangeTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await updator(item, 'title', e.currentTarget.value, false);
  };

  const onBlurTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value;
    if (ListDocRef) {
      await updateDoc(ListDocRef, { title });
    }
    if (docRef) {
      await updateDoc(docRef, { title });
    }
    await setDoc(
      doc(db, `${auth.currentUser?.uid}/All`),
      { docMap: { [item.id]: { ...item, title } } },
      { merge: true },
    );
  };
  return (
    <ListItemContainer>
      {item.isNote ? (
        <NoteIconContainer className="show-editor-trigger">
          <FontAwesomeIcon icon={faNoteSticky} className="sub-icon" size="lg" />
        </NoteIconContainer>
      ) : (
        <CheckBox todo={item} />
      )}
      <ToDoTitle
        className="show-editor-trigger"
        type="text"
        isDone={item.isDone}
        defaultValue={item.title}
        spellCheck={false}
        onClick={onClickList}
        {...register('title', {
          onBlur: onBlurTitle,
          onChange: onChangeTitle,
        })}
      />
      <ListIcons item={item} />
      <ListMenu item={item} isEditor={false} />
    </ListItemContainer>
  );
}

export default ListItem;

const ToDoTitle = styled(Title)<{ isDone: boolean }>`
  color: ${props => (props.isDone ? '#bbb' : 'black')};
`;

const NoteIconContainer = styled(IconContainer)`
  z-index: 1;
  .sub-icon {
    color: ${({ theme }) => theme.iconColor};
    width: 20px;
  }
`;
