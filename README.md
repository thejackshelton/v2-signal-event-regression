# Reproduction Steps

1. Run `npm run dev`
2. Open `http://localhost:5173/`
3. Click on the checkbox / button multiple times
4. Notice that the click event is only fired once (v2 beta 11 and after)
5. Downgrade versions to v2 beta 10.
6. Notice that the click event is fired each time the checkbox is clicked.

There is a regression in the v2 beta 11 and after where a signal read prevents the click event from being fired. (remove the read in checkbox-trigger.tsx and see how it fires multiple times)

This also seems to happen only when signals are passed as props to the component Root. In this case, we are passing the `isChecked` signal to the `Checkbox.Root` component via the `bind:checked` prop.
