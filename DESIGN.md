# Design of pensieve
## Why Svelte?
TBD

## Positioning
The position of pensieve elements in general should be customizable by the user (e.g. by drag and drop).

### `div` vs. `span`
HTML distinguishes block and inline elements. Block elements consume an entire "row" of the HTML document, while inline elements are embedded in the *flow* of their parent element.

`div` elements are block elements and `span` elements are inline elements. So when using the default positioning (`static`) `div` elements span the entire width while `span` elements are inserted into the flow of their parent elements. Because of the customizable position of pensieve pensieve elements the use of `span` makes more sense than `div`. However, because Svelte adds invisible elements of type `div`, using `span` as parent of `div` makes even less sense. That's why we use `div`.

### Relative positioning
Relative positioning assumes that elements do not overlap. But because pensieve cards are supposed to overlap (e.g. on stacks or in boxes) relative positioning does not work.

Combining relative positioning with spans even screws up the CSS effects to mimic the appearance of an index card.

### Absolute positioning
The first attempt was to use absolute positions. This works as long as we only are interested in the size of the box spanned by cards. But as soon as we want to apply visual effects like shadows on card containers like stacks, we need the containers to have a correct size.

## References
- Positioning in CSS by Eric A. Meyer