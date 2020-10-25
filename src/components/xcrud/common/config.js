import merge from 'lodash.merge'
const golbalConfig = {
  input: {
    disabled: false,
    type: 'text',
    valueKey: 'value',
    debounce: 300,
    placement: 'bottom-start',
    triggerOnFocus: true,
    selectWhenUnmatched: false,
    maxlength: null,
    minlength: null,
    showWordLimit: false,
    placeholder: null,
    clearable: false,
    size: 'medium',
    rows: 3,
    autosize: false,
    autocomplete: 'off',
    resize: 'none',
    validateEvent: true,
    hideLoading: false,
    popperAppendToBody: true,
    highlightFirstItem: false
  },
  autocomplete: {
    disabled: false,
    placeholder: null,
    valueKey: 'value',
    debounce: 300,
    placement: 'bottom-start',
    fetchSuggestions: null,
    popperClass: null,
    triggerOnFocus: true,
    name: null,
    selectWhenUnmatched: false,
    label: null,
    prefixIcon: null,
    suffixIcon: null,
    hideLoading: false,
    popperAppendToBody: true,
    highlightFirstItem: false,
    maxlength: null,
    minlength: null,
    clearable: false,
    size: 'medium',
    rows: 3,
    autosize: false,
    autocomplete: 'off',
    resize: 'none',
    validateEvent: true
  },
  select: {
    disabled: false,
    multiple: false,
    valueKey: 'value',
    size: 'medium',
    clearable: false,
    collapseTags: false,
    multipleLimit: 0,
    autocomplete: 'off',
    placeholder: '请选择',
    filterable: false,
    allowCreate: false,
    remote: false,
    loading: false,
    loadingText: '加载中',
    noMatchText: '无匹配数据',
    noDataText: '无数据',
    reserveKeyword: false,
    defaultFirstOption: false,
    popperAppendToBody: true,
    automaticDropdown: false
  },
  datePicker: {
    disabled: false,
    readonly: false,
    editable: true,
    clearable: true,
    size: '',
    placeholder: '请选择日期',
    startPlaceholder: '开始时间',
    endPlaceholder: '结束时间',
    type: 'date',
    format: '',
    align: 'left',
    pickerOptions: {},
    rangeSeparator: ':',
    valueFormat: '',
    unlinkPanels: false,
    prefixIcon: 'el-icon-date',
    clearIcon: 'el-icon-circle-close',
    validateEvent: true
  },
  checkbox: {
    disabled: false,
    size: 'medium',
    min: undefined,
    max: undefined,
    textColor: '#ffffff',
    fill: '#409EFF',
    border: false
  },
  radio: {
    disabled: false,
    border: false,
    size: 'medium',
    textColor: '#ffffff',
    fill: '#409EFF'
  },
  cascader: {
    disabled: false,
    size: 'medium',
    placeholder: '请选择',
    clearable: false,
    showAllLevels: true,
    collapseTags: false,
    separator: ' / ',
    debounce: 300
  },
  switch: {
    disabled: false,
    width: 40,
    activeValue: true,
    inactiveValue: false,
    activeColor: '#409EFF',
    inactiveColor: '#C0CCDA',
    validateEvent: true
  },
  inputNumber: {
    disabled: false,
    min: '-Infinity',
    max: 'Infinity',
    step: 1,
    stepStrictly: false,
    precision: null,
    size: 'medium',
    controls: true,
    controlsPosition: null,
    placeholder: null
  },
  slider: {
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    showInput: false,
    showInputControls: true,
    inputSize: 'small',
    showStops: false,
    showTooltip: true,
    range: false,
    vertical: false,
    height: null,
    label: null,
    debounce: 300,
    marks: null
  },
  timePicker: {
    disabled: false,
    editable: true,
    clearable: true,
    size: 'medium',
    placeholder: '',
    align: 'left',
    startPlaceholder: '',
    endPlaceholder: '',
    isRange: false,
    arrowControl: false,
    pickerOptions: {},
    rangeSeparator: ':',
    valueFormat: '',
    prefixIcon: 'el-icon-time',
    clearIcon: 'el-icon-circle-close',

    selectableRange: null,
    format: 'HH:mm:ss'
  },
  timeSelect: {
    disabled: false,
    editable: true,
    clearable: true,
    size: 'medium',
    placeholder: '',
    align: 'left',
    startPlaceholder: '',
    endPlaceholder: '',
    isRange: false,
    arrowControl: false,
    pickerOptions: {},
    rangeSeparator: ':',
    valueFormat: '',
    prefixIcon: 'el-icon-time',
    clearIcon: 'el-icon-circle-close',

    start: '09:00',
    end: '18:00',
    step: '00:30',
    minTime: '00:00',
    maxTime: null
  },
  rate: {
    disabled: false,
    max: 5,
    texts: ['极差', '失望', '一般', '满意', '惊喜'],
    colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A'],
    allowHalf: false,
    lowThreshold: 2,
    highThreshold: 4,
    voidColor: '#C6D1DE',
    iconClasses: ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'],
    showText: false,
    showScore: false,
    textColor: '#1F2D3D',
    scoreTemplate: '{value}',
    disabledVoidColor: '#EFF2F7',
    voidIconClass: 'el-icon-star-off',
    disabledVoidIconClass: 'el-icon-star-on'
  },
  colorPicker: {
    disabled: false,
    size: 'medium',
    predefine: null,
    showAlpha: false,
    colorFormat: 'hex'
  },
  transfer: {
    disabled: false,
    filterable: false,
    filterPlaceholder: '请输入搜索内容',
    targetOrder: 'original',
    titles: ['列表 1', '列表 2'],
    buttonTexts: [],
    format: { noChecked: '${checked}/${total}', hasChecked: '${checked}/${total}' },
    props: null
  },
  xtable: {
    table: {
      height: null,
      maxHeight: null,
      stripe: false,
      border: false,
      size: 'medium',
      fit: true,
      showHeader: true,
      highlightCurrentRow: false,
      rowClassName: null,
      rowStyle: null,
      cellClassName: null,
      cellStyle: null,
      headerRowClassName: null,
      headerRowStyle: null,
      headerCellClassName: null,
      headerCellStyle: null,
      emptyText: '暂无数据',
      defaultExpandAll: false,
      defaultSort: { order: 'ascending' },
      tooltipEffect: 'dark',
      showSummary: false,
      sumText: '合计',
      selectOnIndeterminate: true,
      indent: 16,
      treeProps: { hasChildren: 'hasChildren', children: 'children' }
    },
    column: {
      width: null,
      minWidth: null,
      fixed: false,
      sortable: false,
      sortOrders: ['ascending', 'descending', null],
      resizable: true,
      showOverflowTooltip: false,
      align: 'center',
      headerAlign: 'center',
      className: null,
      labelClassName: null,
      reserveSelection: false,
      filterPlacement: null,
      filterMultiple: true
    },
    search: {
      form: {
        inline: true,
        labelPosition: 'right',
        labelWidth: 'auto',
        labelSuffix: undefined,
        hideRequiredAsterisk: false,
        showMessage: true,
        inlineMessage: false,
        statusIcon: false,
        validateOnRuleChange: true,
        size: 'medium',
        disabled: false,
        itemStyle: 'width: 200px;'
      },
      btn: {
        size: 'medium',
        type: 'primary',
        plain: false,
        round: false,
        circle: false,
        loading: false,
        disabled: false,
        icon: null,
        autofocus: false,
        nativeType: 'button',
        searchBtn: {
          // circle: false,
          // round: false,
          // plain: false,
          // type: 'primary',
          show: true,
          text: '搜索',
          icon: 'el-icon-search'
        },
        resetBtn: {
          // circle: false,
          // round: false,
          // plain: false,
          // type: 'primary',
          show: true,
          text: '重置',
          icon: 'el-icon-refresh-right'
        }
      }
    },
    operate: {
      column: {
        label: '操作'
        // width: null,
        // minWidth: null,
        // fixed: false
        // renderHeader: null,
        // resizable: null,
        // align: null,
        // headerAlign: null,
        // className: null,
        // labelClassName: null
      },
      btn: {
        size: 'medium',
        type: 'primary',
        plain: false,
        round: false,
        circle: false,
        loading: false,
        disabled: false,
        icon: null,
        autofocus: false,
        nativeType: 'button'
      },
      dropdown: {
        className: '',
        text: '更多',
        placement: 'bottom-end',
        trigger: 'hover',
        hideOnClick: true,
        showTimeout: 250,
        hideTimeout: 150,
        tabindex: 0,
        divided: false
      }
    }
  },
  xform: {
    form: {
      inline: false,
      labelPosition: 'right',
      labelWidth: '120px',
      labelSuffix: undefined,
      hideRequiredAsterisk: false,
      showMessage: true,
      inlineMessage: false,
      statusIcon: false,
      validateOnRuleChange: true,
      size: 'medium',
      disabled: false,
      itemStyle: 'max-width: 300px; width: 100%;',
      tooltip: {
        effect: 'dark',
        placement: 'top-start',
        iconName: 'el-icon-info',
        iconStyle: 'color: #409EFF'
      },
      tabs: {
        type: 'border-card',
        closable: false,
        addable: false,
        editable: false,
        tabPosition: 'top',
        stretch: false,
        table: {
          height: null,
          maxHeight: null,
          stripe: false,
          border: true,
          size: 'medium',
          fit: true,
          showHeader: true,
          highlightCurrentRow: false,
          rowClassName: null,
          rowStyle: null,
          cellClassName: null,
          cellStyle: null,
          headerRowClassName: null,
          headerRowStyle: null,
          headerCellClassName: null,
          headerCellStyle: null,
          emptyText: '暂无数据',
          defaultExpandAll: false,
          defaultSort: { order: 'ascending' },
          tooltipEffect: 'dark',
          showSummary: false,
          sumText: '合计',
          selectOnIndeterminate: true,
          indent: 16,
          treeProps: { hasChildren: 'hasChildren', children: 'children' },
          column: {
            width: null,
            minWidth: null,
            showOverflowTooltip: false,
            align: 'center',
            headerAlign: 'center',
            className: null,
            // input的宽度100%
            style: 'width: 100%'
          },
          addConfig: {
            show: true,
            type: 'primary',
            icon: '',
            text: '新增',
            size: 'mini',
            circle: false,
            style: 'margin-bottom:14px;',
            className: '',
            click: (fun, arr) => {
              if (fun) {
                fun(arr)
                return
              }
              arr.splice(arr.length, 0, {})
            }
          },
          operate: {
            show: true,
            label: '操作',
            width: '60px',
            headerAlign: 'center',
            align: 'center',
            btn: [
              {
                type: 'danger',
                icon: 'el-icon-close',
                text: '',
                size: 'mini',
                circle: true,
                style: '',
                className: '',
                click: (arr, index, fun) => {
                  if (fun) {
                    fun(arr, index)
                    return
                  }
                  arr.splice(index, 1)
                }
              }
            ]
          }
        }
      }
    },
    operate: {
      btn: {
        size: 'medium',
        type: 'primary',
        plain: false,
        round: false,
        circle: false,
        loading: false,
        disabled: false,
        icon: null,
        autofocus: false,
        nativeType: 'button'
      }
    }
  }
}

export default {
  get: () => golbalConfig,
  set: item => {
    merge(golbalConfig, item)
  }
}
