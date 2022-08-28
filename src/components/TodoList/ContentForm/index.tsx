// dependencies
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import shortUUID from 'short-uuid';
// states
import {
  allDocumentState,
  dateSelector,
  docIdsByDate,
  documentState,
  myListDocsState,
  selectedListState,
} from 'atoms';
// firebase
import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { auth, db } from 'firebase-source';
// hooks
import { useSetDocCount } from 'hooks';
// types
import { ITaskFormData } from 'types';
// styles
import * as S from './style';

function ContentForm() {
  const date = useRecoilValue(dateSelector);
  const setDocIds = useSetRecoilState(docIdsByDate);
  const setMyListDocs = useSetRecoilState(myListDocsState);
  const setAllDocument = useSetRecoilState(allDocumentState);
  const selectedList = useRecoilValue(selectedListState);
  const setDocCount = useSetDocCount();
  const [isNote, setIsNote] = useState(false);
  const { register, handleSubmit, setValue } = useForm<ITaskFormData>();

  const onSelectChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setIsNote(value === 'note');
  };

  const onToDoSubmit = async ({ title }: ITaskFormData) => {
    if (!auth.currentUser) return;
    setValue('title', '');
    // const docRef = selectedList
    //   ? doc(collection(db, `${auth.currentUser.uid}/Lists/${selectedList.id}`))
    //   : doc(collection(db, `${auth.currentUser.uid}/${date}/Document`));
    const docRef = doc(db, `${auth.currentUser.uid}/Date`);
    const allDocRef = doc(db, `${auth.currentUser.uid}/All`);
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
    // if (selectedList) {
    //   setMyListDocs(prev => [...prev, data]);
    // } else {
    // }
    setDocIds(prev => [...prev, data.id]);
    setAllDocument(docs => ({ ...docs, [data.id]: data }));

    await setDocCount(date, 'Plus');
    await setDoc(allDocRef, { docMap: { [data.id]: data } }, { merge: true });
    await setDoc(docRef, { [date]: arrayUnion(data.id) }, { merge: true });
    // await setDoc(allDocRef, { docMap: { [data.id]: data } }, { merge: true });
    // await setDoc(docRef, data);
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
