export const dateVariants = {
  entry: (isBack: boolean) => ({
    x: isBack ? -100 : 100,
    opacity: 0,
    scale: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? 100 : -100,
    opacity: 0,
    scale: 0,
  }),
};

export const modalCoverVariants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export const modalVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export const menuVariants = {
  initial: {
    width: 0,
    opacity: 0,
  },
  visible: (custom: boolean) => ({
    width: custom ? '350px' : 0,
    opacity: custom ? 1 : 0,
  }),
};

export const editorVariants = {
  initial: {
    right: '-100%',
  },
  visible: {
    right: 0,
  },
  exit: {
    right: '-100%',
  },
};
