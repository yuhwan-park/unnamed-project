import { DocumentReference, setDoc } from 'firebase/firestore';

async function setTitle(ref: DocumentReference, e: any) {
  await setDoc(ref, { title: e.target.value }, { merge: true });
}

export { setTitle };
