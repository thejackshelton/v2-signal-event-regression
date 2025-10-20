import { type BindableProps, useBindings } from "~/utils/bindings";
import {
  type PropsOf,
  Slot,
  component$,
  useComputed$,
  useContextProvider,
  useId,
  useSignal,
  useTask$,
} from "@qwik.dev/core";
import { type CheckboxContext, checkboxContextId } from "./checkbox-context";

export type PublicCheckboxRootProps<T extends boolean | "mixed" = boolean> = {
  /** Event handler called when the checkbox state changes */
  onChange$?: (checked: T) => void;
  /** Name attribute for the hidden input element */
  name?: string;
  /** Whether the checkbox is required */
  required?: boolean;
  /** Value attribute for the hidden input element */
  value?: string;
} & Omit<PropsOf<"div">, "onChange$"> &
  BindableProps<CheckboxBinds>;

type CheckboxBinds = {
  /* Determines whether the checkbox is checked */
  checked: boolean | "mixed";
  /** Whether the checkbox is disabled */
  disabled: boolean;
};

/** Root component that provides context and state management for the checkbox */
export const CheckboxRoot = component$((props: PublicCheckboxRootProps) => {
  const { onChange$, name, required, value, ...rest } = props;

  const { checkedSig: checked, disabledSig: isDisabled } =
    useBindings<CheckboxBinds>(props, {
      checked: false,
      disabled: false,
    });

  const isError = useSignal(false);
  const isDescription = useSignal(false);
  const isInitialRender = useSignal(true);
  const localId = useId();
  const triggerRef = useSignal<HTMLButtonElement>();

  const isChecked = useComputed$(() => {
    return checked.value === true;
  });

  const context: CheckboxContext = {
    checked,
    isDisabled,
    localId,
    name,
    required,
    value,
    isError,
    isDescription,
    triggerRef,
  };

  useContextProvider(checkboxContextId, context);

  useTask$(async function handleChange({ track }) {
    track(() => checked.value);

    if (!isInitialRender.value) {
      await onChange$?.(checked.value as boolean);
    }

    isInitialRender.value = false;
  });

  return (
    <div
      {...rest}
      // Identifier for the root checkbox container
      data-qds-checkbox-root
      data-qds-root
      // Indicates whether the checkbox is disabled
      aria-disabled={context.isDisabled.value ? "true" : "false"}
      data-checked={isChecked.value}
      data-mixed={checked.value === "mixed"}
      data-disabled={isDisabled.value}
    >
      <Slot />
    </div>
  );
});
