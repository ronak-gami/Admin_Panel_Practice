import { useCallback, useState } from "react";

const useToggle = (initialValue = false) => {
  const [state, setState] = useState(initialValue);

  const toggle = useCallback(() => setState((prev) => !prev), []);
  const setToggle = useCallback((value) => setState(!!value), []);

  return [state, toggle, setToggle];
};

export default useToggle;
