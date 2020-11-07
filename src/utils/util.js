import {isExternal} from '@/utils/validate'
import {getAction} from '@/api/manage'
import store from '@/store'

export function getDicts(codeTypeIds) {
    let dicts = store.getters.dicts
    let result = {}
    if (dicts && dicts !== {}) {
        let codeTypeIdArr = codeTypeIds.split(',')
        let every = codeTypeIdArr.every(codeTypeId => {
            if (dicts[codeTypeId] && dicts[codeTypeId].length > 0) {
                result[codeTypeId] = dicts[codeTypeId]
                return true
            }
            return false
        })
        if (every) {
            return new Promise(function (resolve) {
                resolve({data: result})
            })
        }
    }
    return getAction("/sys/codeInfo/getSysCodeInfos", {codeTypeIds}).then((res) => {
        store.dispatch('user/addDicts', res.data)
        return new Promise(function (resolve) {
            resolve(res)
        })
    })
}

export function formatDictText(dicts, values) {
    if (!(Array.isArray(dicts) && dicts.length > 0)) {
        return values;
    }
    if (!values) {
        return ""
    }
    let valueArr = values.split(",")
    let contentArr = []
    dicts.forEach(dict => {
        for (let i = 0; i < valueArr.length; i++) {
            if (valueArr[i] === dict.value) {
                contentArr.push(dict.content)
                break;
            }
        }
    })
    return contentArr.toString()
}

export function randomString(len) {
    len = len || 32
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    const maxPos = $chars.length
    let pwd = ''
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
}
