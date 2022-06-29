import { useEffect } from 'react';
import { RecoilState, useSetRecoilState } from 'recoil';

interface IRecoilSetter {
  atom: RecoilState<any>;
  data: any;
}

export const RecoilSetter = ({ atom, data }: IRecoilSetter) => {
  const setter = useSetRecoilState(atom);
  useEffect(() => setter(data), [data, setter]);
  return null;
};
