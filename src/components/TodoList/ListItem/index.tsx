// dependencies
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
// components
import CheckBox from 'components/common/CheckBox';
import ListIcons from '../ListIcons';
import ListMenu from '../ListMenu';
// states
import { screenStatusState } from 'atoms';
// firebase
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from 'firebase-source';
// hooks
import { useGetDocRef, useGetListDocRef, useUpdateDocs } from 'hooks';
// types
import { IDocument } from 'types';
// styles
import * as S from './style';

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
    <S.ListItemContainer>
      {item.isNote ? (
        <S.NoteIconContainer className="show-editor-trigger">
          <FontAwesomeIcon icon={faNoteSticky} className="sub-icon" size="lg" />
        </S.NoteIconContainer>
      ) : (
        <CheckBox todo={item} />
      )}
      <S.ToDoTitle
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
    </S.ListItemContainer>
  );
}

export default memo(ListItem);
