import { useCallback, useEffect, useRef } from 'react';

interface Props {
  onTriggered: (e: Event) => void;
}

function useDetectClickOutside({ onTriggered }: Props) {
  const ref = useRef(null);

  const keyListener = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onTriggered(e);
      }
    },
    [onTriggered],
  );

  const clickOrTouchListener = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (ref && ref.current) {
        if (!(ref.current! as any).contains(e.target)) {
          onTriggered?.(e);
        }
      }
    },
    [onTriggered],
  );

  useEffect(() => {
    document.addEventListener('click', clickOrTouchListener);
    document.addEventListener('touchstart', clickOrTouchListener);
    document.addEventListener('keyup', keyListener);

    return () => {
      document.removeEventListener('click', clickOrTouchListener);
      document.removeEventListener('touchstart', clickOrTouchListener);
      document.removeEventListener('keyup', keyListener);
    };
  }, [clickOrTouchListener, keyListener]);

  return ref;
}

export { useDetectClickOutside };
