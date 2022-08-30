import { docCountByDateState } from 'atoms';
import { auth, db } from 'firebase-source';
import { doc, increment, setDoc } from 'firebase/firestore';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

function useSetDocCount() {
  const setDocCount = useSetRecoilState(docCountByDateState);

  return useCallback(
    async (date: string, isIncrease: 'Plus' | 'Minus') => {
      if (isIncrease === 'Plus') {
        setDocCount(obj => ({ ...obj, [date]: obj[date] ? obj[date] + 1 : 1 }));
      } else {
        setDocCount(obj => ({ ...obj, [date]: obj[date] - 1 }));
      }
      const allDocRef = doc(db, `${auth.currentUser?.uid}/All`);
      await setDoc(
        allDocRef,
        { docCount: { [date]: increment(isIncrease === 'Plus' ? 1 : -1) } },
        { merge: true },
      );
    },
    [setDocCount],
  );
}

export { useSetDocCount };
