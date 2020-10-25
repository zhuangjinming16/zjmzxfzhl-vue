export function filterDic(dic, value) {
  let labelName = 'label'
  let valueName = 'value'
  if (dic.data || dic.label || dic.value) {
    if (dic.label) labelName = dic.label
    if (dic.value) valueName = dic.value
    dic = dic.data
  }
  if (dic) {
    for (let i = 0; i < dic.length; i++) {
      if (dic[i][valueName] === value) return dic[i][labelName]
    }
  }
  return ''
}
