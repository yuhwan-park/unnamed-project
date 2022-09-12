import { auth, db } from 'firebase-source';
import { User } from 'firebase/auth';
import { doc } from 'firebase/firestore';

export const docRef = (destination: 'All' | 'Lists' | 'Date') => {
  // GlobalLogic.ts 에서 currentUser 가 없다면 강제 리다이렉팅을 하고 있기 때문에
  // docRef 함수를 사용 시에는 currentUser 가 있다고 가정.
  return doc(db, (auth.currentUser as User).uid, destination);
};
