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
  selectedListState,
  allDocumentState,
} from 'atoms';
// firebase
import { deleteField, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
// hooks
import { useUpdateTodo } from 'hooks';
// styles
import * as S from './style';
// etc
import { modalCoverVariants, modalVariants } from 'variants';
import { docRef } from 'utils';

function MyListModal() {
  const [toggleModal, setToggleModal] = useRecoilState(myListModalState);
  const selectedList = useRecoilValue(selectedListState);
  const allDocument = useRecoilValue(allDocumentState);
  const [myLists, setMyLists] = useRecoilState(myListsState);
  const updator = useUpdateTodo();
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
    const listsName = Object.values(myLists).map(list => list.title);
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
    if (!isError || !selectedList) return;
    const newLists = {
      ...myLists,
      [selectedList.id]: { ...selectedList, title },
    };
    setMyLists(newLists);
    setValue('title', '');
    setToggleModal(null);
    await updateDoc(docRef('Lists'), { ...newLists });
  };

  const createList = async ({ title }: FieldValues) => {
    const isError = checkError(title);
    if (!isError) return;

    const newMyList = {
      title,
      createdAt: Timestamp.fromDate(new Date()),
      id: shortUUID.generate(),
      docIds: [],
    };
    const newMyLists = { ...myLists, [newMyList.id]: newMyList };
    setMyLists(newMyLists);
    setValue('title', '');
    setToggleModal(null);
    navigator(`/main/lists/${newMyList.id}/tasks`);
    await setDoc(docRef('Lists'), { ...newMyLists }, { merge: true });
  };

  const deleteList = async () => {
    if (!selectedList) return;

    const newMyLists = { ...myLists };
    newMyLists[selectedList.id].docIds.forEach(async id => {
      await updator(allDocument[id], 'listId', '');
    });

    delete newMyLists[selectedList.id];
    setMyLists(newMyLists);
    setToggleModal(null);
    await updateDoc(docRef('Lists'), { [selectedList.id]: deleteField() });
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
                <S.ErrorMessage>
                  {errors.title.message?.toString()}
                </S.ErrorMessage>
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
