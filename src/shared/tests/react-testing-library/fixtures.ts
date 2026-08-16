import { screen, within } from "@testing-library/react";

export function element(element?: HTMLElement) {
  return element ? within(element) : screen;
}
