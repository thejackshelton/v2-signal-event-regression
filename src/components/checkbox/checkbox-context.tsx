import { type Signal, createContextId } from "@qwik.dev/core";

export const checkboxContextId = createContextId<CheckboxContext>("qds-checkbox-context");

export type CheckboxContext = {
  checked: Signal<boolean | "mixed">;
  isDisabled: Signal<boolean | undefined>;
  isError: Signal<boolean>;
  isDescription: Signal<boolean>;
  localId: string;
  name: string | undefined;
  required: boolean | undefined;
  value: string | undefined;
  triggerRef: Signal<HTMLButtonElement | undefined>;
};
