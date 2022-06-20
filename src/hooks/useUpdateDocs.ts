import { allDocumentState, documentState, myListDocsState } from 'atoms';
import { auth, db } from 'firebase-source';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useSetRecoilState } from 'recoil';
import { IDocument } from 'types';

function useUpdateDocs() {
  // 클라이언트단 & DB단의 Document 데이터 필드값을 수정하는 Hook
  const setDocument = useSetRecoilState(documentState);
  const setMyListDocs = useSetRecoilState(myListDocsState);
  const setAllDocument = useSetRecoilState(allDocumentState);

  return async (
    document: IDocument,
    key: string,
    value: any,
    needDbUpdate: boolean,
  ) => {
    const newDoc = { ...document, [key]: value };

    setDocument(docs =>
      docs.map(doc => (doc.id === document.id ? newDoc : doc)),
    );

    setMyListDocs(docs =>
      docs.map(doc => (doc.id === document.id ? newDoc : doc)),
    );

    setAllDocument(docs => ({
      ...docs,
      [document.id]: newDoc,
    }));

    if (!needDbUpdate || !auth.currentUser) return;

    const allDocRef = doc(db, `${auth.currentUser.uid}/All`);

    await setDoc(
      allDocRef,
      { docMap: { [document.id]: newDoc } },
      { merge: true },
    );

    if (document.date) {
      const docRef = doc(
        db,
        `${auth.currentUser.uid}/${document.date}/Document/${document.id}`,
      );
      await updateDoc(docRef, { [key]: value });
    }

    if (document.list) {
      const listDocRef = doc(
        db,
        `${auth.currentUser.uid}/Lists/${document.list.id}/${document.id}`,
      );
      await updateDoc(listDocRef, { [key]: value });
    }
  };
}

export { useUpdateDocs };
