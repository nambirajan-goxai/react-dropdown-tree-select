import React, { useState, useEffect } from 'react'
import DropdownTreeSelect from '../../../../src'
import '../../../../dist/styles.css'
import './index.css'
import data from './data.json'
import metrics from './metrics'
import { Form, Button } from 'antd'

const CustomFormitem = props => {
  //console.log(props)
  /* console.log('value')
  console.log(props.value) */
  const triggerChange = changedvalue => {
    if (props.onChange) props.onChange(changedvalue)
  }
  const onSelectedChange = (curNode, selectedNodes) => {
    // setSelected(selectedNodes)
    console.log('selectedNodes')
    console.log(selectedNodes)
    if (props.onChange) {
      let selected = selectedNodes.map(e => e.value)
      props.onChange(selected)
    }
  }
  const onAction = (node, action) => {
    /*   console.log('onAction::', action, node) */
  }
  const onNodeToggle = curNode => {
    /*  console.log('onNodeToggle::', curNode) */
  }
  /* console.log(selected) */
  let data = props.data

  let value = ['metrics.average_page_views', 'metrics.impressions', 'metrics.clicks', 'metrics.bounce_rate']
  value = undefined
  /* for(let i in selected)
  { */
  /*    let selectedValues = selected ? selected.map(e=>e.value) :[]
    data = data.map(e=>{
      let children = e.children.map(c=>{
        let obj = {...c}
        if(selectedValues.includes(c.value))
        {
          obj = {...obj,isDefaultValue : true}
        }
        else {
          obj = {...obj,isDefaultValue : false}
        }
        return obj
      })
      return {...e,children : children}
    }) */

  /* } */
  useEffect(() => {
    // Update the document title using the browser API
    console.log('useEffect customForm')
  })
  /* let value = [
    {
      value: 'metrics.impressions',
      label: 'Impressions',
      dataType: 'INTEGER',
      description: 'Count of how often your ad has appeared on a search results page or website on the Google Network.',
      type: 'METRIC',
      path: 'metrics.impressions',
      isDefaultValue: false,
      _depth: 1,
      _id: 'rdts-0-0',
      _parent: 'rdts-0',
      checked: true,
      _focused: true,
      hide: false,
    },
    {
      value: 'metrics.clicks',
      label: 'Clicks',
      dataType: 'INTEGER',
      description: 'The number of clicks',
      type: 'METRIC',
      path: 'metrics.clicks',
      isDefaultValue: false,
      _depth: 1,
      _id: 'rdts-0-1',
      _parent: 'rdts-0',
      checked: true,
      _focused: true,
      hide: false,
    },
  ] */
  return (
    <DropdownTreeSelect
      {...props}
      id="rdts"
      data={data}
      value={value}
      onChange={onSelectedChange}
      /*  value ={props.value} */
      onAction={onAction}
      onNodeToggle={onNodeToggle}
      clearSearchOnChange={false}
      keepTreeOnSearch={false}
      keepOpenOnSelect={false}
      mode={'multiSelect'}
      showPartiallySelected={false}
      disabled={false}
      readOnly={false}
      placeholder={''}
      inlineSearchInput={false}
      showDropdown={''}
      texts={{ label: 'Demo Dropdown', placeholder: ' ' }}
    />
  )
}

const Simple = () => {
  const [selected, setSelected] = useState([])
  const [form] = Form.useForm()
  const onChange = (curNode, selectedNodes) => {
    console.log('onChange::', curNode, selectedNodes)
    //setSelected(selectedNodes)
  }
  console.log('selected')
  console.log(selected)
  let data = metrics.children
  //console.log(data)
  /* let data = metrics.children
  let selectedValues = selected ? selected.map(e=>e.value) :[]
  data = data.map(e=>{
    let children = e.children.map(c=>{
      let obj = {...c}
      if(selectedValues.includes(c.value))
      {
        obj = {...obj,isDefaultValue : true}
      }
      else {
        obj = {...obj,isDefaultValue : false}
      }
      return obj
    })
    return {...e,children : children}
  }) */
  useEffect(() => {
    // Update the document title using the browser API
    console.log('useEffect main')
  })
  return (
    <div>
      <h1>Component with Default Values</h1>
      <p>
        Default Values get applied when there is no other user based selection. User can select more values and unselect
        default values as long as there is at least one user-selected value still present.
      </p>
      <Form form={form} onFinish={values => console.log(values)}>
        <Form.Item label="custom1" name="custom">
          <CustomFormitem data={metrics.children} />
        </Form.Item>
        <Form.Item label="custom2" name="custom2">
          <CustomFormitem data={metrics.children} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <DropdownTreeSelect
        data={data}
        value={selected}
        onChange={onChange} /* onAction={onAction} onNodeToggle={onNodeToggle} */
      />
    </div>
  )
}

export default Simple
