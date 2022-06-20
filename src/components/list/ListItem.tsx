import React from 'react';
import { setDoc, updateDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  useGetAllDocRef,
  useGetDocRef,
  useGetListDocRef,
  useUpdateDocs,
} from 'hooks';
import { IconContainer, ListItemContainer, Title } from 'style/main-page';
import ListMenu from './ListMenu';
import CheckBox from 'components/common/CheckBox';
import { IDocument } from 'types';
import ListIcons from './ListIcons';
import { useRecoilValue } from 'recoil';
import { selectedListState } from 'atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';

interface ITodoItemProps {
  item: IDocument;
}

function ListItem({ item }: ITodoItemProps) {
  const updator = useUpdateDocs();
  const docRef = useGetDocRef(item);
  const ListDocRef = useGetListDocRef(item);
  const allDocRef = useGetAllDocRef();
  const navigator = useNavigate();
  const { register } = useForm();
  const selectedList = useRecoilValue(selectedListState);
  const { pathname } = useLocation();

  const onClickList = () => {
    if (item.list && selectedList) {
      navigator(`/main/lists/${item.list.id}/tasks/${item.id}`);
    } else if (pathname.includes('all')) {
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
    if (allDocRef) {
      await setDoc(
        allDocRef,
        { docMap: { [item.id]: { ...item, title } } },
        { merge: true },
      );
    }
  };
  return (
    <ListItemContainer onClick={onClickList}>
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
