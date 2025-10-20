import {
  type PropsOf,
  Slot,
  component$,
  useContext,
  useSignal,
  useTask$,
} from "@qwik.dev/core";
import { checkboxContextId } from "./checkbox-context";
type PublicCheckboxErrorProps = PropsOf<"div">;
/** A component that displays error messages for a checkbox */
export const CheckboxError = component$((props: PublicCheckboxErrorProps) => {
  const context = useContext(checkboxContextId);
  const errorId = `${context.localId}-error`;
  const isInitialRender = useSignal(true);

  useTask$(({ cleanup }) => {
    cleanup(() => {
      if (isInitialRender.value) return;
      context.isError.value = false;
    });

    context.isError.value = true;
    isInitialRender.value = false;
  });

  return (
    // Identifier for the checkbox error message element
    <div id={errorId} data-qds-checkbox-error {...props}>
      <Slot />
    </div>
  );
});
