import React, { useEffect, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import Tag from '../tag'
import { getDataset } from '../utils'
import './index.css'
/* import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd' */
import { SortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc'
import arrayMove from 'array-move'
const DragHandle = sortableHandle(() => <span>::</span>)
const SortableItem = SortableElement(
  forwardRef(
    (
      {
        _id,
        label,
        tagClassName,
        dataset,
        tagLabel,
        description,
        onDelete,
        readOnly,
        disabled,
        labelRemove,
        tagDisabled,
      },
      ref
    ) => {
      /* console.log(label) */
      return (
        <div ref={ref}>
          <li
            className={['tag-item', tagClassName].filter(Boolean).join(' ')}
            key={_id}
            index={_id}
            {...getDataset(dataset)}
          >
            {' '}
            {/* <DragHandle/> */}
            <Tag
              label={tagLabel || label}
              id={`${_id}`}
              onDelete={onDelete}
              readOnly={readOnly}
              disabled={disabled || tagDisabled}
              labelRemove={labelRemove}
            />
          </li>
        </div>
      )
    }
  ),
  { withRef: true }
)
const SortableList = SortableContainer(({ tags, onDelete, readOnly, disabled, labelRemove, lastItem }) => {
  /*  console.log('tagsSortable List')
    console.log(tags) */
  return (
    <ul className="tag-list" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {tags.map((tags, index) => (
        <SortableItem
          key={index}
          index={index}
          onDelete={onDelete}
          readOnly={readOnly}
          disabled={disabled}
          labelRemove={labelRemove}
          tagDisabled={tags.disabled}
          {...tags}
        />
      ))}
      <li className="tag-item">
        {lastItem}
        <span className="dropdown-icon" style={{ fontSize: '20px', color: '#bfbfbf' }}>
          &#x2304;
        </span>
      </li>
    </ul>
  )
})
const getTags = (tags = [], onDelete, readOnly, disabled, labelRemove) =>
  tags.map((tag, index) => {
    const { _id, label, tagClassName, dataset, tagLabel, description } = tag
    return {
      /* <Draggable key={_id} draggableId={_id} index={index}>
                {provided => (
                    <li
                        title={description}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
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
                )}
            </Draggable> */
    }
  })
const Tags = props => {
  const { tags, value, onTagRemove, onReorder, texts = {}, disabled, readOnly, children } = props

  /* console.log('tags')
     console.log(tags) */
  const [items, setItems] = useState(tags)
  useEffect(() => {
    setItems(tags)
  }, [tags])
  const onSortEnd = ({ oldIndex, newIndex }) => {
    let i = arrayMove(items, oldIndex, newIndex)
    setItems(i)
    onReorder(i)
  }

  const lastItem = children || <span className="placeholder">{texts.placeholder || 'Choose...'}</span>
  return (
    /*  <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tag-list" direction="horizontal">
                {provided => (
                    <ul className="tag-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {getTags(items, onTagRemove, readOnly, disabled, texts.labelRemove)}
                        <li className="tag-item">{lastItem}</li>
                    </ul>
                )}
            </Droppable>
        </DragDropContext> */

    <SortableList
      axis="xy"
      lastItem={lastItem}
      onSortEnd={onSortEnd}
      tags={items}
      onDelete={onTagRemove}
      readOnly={readOnly}
      disabled={disabled}
      labelRemove={texts.labelRemove}
    />
  )
}

export default Tags
