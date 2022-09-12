import { allDocumentState } from 'atoms';
import { setDoc } from 'firebase/firestore';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { Document } from '@types';
import { docRef } from 'utils';

function useUpdateTodo() {
  // 클라이언트단 & DB단의 Document 데이터 필드값을 수정하는 Hook
  const setAllDocument = useSetRecoilState(allDocumentState);

  return useCallback(
    async (document: Document, key: string, value: any) => {
      const newDoc = { ...document, [key]: value };

      setAllDocument(docs => ({
        ...docs,
        [document.id]: newDoc,
      }));

      await setDoc(docRef('All'), { [document.id]: newDoc }, { merge: true });
    },
    [setAllDocument],
  );
}

export { useUpdateTodo };
