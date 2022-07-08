# Design of pensieve
## Why Svelte?
TBD

## Positioning
The position of pensieve elements in general should be customizable by the user (e.g. by drag and drop).

### `div` vs. `span`
HTML distinguishes block and inline elements. Block elements consume an entire "row" of the HTML document, while inline elements are embedded in the *flow* of their parent element.

`div` elements are block elements and `span` elements are inline elements. So when using the default positioning (`static`) `div` elements span the entire width while `span` elements are inserted into the flow of their parent elements. Because of the customizable position of pensieve pensieve elements the use of `span` makes more sense than `div`. However, because Svelte adds invisible elements of type `div`, using `span` as parent of `div` makes even less sense. That's why we use `div`.

### Relative vs. absolute positioning
Relative positioning assumes that elements do not overlap. But because pensieve cards are supposed to overlap (e.g. on stacks or in boxes) relative positioning does not work.

Combining relative positioning with spans even screws up the CSS effects to mimic the appearance of an index card.

That's why we use absolute positioning. In addition we typically have to set the width and height of the element.

### 3D
To achieve stacking effects we use 3D CSS transformations. By translating elements along the Z axis, we can control the stacking effect.

When combined with perspective settings from a slight top-left angle on the parent containers, the visualization looks quite realistic.

## Troubleshooting
* When a boolean parameter passed to a Svelte component does not have the expected effect (e.g. `alwaysShow="false"`) check if the value is braced correctly: `alwaysShow="{false}"`. That's a tricky one, because a string might evaluate to a wrong value, while it prints the expected value in `$: console.log(alwaysShow)` expressions.

## References
- Positioning in CSS by Eric A. Meyer