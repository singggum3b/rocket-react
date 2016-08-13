## Usage
`TODO`
For now see `test/` folder

## Rules:
- Check `src/type/*.type.js` for options definition & JSON schema format
- If a `component` have nested `componentsList`, it's considered a layout component.
- Component can be cloned by the use of `JSONCloneComponentType`, you can even clone another cloned component, the properties will be inherited

## Pending Feature
- [x] Path for sub components
- [x] Exclude component by id, name
- [x] Decoupled route and ui (path `/` for nested components)
- [x] Nested `componentsList`
- [x] Cloned components type with inheritance
- [x] Utility helper :  `cloneReactClassWithProps`, `isReactPureComponent`
