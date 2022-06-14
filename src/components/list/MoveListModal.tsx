import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListUl,
  faCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { myListDocsState, myListsState, paramState } from 'atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { MenuIcon } from 'style/main-page';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { IDocument, IMyList } from 'types';
import { useUpdateDocs } from 'hooks';
import { auth, db } from 'firebase-source';
import { useNavigate } from 'react-router-dom';

interface IMoveListModalProps {
  item: IDocument;
}

function MoveListModal({ item }: IMoveListModalProps) {
  const myLists = useRecoilValue(myListsState);
  const setMyListDocs = useSetRecoilState(myListDocsState);
  const params = useRecoilValue(paramState);
  const navigator = useNavigate();
  const updator = useUpdateDocs();

  const onClickMoveListItem = async (list: IMyList) => {
    if (item.list && item.list.id === list.id) return;

    if (params['listId']) {
      setMyListDocs(docs => docs.filter(doc => doc.id !== item.id));
      navigator(`/main/lists/${params['listId']}/tasks`);
    }

    await updator(item, 'list', list, true);

    if (item.list) {
      const oldMyListDocRef = doc(
        db,
        `${auth.currentUser?.uid}/Lists/${item.list.id}/${item.id}`,
      );
      await deleteDoc(oldMyListDocRef);
    }

    const newMyListDocRef = doc(
      db,
      `${auth.currentUser?.uid}/Lists/${list.id}/${item.id}`,
    );
    const newItem = { ...item, list };
    await setDoc(newMyListDocRef, newItem);
  };

  const onClickDeleteList = async () => {
    if (!item.list) return;
    setMyListDocs(docs => docs.filter(doc => doc.id !== item.id));

    await updator(item, 'list', null, true);
    await deleteDoc(
      doc(db, `${auth.currentUser?.uid}/Lists/${item.list.id}/${item.id}`),
    );
  };

  return (
    <Wrapper>
      <MyListContainer onClick={onClickDeleteList}>
        <MenuIcon>
          <FontAwesomeIcon icon={faCircleXmark} />
        </MenuIcon>
        <MyListTitle>없음</MyListTitle>
        {!item.list && (
          <CheckIconContainer>
            <FontAwesomeIcon icon={faCheck} />
          </CheckIconContainer>
        )}
      </MyListContainer>

      {myLists.length
        ? myLists.map(list => (
            <MyListContainer
              key={list.id}
              onClick={() => onClickMoveListItem(list)}
            >
              <MenuIcon>
                <FontAwesomeIcon icon={faListUl} />
              </MenuIcon>
              <MyListTitle>{list.title}</MyListTitle>
              {list.id === item.list?.id && (
                <CheckIconContainer>
                  <FontAwesomeIcon icon={faCheck} />
                </CheckIconContainer>
              )}
            </MyListContainer>
          ))
        : null}
    </Wrapper>
  );
}

export default MoveListModal;

const Wrapper = styled.ul`
  position: absolute;
  right: 205px;
  width: 150px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  z-index: 9999;
`;

const MyListContainer = styled.li`
  display: flex;
  padding: 8px 0;
  &:hover {
    background-color: rgb(240, 240, 240);
  }
`;

const MyListTitle = styled.p`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: ${props => props.theme.fontSize.medium};
`;

const CheckIconContainer = styled.div`
  position: relative;
  right: 0;
  padding: 0 8px;
  color: #bbb;
`;
