import React, { forwardRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Tag from '../tag'
import { getDataset } from '../utils'
import './index.css'
import { ReactSortable } from 'react-sortablejs'
/* const CustomComponent = forwardRef((props, ref) => {
  console.log(props.children)
  return <ul ref={ref}>{props.children}</ul>;
}); */
const getTags = (tags = [], onDelete, readOnly, disabled, labelRemove) =>
  tags.map((tag, index) => {
    /* console.log('label')
    console.log(tag) */
    const { _id, label, tagClassName, dataset, tagLabel, description } = tag
    return (
      <li
        /* title = {description} */

        className={['tag-item', tagClassName].filter(Boolean).join(' ')}
        key={_id}
        {...getDataset(dataset)}
      >
        <Tag
          label={tagLabel || label}
          id={`${_id}`}
          onDelete={onDelete}
          readOnly={readOnly}
          disabled={disabled || tag.disabled}
          labelRemove={labelRemove}
        />
      </li>
    )
  })
const Tags = props => {
  const { tags, value, onTagRemove, onReorder, texts = {}, disabled, readOnly, children } = props
  /*  console.log('value')
  console.log(value) */
  /*  console.log('tags')
  console.log(tags) */

  const [items, setItems] = useState(tags.length > 0 ? tags : [])
  useEffect(() => {
    setItems(tags)
  }, [tags])
  function handleOnDragEnd(result) {
    // console.log(result)
    /*  const i = Array.from(items)
    const [reorderedItem] = i.splice(result.source.index, 1)
    i.splice(result.destination.index, 0, reorderedItem)

    setItems(i)
    onReorder(i) */
  }
  /* console.log('items')
  console.log(items) */
  const lastItem = children || <span className="placeholder">{texts.placeholder || 'Choose...'}</span>
  return (
    <ReactSortable list={items} setList={setItems}>
      {getTags(items, onTagRemove, readOnly, disabled, texts.labelRemove)}
      <li className="tag-item">{lastItem}</li>
    </ReactSortable>
  )
}

/* class Tags extends PureComponent {
  static propTypes = {
    tags: PropTypes.array,
    onTagRemove: PropTypes.func,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    texts: PropTypes.object,
    children: PropTypes.node,
  }

  render() {
    const { tags, onTagRemove, texts = {}, disabled, readOnly, children } = this.props
    const lastItem = children || <span className="placeholder">{texts.placeholder || 'Choose...'}</span>

    return (


      
      
    )
  }
} */

export default Tags
