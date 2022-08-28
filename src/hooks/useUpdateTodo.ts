import { allDocumentState } from 'atoms';
import { auth, db } from 'firebase-source';
import { doc, setDoc } from 'firebase/firestore';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { IDocument } from 'types';

function useUpdateTodo() {
  // 클라이언트단 & DB단의 Document 데이터 필드값을 수정하는 Hook
  const setAllDocument = useSetRecoilState(allDocumentState);

  return useCallback(
    async (document: IDocument, key: string, value: any) => {
      if (!auth.currentUser) return;

      const newDoc = { ...document, [key]: value };
      const allDocRef = doc(db, `${auth.currentUser.uid}/All`);

      setAllDocument(docs => ({
        ...docs,
        [document.id]: newDoc,
      }));

      await setDoc(
        allDocRef,
        { docMap: { [document.id]: newDoc } },
        { merge: true },
      );
    },
    [setAllDocument],
  );
}

export { useUpdateTodo };
