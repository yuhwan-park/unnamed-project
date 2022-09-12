// dependencies
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import shortUUID from 'short-uuid';
// states
import {
  allDocumentState,
  dateSelector,
  docIdsByDateState,
  myListsState,
  selectedListState,
} from 'atoms';
// firebase
import { arrayUnion, setDoc, Timestamp } from 'firebase/firestore';
// styles
import * as S from './style';
import { docRef } from 'utils';

interface ToDoSubmitForm {
  title: string;
}

function ContentForm() {
  const date = useRecoilValue(dateSelector);
  const setMyLists = useSetRecoilState(myListsState);
  const setAllDocument = useSetRecoilState(allDocumentState);
  const setDocIdsByDate = useSetRecoilState(docIdsByDateState);
  const selectedList = useRecoilValue(selectedListState);
  const [isNote, setIsNote] = useState(false);
  const { register, handleSubmit, setValue } = useForm<ToDoSubmitForm>();

  const onSelectChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setIsNote(value === 'note');
  };

  const onToDoSubmit = async ({ title }: ToDoSubmitForm) => {
    setValue('title', '');

    const data = {
      id: shortUUID.generate(),
      title,
      content: '',
      createdAt: Timestamp.fromDate(new Date()),
      isDone: false,
      isDeleted: false,
      isNote,
      priority: 4,
      date: selectedList ? '' : date,
      list: selectedList ? selectedList : null,
    };

    setAllDocument(docs => ({ ...docs, [data.id]: data }));

    if (selectedList) {
      setMyLists(lists => ({
        ...lists,
        [selectedList.id]: {
          ...selectedList,
          docIds: [...selectedList.docIds, data.id],
        },
      }));

      await setDoc(
        docRef('Lists'),
        { [selectedList.id]: { docIds: arrayUnion(data.id) } },
        { merge: true },
      );
    } else {
      setDocIdsByDate(ids => ({
        ...ids,
        [date]: ids[date] ? [...ids[date], data.id] : [data.id],
      }));

      await setDoc(
        docRef('Date'),
        { [date]: arrayUnion(data.id) },
        { merge: true },
      );
    }
    await setDoc(docRef('All'), { [data.id]: data }, { merge: true });
  };

  return (
    <S.FormContainer onSubmit={handleSubmit(onToDoSubmit)}>
      <input
        type="text"
        {...register('title', { required: true })}
        placeholder={
          selectedList && selectedList.title.length < 15
            ? `"${selectedList?.title}"에 할 일 혹은 노트를 추가해보세요`
            : '할 일 혹은 노트를 추가해보세요.'
        }
      />
      <select onChange={onSelectChange}>
        <option value="toDo">할일</option>
        <option value="note">노트</option>
      </select>
    </S.FormContainer>
  );
}

export default memo(ContentForm);
