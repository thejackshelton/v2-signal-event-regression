import { component$ } from "@qwik.dev/core";
import type { DocumentHead } from "@qwik.dev/router";
import Hero from "~/components/checkbox/repro";

export default component$(() => {
  return <Hero />;
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
