import { useCallback } from "react";

import { useToastContext, useToastDispatchContext } from "../contexts/toastContext";
import { sleep } from "../utils";

const DEFAULT_DURATION = 2000;

const useToast = () => {
  const toast = useToastContext();
  const dispatch = useToastDispatchContext();

  const close = useCallback(
    async (duration: number) => {
      dispatch({ type: "dismiss" });
      await sleep(duration);
      dispatch({ type: "remove" });
    },
    [dispatch],
  );

  const show = useCallback(
    ({ message, duration = DEFAULT_DURATION }: { message: string; duration?: number }) => {
      if (!(toast?.type === "remove")) {
        return;
      }

      dispatch({ type: "add", message });
      close(duration);
    },
    [toast, close, dispatch],
  );

  return { show };
};

export default useToast;
