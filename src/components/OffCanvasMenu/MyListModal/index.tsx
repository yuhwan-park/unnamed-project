// dependencies
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FieldValues, useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import shortUUID from 'short-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
// states
import {
  myListModalState,
  myListsState,
  myListDocsState,
  selectedListState,
} from 'atoms';
// firebase
import { auth, db } from 'firebase-source';
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
// hooks
import { useUpdateDocs } from 'hooks';
// styles
import * as S from './style';
// etc
import { modalCoverVariants, modalVariants } from 'variants';

function MyListModal() {
  const [toggleModal, setToggleModal] = useRecoilState(myListModalState);
  const selectedList = useRecoilValue(selectedListState);
  const [myLists, setMyLists] = useRecoilState(myListsState);
  const myListDocs = useRecoilValue(myListDocsState);
  const updator = useUpdateDocs();
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  const onClickCloseModal = () => {
    setToggleModal(null);
  };

  const checkError = (title: string) => {
    const listsName = myLists.map(list => list.title);
    if (listsName.includes(title)) {
      setError('title', {
        type: 'value',
        message: '이미 존재하는 리스트입니다.',
      });
      return false;
    }
    if (title.length > 50) {
      setError('title', {
        type: 'value',
        message: '리스트 제목은 50자 이하여야 합니다.',
      });
      return false;
    }
    return true;
  };

  const editList = async ({ title }: FieldValues) => {
    const isError = checkError(title);
    if (!auth.currentUser || !isError) return;

    const docRef = doc(db, `${auth.currentUser.uid}/Lists`);
    const newLists = myLists.map(list =>
      list.id === selectedList?.id ? { ...list, title } : list,
    );
    setMyLists(newLists);
    setValue('title', '');
    setToggleModal(null);
    await updateDoc(docRef, { lists: newLists });
    myListDocs.forEach(async document => {
      await updator(document, 'list', { ...document.list, title }, true);
    });
  };

  const createList = async ({ title }: FieldValues) => {
    const isError = checkError(title);
    if (!auth.currentUser || !isError) return;

    const docRef = doc(db, `${auth.currentUser.uid}/Lists`);
    const newListId = shortUUID.generate();
    const listData = {
      title,
      createdAt: Timestamp.fromDate(new Date()),
      id: newListId,
      docIds: [],
    };
    setMyLists(prev => [...prev, listData]);
    setValue('title', '');
    setToggleModal(null);
    navigator(`/main/lists/${newListId}/tasks`);
    await setDoc(docRef, { lists: arrayUnion(listData) }, { merge: true });
  };

  const deleteList = async () => {
    if (!auth.currentUser) return;
    const docRef = doc(db, `${auth.currentUser.uid}/Lists`);
    const needDeleteList = myLists.find(li => li.id === selectedList?.id);
    setMyLists(lists => lists.filter(li => li.id !== selectedList?.id));
    setToggleModal(null);
    myListDocs.forEach(async document => {
      await updator(document, 'list', null, true);
      await deleteDoc(
        doc(
          db,
          `${auth.currentUser?.uid}/Lists/${selectedList?.id}/${document.id}`,
        ),
      );
    });
    await updateDoc(docRef, { lists: arrayRemove(needDeleteList) });
  };

  return (
    <S.ListModalCover
      key="listModal"
      variants={modalCoverVariants}
      initial="initial"
      animate="visible"
    >
      <S.ListModal variants={modalVariants}>
        {toggleModal === 'Delete' ? (
          <>
            <S.ListModalHeader>
              <h1>리스트 삭제</h1>
              <FontAwesomeIcon icon={faX} onClick={onClickCloseModal} />
            </S.ListModalHeader>
            <S.ListModalBody>
              <p>"{selectedList?.title}" 리스트를 정말 삭제하시겠습니까?</p>
            </S.ListModalBody>
            <S.ListModalFooter>
              <S.SubmitButton type="button" value="확인" onClick={deleteList} />
              <S.CancleButton
                type="button"
                value="취소"
                onClick={onClickCloseModal}
              />
            </S.ListModalFooter>
          </>
        ) : (
          <form
            onSubmit={handleSubmit(
              toggleModal === 'Create' ? createList : editList,
            )}
          >
            <S.ListModalHeader>
              <h1>
                {toggleModal === 'Create' ? '리스트 추가' : '리스트 편집'}
              </h1>
              <FontAwesomeIcon icon={faX} onClick={onClickCloseModal} />
            </S.ListModalHeader>
            <S.ListModalBody>
              <S.ListModalInput
                type="text"
                placeholder="리스트 이름을 적어주세요"
                defaultValue={
                  toggleModal === 'Create' ? '' : selectedList?.title
                }
                {...register('title', { required: '필수 항목입니다' })}
              />
              {errors.title && (
                <S.ErrorMessage>{errors.title.message}</S.ErrorMessage>
              )}
            </S.ListModalBody>
            <S.ListModalFooter>
              <S.SubmitButton type="submit" value="확인" />
              <S.CancleButton
                type="button"
                value="취소"
                onClick={onClickCloseModal}
              />
            </S.ListModalFooter>
          </form>
        )}
      </S.ListModal>
    </S.ListModalCover>
  );
}

export default MyListModal;
