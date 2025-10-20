import { Checkbox } from "./index";
import { component$, useSignal } from "@qwik.dev/core";

export default component$(() => {
  const isChecked = useSignal(false);

  return (
    <>
      <Checkbox.Root bind:checked={isChecked}>
        <Checkbox.Trigger class="size-10 bg-yellow-500 ui-checked:bg-red-500" />
        {isChecked.value && <Checkbox.Error>Error</Checkbox.Error>}
      </Checkbox.Root>

      <p>Is checked: {isChecked.value ? "true" : "false"}</p>
    </>
  );
});
