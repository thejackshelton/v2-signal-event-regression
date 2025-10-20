import {
  $,
  type PropsOf,
  Slot,
  component$,
  sync$,
  useComputed$,
  useContext,
} from "@qwik.dev/core";
import { checkboxContextId } from "./checkbox-context";

export type PublicCheckboxControlProps = PropsOf<"button">;

/** Interactive trigger component that handles checkbox toggling */
export const CheckboxTrigger = component$(
  (props: PublicCheckboxControlProps) => {
    const context = useContext(checkboxContextId);
    const triggerId = `${context.localId}-trigger`;
    const descriptionId = `${context.localId}-description`;
    const errorId = `${context.localId}-error`;
    const describedByLabels = useComputed$(() => {
      const labels = [];
      if (context.isDescription.value) {
        labels.push(descriptionId);
      }
      if (context.isError.value) {
        labels.push(errorId);
      }
      return labels.join(" ") || undefined;
    });

    const handleClick$ = $(() => {
      if (context.checked.value === "mixed") {
        context.checked.value = true;
      } else {
        context.checked.value = !context.checked.value;
      }
    });

    const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
    });

    return (
      <button
        id={triggerId}
        ref={context.triggerRef}
        type="button"
        role="checkbox"
        aria-checked={`${context.checked.value}`}
        aria-describedby={
          describedByLabels ? describedByLabels.value : undefined
        }
        aria-invalid={context.isError.value}
        disabled={context.isDisabled.value}
        onClick$={[handleClick$, props.onClick$]}
        onKeyDown$={[handleKeyDownSync$, props.onKeyDown$]}
        data-qds-checkbox-trigger
        {...props}
      >
        <Slot />
      </button>
    );
  }
);
