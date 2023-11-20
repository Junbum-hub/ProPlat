import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ReactToken from '../src/index'

storiesOf('ReactToken', module)
  .add('with no props', () => (
    <ReactToken />
  ))
  .add('is disabled', () => (
    <ReactToken disabled />
  ))
  .add('with placeholder', () => (
    <ReactToken
      placeholder="Start typing"
    />
  ))
  .add('with 1 token', () => (
    <ReactToken
      placeholder="Start typing"
      selected={['test 1']}
    />
  ))
  .add('with set width', () => (
    <div style={{width: 500}}>
      <ReactToken
        placeholder="Start typing"
        selected={['test 1']}
      />
    </div>
  ))
  .add('with autocomplete', () => (
    <div style={{width: 500}}>
      <ReactToken
        autocompleteOptions={['d', 'another name', 'test', 'more', 'options', 'again', 'more', 'again', 'test']}
        placeholder="Start typing"
        selected={['test 1']}
      />
    </div>
  ))
  .add('is required', () => (
    <div style={{width: 500}}>
      <ReactToken
        placeholder="Start typing"
        required
      />
    </div>
  ))
  .add('on blur should create token from input', () => (
    <div style={{width: 500}}>
      <ReactToken
        autocompleteOptions={['d', 'another name', 'test', 'more', 'options', 'again', 'more', 'again', 'test']}
        placeholder="Start typing"
        required
      />
    </div>
  ))
  .add('should not overlap token input below', () => (
    <div style={{width: 500}}>
      <div style={{marginBottom: 10}}>
        <ReactToken
          autocompleteOptions={['d', 'another name', 'test', 'more', 'options', 'again', 'more', 'again', 'test']}
          placeholder="Start typing"
          required
        />
      </div>
      <div>
        <ReactToken
          autocompleteOptions={['d', 'another name', 'test', 'more', 'options', 'again', 'more', 'again', 'test']}
          placeholder="Start typing"
          required
        />
      </div>
    </div>
  ))
  .add('callbacks should not fire when disabled', () => (
    <div style={{width: 500}}>
      <ReactToken
        autocompleteOptions={['d', 'another name', 'test', 'more', 'options', 'again', 'more', 'again', 'test']}
        placeholder="Start typing"
        disabled
        onRemove={() => alert('This function should not be invoked')}
        selected={['token 1']}
      />
    </div>
  ))
  .add('Allows objects as autocomplete options', () => {
    const addNew = (
      <div style={{ display: 'flex', justifyContent: 'center', color: 'green', paddingTop: 10, paddingBottom: 10 }}>+ Add New</div>
    )
    return (
      <div style={{width: 500}}>
        <ReactToken
          autocompleteOptions={['again' , 'another name', addNew]}
          placeholder="Start typing"
          onRemove={() => alert('This function should not be invoked')}
          onAdd={(option) => console.log({option})}
          selected={['token 1']}
        />
      </div>
    )
  })
