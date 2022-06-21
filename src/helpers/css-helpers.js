import { getUnit } from './display-helpers.js';

function setCssVariables(node, variables) {
  for (const name in variables) {
    const unit = getUnit(name);
    node.style.setProperty(`--${name}`, variables[name] + unit);
  }
}

// borrowed from https://svelte.dev/repl/14a1b548093642a9a2dfb3e615382732?version=3.48.0
export function cssVariables(node, variables) {
  setCssVariables(node, variables);

  return {
    update(variables) {
      setCssVariables(node, variables);
    }
  }
}