import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { myListModalState, myListsState } from 'atoms';
import { auth, db } from 'firebase-source';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import MyListItem from './MyListItem';
import MyListModal from './MyListModal';

function MyList() {
  const [toggleModal, setToggleModal] = useRecoilState(myListModalState);
  const [myLists, setMyLists] = useRecoilState(myListsState);

  const onClickOpenModal = () => {
    setToggleModal(true);
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
          <div>리스트</div>
          <FontAwesomeIcon icon={faPlus} onClick={onClickOpenModal} />
        </MyListHeader>
        <MyListContent>
          {myLists.length
            ? myLists.map(list => (
                <Link to={`/main/lists/${list.id}/tasks`} key={list.id}>
                  <MyListItem list={list} />
                </Link>
              ))
            : null}
        </MyListContent>
      </MyListContainer>
      {toggleModal && <MyListModal />}
    </>
  );
}

export default MyList;

const MyListContainer = styled.div`
  padding: 10px 0;
`;

const MyListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
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
`;

const MyListContent = styled.div`
  height: 300px;
  padding: 0 20px;
  a {
    color: black;
  }
`;
