# Art Assets

The SVG art assets in here were exported from Bruno's SVG editor. I (Dylan)
removed all decimal places from the paths and it didn't appear to negatively
affect the image, however I didn't check all layers. Note that the SVG contains
multiple layers for multiple different types of body designs, eyes, etcetera.
When we want to embed this, we can remove the `id` fields. It might also be
possible to apply the fill to parent `<g>` groups in the SVG tree instead of
repeatedly within the `<path>` nodes.
