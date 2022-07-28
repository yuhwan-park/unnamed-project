import * as S from './style';

function Loading() {
  return (
    <S.Wrapper>
      <S.Logo
        animate={{ opacity: 0.2 }}
        transition={{ repeat: Infinity, duration: 0.6, repeatType: 'mirror' }}
      >
        dail
      </S.Logo>
    </S.Wrapper>
  );
}

export default Loading;
