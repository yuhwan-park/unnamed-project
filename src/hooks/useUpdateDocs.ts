import { documentState, myListDocsState } from 'atoms';
import { auth, db } from 'firebase-source';
import { doc, updateDoc } from 'firebase/firestore';
import { useSetRecoilState } from 'recoil';
import { IDocument } from 'types';

function useUpdateDocs() {
  // 클라이언트단 & DB단의 Document 데이터 필드값을 수정하는 Hook
  const setDocument = useSetRecoilState(documentState);
  const setMyListDocs = useSetRecoilState(myListDocsState);

  return async (
    document: IDocument,
    key: string,
    value: any,
    needDbUpdate: boolean,
  ) => {
    if (!auth.currentUser) return;

    setDocument(docs =>
      docs.map(doc =>
        doc.id === document.id ? { ...doc, [key]: value } : doc,
      ),
    );
    setMyListDocs(docs =>
      docs.map(doc =>
        doc.id === document.id ? { ...doc, [key]: value } : doc,
      ),
    );

    if (!needDbUpdate) return;

    const allDocRef = doc(
      db,
      `${auth.currentUser.uid}/All/Documents/${document.id}`,
    );
    await updateDoc(allDocRef, { [key]: value });

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

//contentEditor
// checkbox
// flag
// listmenu
// movelistmodal
// noteitem
// todoitem
