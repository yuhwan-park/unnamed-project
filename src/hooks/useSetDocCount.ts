import { documentCountByDateState } from 'atoms';
import { auth, db } from 'firebase-source';
import { doc, increment, setDoc } from 'firebase/firestore';
import { useSetRecoilState } from 'recoil';

function useSetDocCount() {
  const setDocCount = useSetRecoilState(documentCountByDateState);

  return async (date: string, isIncrease: boolean) => {
    if (isIncrease) {
      setDocCount(obj => ({ ...obj, [date]: obj[date] ? obj[date] + 1 : 1 }));
    } else {
      setDocCount(obj => ({ ...obj, [date]: obj[date] - 1 }));
    }
    const allDocRef = doc(db, `${auth.currentUser?.uid}/All`);
    await setDoc(
      allDocRef,
      { docCount: { [date]: increment(isIncrease ? 1 : -1) } },
      { merge: true },
    );
  };
}

export { useSetDocCount };
