// dependencies
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
// components
import CheckBox from 'components/common/CheckBox';
import ListIcons from '../ListIcons';
import ListMenu from '../ListMenu';
// states
import { screenStatusState } from 'atoms';
// hooks
import { useUpdateTodo } from 'hooks';
// types
import { IDocument } from 'types';
// styles
import * as S from './style';

interface ITodoItemProps {
  item: IDocument;
}

function ListItem({ item }: ITodoItemProps) {
  const updator = useUpdateTodo();
  const navigator = useNavigate();
  const { register } = useForm();
  const screenStatus = useRecoilValue(screenStatusState);

  const onClickList = () => {
    if (item.list && screenStatus === 'List') {
      navigator(`/main/lists/${item.list.id}/tasks/${item.id}`);
    } else if (screenStatus === 'All') {
      navigator(`/main/all/tasks/${item.id}`);
    } else {
      navigator(`/main/${item.id}`);
    }
  };

  const onChangeTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await updator(item, 'title', e.currentTarget.value);
  };

  return (
    <S.ListItemContainer>
      {item.isNote ? (
        <S.NoteIconContainer className="show-editor-trigger">
          <FontAwesomeIcon icon={faNoteSticky} className="sub-icon" size="lg" />
        </S.NoteIconContainer>
      ) : (
        <CheckBox todo={item} />
      )}
      <S.ToDoTitle
        className="show-editor-trigger"
        type="text"
        isDone={item.isDone}
        defaultValue={item.title}
        spellCheck={false}
        onClick={onClickList}
        {...register('title', {
          onChange: onChangeTitle,
        })}
      />
      <ListIcons item={item} />
      <ListMenu item={item} isEditor={false} />
    </S.ListItemContainer>
  );
}

export default memo(ListItem);
