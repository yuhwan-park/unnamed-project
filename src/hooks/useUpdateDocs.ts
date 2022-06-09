import { documentState, myListDocsState } from 'atoms';
import { useSetRecoilState } from 'recoil';

function useUpdateDocs() {
  const setDocument = useSetRecoilState(documentState);
  const setMyListDocs = useSetRecoilState(myListDocsState);

  return (id: string | undefined, key: string, value: any) => {
    setDocument(docs =>
      docs.map(doc => (doc.id === id ? { ...doc, [key]: value } : doc)),
    );
    setMyListDocs(docs =>
      docs.map(doc => (doc.id === id ? { ...doc, [key]: value } : doc)),
    );
  };
}

export { useUpdateDocs };
