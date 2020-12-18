import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Tag from '../tag'
import { getDataset } from '../utils'
import './index.css'
import { GridContextProvider, GridDropZone, GridItem, swap } from 'react-grid-dnd'
const getTags = (tags = [], onDelete, readOnly, disabled, labelRemove) =>
  tags.map((tag, index) => {
    const { _id, label, tagClassName, dataset, tagLabel, description } = tag
    return (
      <GridItem
        key={_id}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {' '}
        <div>
          {' '}
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
        </div>
      </GridItem>
    )
  })
const Tags = props => {
  const { tags, value, onTagRemove, onReorder, texts = {}, disabled, readOnly, children } = props
  /*  console.log('value')
  console.log(value) */
  /*  console.log('tags')
  console.log(tags) */

  const [items, setItems] = useState(tags)
  useEffect(() => {
    setItems(tags)
  }, [tags])
  function handleOnDragEnd(sourceId, sourceIndex, targetIndex, targetId) {
    // console.log(result)
    const nextState = swap(items, sourceIndex, targetIndex)
    setItems(nextState)
    onReorder(nextState)
  }
  /* console.log('items')
  console.log(items) */
  const lastItem = children || <span className="placeholder">{texts.placeholder || 'Choose...'}</span>
  return (
    <GridContextProvider onChange={handleOnDragEnd}>
      <GridDropZone id="items" rowHeight={30} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {/*  <ul className="tag-list"> */}
        {getTags(items, onTagRemove, readOnly, disabled, texts.labelRemove)}
        <li className="tag-item">{lastItem}</li>
        {/* </ul> */}
      </GridDropZone>
    </GridContextProvider>
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
