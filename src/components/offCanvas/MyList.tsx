import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { myListModalState, myListsState } from 'atoms';
import { auth, db } from 'firebase-source';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import MyListItem from './MyListItem';
import MyListModal from './MyListModal';

function MyList() {
  const [toggleModal, setToggleModal] = useRecoilState(myListModalState);
  const [myLists, setMyLists] = useRecoilState(myListsState);

  const onClickOpenModal = () => {
    setToggleModal('Create');
  };

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const docRef = doc(db, `${user.uid}/Lists`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMyLists(docSnap.data().lists);
        }
      }
    });
  }, [setMyLists]);

  return (
    <>
      <MyListContainer>
        <MyListHeader>
          <p>리스트</p>
          <FontAwesomeIcon icon={faPlus} onClick={onClickOpenModal} />
        </MyListHeader>
        <MyListContent>
          {myLists.length ? (
            myLists.map(list => <MyListItem key={list.id} list={list} />)
          ) : (
            <EmptyContent>
              카테고리별로 리스트를 추가하여 할 일 혹은 노트를 관리해보세요!
            </EmptyContent>
          )}
        </MyListContent>
      </MyListContainer>
      {toggleModal && <MyListModal />}
    </>
  );
}

export default MyList;

const MyListContainer = styled.div`
  padding: 0 20px;
`;

const MyListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background-color: rgb(230, 230, 230);
    svg {
      opacity: 1;
    }
  }
  svg {
    opacity: 0;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.3);
    &:hover {
      color: rgba(0, 0, 0, 0.6);
    }
  }
  p {
    font-size: ${props => props.theme.fontSize.small};
    font-weight: 600;
  }
`;

const MyListContent = styled.div`
  height: fit-content;
`;

const EmptyContent = styled.div`
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.4);
  font-size: ${props => props.theme.fontSize.small};
  line-height: 16px;
`;
