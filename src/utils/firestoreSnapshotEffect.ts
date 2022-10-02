import { auth, db } from 'firebase-source';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { AtomEffect } from 'recoil';

export const snapshotEffect =
  <T>(destination: 'All' | 'Date' | 'Lists') =>
  ({ setSelf }: Parameters<AtomEffect<T>>[0]) => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        onSnapshot(doc(db, user.uid, destination), doc => {
          if (doc.exists()) {
            setSelf(doc.data() as T);
          }
        });
      }
    });

    return () => unsub();
  };
