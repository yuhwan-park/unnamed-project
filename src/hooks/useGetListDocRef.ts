import { doc } from 'firebase/firestore';
import { auth, db } from 'firebase-source';

function useGetListDocRef(
  listId: string | undefined,
  todoId: string | undefined,
) {
  if (!auth.currentUser) return null;
  return listId && todoId
    ? doc(db, `${auth.currentUser.uid}/Lists/${listId}/${todoId}`)
    : null;
}

export { useGetListDocRef };
