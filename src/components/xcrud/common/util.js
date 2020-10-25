// 获取动态组件类型
export function getComponentType(configItem) {
  const xType = configItem.xType
  const type = configItem.type

  if (xType === 'slot') {
    return 'slot'
  } else if (xType === 'cascader') {
    return 'xCascader'
  } else if (xType === 'checkbox') {
    return 'xCheckbox'
  } else if (xType === 'colorPicker') {
    return 'xColorPicker'
  } else if (xType === 'datePicker') {
    return 'xDatePicker'
  } else if (xType === 'input') {
    return 'xInput'
  } else if (xType === 'autocomplete') {
    return 'xAutocomplete'
  } else if (xType === 'inputNumber') {
    return 'xInputNumber'
  } else if (xType === 'radio') {
    return 'xRadio'
  } else if (xType === 'rate') {
    return 'xRate'
  } else if (xType === 'select') {
    if (type === 'tree') {
      return 'xTree'
    }
    return 'xSelect'
  } else if (xType === 'slider') {
    return 'xSlider'
  } else if (xType === 'switch') {
    return 'xSwitch'
  } else if (xType === 'timePicker') {
    return 'xTimePicker'
  } else if (xType === 'timeSelect') {
    return 'xTimeSelect'
  } else if (xType === 'transfer') {
    return 'xTransfer'
  }
}
