import { Writable, writable } from "svelte/store";

export let currentCategory: Writable<"HS" | "MS" | "All"> = writable("HS");
