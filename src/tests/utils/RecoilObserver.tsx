import { useEffect } from 'react';
import { RecoilValue, useRecoilValue } from 'recoil';

interface IRecoilObserver {
  node: RecoilValue<unknown>;
  onChange: jest.Mock;
}

export const RecoilObserver = ({ node, onChange }: IRecoilObserver) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};
