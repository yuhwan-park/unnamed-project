import { isWideState, paramState, showEditorState } from 'atoms';
import { isLoadingState } from 'atoms/isLoadingState';
import OffCanvasMenu from 'components/OffCanvasMenu';
import Header from 'components/common/Header';
import Loading from 'components/common/Loading';
import { useDetectClickOutside } from 'hooks';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const MainRoute = () => {
  const params = useParams();
  const setParams = useSetRecoilState(paramState);
  const isLoading = useRecoilValue(isLoadingState);
  const [isWide, setIsWide] = useRecoilState(isWideState);
  const setShowEditor = useSetRecoilState(showEditorState);
  useDetectClickOutside({ onTriggered: () => setShowEditor(false) });

  const onClickScreen = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (isWide) return;
    if (target.closest('.check-box') || target.closest('.go-back-icon')) return;
    setShowEditor(Boolean(target.closest('.show-editor-trigger')));
  };

  useEffect(() => {
    setParams(params);
  }, [params, setParams]);

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth > 1024) {
        setIsWide(true);
      } else {
        setIsWide(false);
      }
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [setIsWide]);

  if (isLoading) return <Loading />;
  return (
    <Wrapper onClick={onClickScreen}>
      <Header />
      <ResponsiveContainer>
        <OffCanvasMenu />
        <Outlet />
      </ResponsiveContainer>
    </Wrapper>
  );
};

export default MainRoute;

const Wrapper = styled.div`
  height: 100vh;
`;

const ResponsiveContainer = styled.main`
  display: flex;
  height: calc(100vh - 50px);
`;
