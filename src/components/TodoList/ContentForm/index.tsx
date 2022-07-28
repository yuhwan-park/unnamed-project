// dependencies
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// states
import {
  allDocumentState,
  dateSelector,
  documentState,
  myListDocsState,
  selectedListState,
} from 'atoms';
// firebase
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from 'firebase-source';
// hooks
import { useSetDocCount } from 'hooks';
// types
import { ITaskFormData } from 'types';
// styles
import * as S from './style';

function ContentForm() {
  const date = useRecoilValue(dateSelector);
  const setDocuments = useSetRecoilState(documentState);
  const setMyListDocs = useSetRecoilState(myListDocsState);
  const setAllDocument = useSetRecoilState(allDocumentState);
  const setDocCount = useSetDocCount();
  const selectedList = useRecoilValue(selectedListState);
  const [isNote, setIsNote] = useState(false);
  const { register, handleSubmit, setValue } = useForm<ITaskFormData>();

  const onSelectChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    if (value === 'note') {
      setIsNote(true);
    } else {
      setIsNote(false);
    }
  };

  const onToDoSubmit = async ({ title }: ITaskFormData) => {
    setValue('title', '');
    if (!auth.currentUser) return;
    const docRef = selectedList
      ? doc(collection(db, `${auth.currentUser.uid}/Lists/${selectedList.id}`))
      : doc(collection(db, `${auth.currentUser.uid}/${date}/Document`));
    const allDocRef = doc(db, `${auth.currentUser.uid}/All`);
    const data = {
      id: docRef.id,
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
    if (selectedList) {
      setMyListDocs(prev => [...prev, data]);
    } else {
      setDocuments(prev => [...prev, data]);
      await setDocCount(date, 'Plus');
    }
    setAllDocument(docs => ({ ...docs, [data.id]: data }));

    await setDoc(allDocRef, { docMap: { [data.id]: data } }, { merge: true });
    await setDoc(docRef, data);
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
