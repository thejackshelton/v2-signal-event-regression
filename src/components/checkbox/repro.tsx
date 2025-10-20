import { Checkbox } from "./index";
import { component$, useSignal } from "@qwik.dev/core";

export default component$(() => {
  const isChecked = useSignal(false);

  return (
    <Checkbox.Root bind:checked={isChecked}>
      <Checkbox.Trigger class="size-10 bg-yellow-500 ui-checked:bg-red-500">
        <Checkbox.Indicator class="checkbox-indicator">
          Checked
        </Checkbox.Indicator>
      </Checkbox.Trigger>
      {isChecked.value && <Checkbox.Error>Error</Checkbox.Error>}
    </Checkbox.Root>
  );
});
