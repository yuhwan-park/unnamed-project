import { myListModalState, myListsState, selectedListState } from 'atoms';
import { auth, db } from 'firebase-source';
import {
  arrayRemove,
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { motion } from 'framer-motion';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FieldValues, useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import shortUUID from 'short-uuid';
import { modalCoverVariants, modalVariants } from 'variants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage } from 'style/sign-page';

function MyListModal() {
  const [toggleModal, setToggleModal] = useRecoilState(myListModalState);
  const selectedList = useRecoilValue(selectedListState);
  const [myLists, setMyLists] = useRecoilState(myListsState);
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

  const checkDuplicated = (title: string) => {
    const listsName = myLists.map(list => list.title);
    if (listsName.includes(title)) {
      setError('title', {
        type: 'value',
        message: '이미 존재하는 리스트입니다.',
      });
      return false;
    }
    return true;
  };

  const editList = async ({ title }: FieldValues) => {
    if (!auth.currentUser) return;
    const isDuplicated = checkDuplicated(title);
    if (!isDuplicated) return;

    const docRef = doc(db, `${auth.currentUser?.uid}/Lists`);
    const newLists = myLists.map(list =>
      list.id === selectedList?.id ? { ...list, title } : list,
    );
    setMyLists(newLists);
    setValue('title', '');
    setToggleModal(null);
    await updateDoc(docRef, { lists: newLists });
  };

  const createList = async ({ title }: FieldValues) => {
    if (!auth.currentUser) return;
    const isDuplicated = checkDuplicated(title);
    if (!isDuplicated) return;

    const docRef = doc(db, `${auth.currentUser?.uid}/Lists`);
    setValue('title', '');
    const listData = {
      title,
      createdAt: Timestamp.fromDate(new Date()),
      id: shortUUID.generate(),
    };
    setMyLists(prev => [...prev, listData]);
    setToggleModal(null);
    await updateDoc(docRef, { lists: arrayUnion(listData) });
  };

  const deleteList = async () => {
    if (!auth.currentUser) return;
    const docRef = doc(db, `${auth.currentUser.uid}/Lists`);
    const needDeleteList = myLists.find(li => li.id === selectedList?.id);
    setMyLists(lists => lists.filter(li => li.id !== selectedList?.id));
    setToggleModal(null);
    await updateDoc(docRef, { lists: arrayRemove(needDeleteList) });
  };

  return (
    <>
      {toggleModal && (
        <ListModalCover
          key="listModal"
          variants={modalCoverVariants}
          initial="initial"
          animate="visible"
        >
          <ListModal variants={modalVariants}>
            {toggleModal === 'Delete' ? (
              <>
                <ListModalHeader>
                  <h1>리스트 삭제</h1>
                  <FontAwesomeIcon icon={faX} onClick={onClickCloseModal} />
                </ListModalHeader>
                <ListModalBody>
                  <p>
                    리스트를 삭제할 시 이 리스트에 있는 모든 할 일은 삭제됩니다.
                    정말 삭제하시겠습니까?
                  </p>
                </ListModalBody>
                <ListModalFooter>
                  <SubmitButton
                    type="button"
                    value="확인"
                    onClick={deleteList}
                  />
                  <CancleButton
                    type="button"
                    value="취소"
                    onClick={onClickCloseModal}
                  />
                </ListModalFooter>
              </>
            ) : (
              <form
                onSubmit={handleSubmit(
                  toggleModal === 'Create' ? createList : editList,
                )}
              >
                <ListModalHeader>
                  <h1>
                    {toggleModal === 'Create' ? '리스트 추가' : '리스트 편집'}
                  </h1>
                  <FontAwesomeIcon icon={faX} onClick={onClickCloseModal} />
                </ListModalHeader>
                <ListModalBody>
                  <ListModalInput
                    type="text"
                    placeholder="리스트 이름을 적어주세요"
                    defaultValue={
                      toggleModal === 'Create' ? '' : selectedList?.title
                    }
                    {...register('title', { required: '필수 항목입니다' })}
                  />
                  {errors.title && (
                    <ErrorMessage>{errors.title.message}</ErrorMessage>
                  )}
                </ListModalBody>
                <ListModalFooter>
                  <SubmitButton type="submit" value="확인" />
                  <CancleButton
                    type="button"
                    value="취소"
                    onClick={onClickCloseModal}
                  />
                </ListModalFooter>
              </form>
            )}
          </ListModal>
        </ListModalCover>
      )}
    </>
  );
}

export default MyListModal;

const ListModalCover = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1050;
`;

const ListModal = styled(motion.div)`
  position: relative;
  top: 10%;
  width: 100vw;
  height: fit-content;
  max-width: 420px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
`;

const ListModalBody = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

const ListModalInput = styled.input`
  padding: 0 10px;
  margin: 20px 0 8px 0;
  border: none;
  height: 42px;
  border-radius: 6px;
  outline: none;
  background-color: rgb(244, 244, 244);
`;

const ListModalHeader = styled.div`
  padding: 0 20px;
  display: flex;
  min-height: 56px;
  align-items: center;
  justify-content: space-between;
  svg {
    color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    &:hover {
      color: rgba(0, 0, 0, 0.8);
    }
  }
`;

const ListModalFooter = styled.div`
  padding: 30px 20px;
  display: flex;
  justify-content: flex-end;
`;

const ModalButton = styled.input`
  border: none;
  width: 100px;
  height: 40px;
  border-radius: 6px;
  margin-right: 10px;
  cursor: pointer;
`;

const CancleButton = styled(ModalButton)`
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const SubmitButton = styled(ModalButton)`
  color: white;
  background-color: ${props => props.theme.dailColor.lighter};
  &:hover {
    background-color: ${props => props.theme.dailColor.normal};
  }
`;
