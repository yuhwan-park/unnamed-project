import { useEffect } from 'react';
import { RecoilState, useSetRecoilState } from 'recoil';

interface IRecoilSetter<T> {
  atom: RecoilState<T>;
  data: T;
}

export const RecoilSetter = <T extends {}>({
  atom,
  data,
}: IRecoilSetter<T>) => {
  const setter = useSetRecoilState(atom);
  useEffect(() => setter(data), [data, setter]);
  return null;
};
