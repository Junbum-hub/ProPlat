# react-token
React Token is a easy to use Token/Tag input component. To see use case examples
clone this repository and run `npm install && npm start`.

## Installation
- `npm install react-token`

## Usage
```
import ReactToken from 'react-token'

<ReactToken
  disabled={<bool>}
  onAdd={<func>}
  onRemove={<func>}
  autocompleteOptions={[<string>, <string>]}
  placeholder="Start Typing"
  selected={[<string>, <string>]}
/>
```


## Props
`disabled`: Boolean property to determine if the component should allow input

`onAdd`: Function that is invoked when a token is added to the input

`onBlur`: Function that is invoked when the input field is no longer focused

`onFocus`: Function that is invoked when input field is focused

`onKeyUp`: Function that is invoked when a user types into the input field

`onRemove`: Function that is invoked when a token is removed

`placeholder`: Placeholder text for input field

`required`: Displays "required" text on right hand side

`selected`: Tokens that will be displayed
