import xcrud from "@/components/xcrud";
import golbalConfig from '@/components/xcrud/common/config'
import Cookies from "js-cookie";

let size = Cookies.get('size') || 'mini';
golbalConfig.set({
    input: {
        size
    },
    select: {
        size
    },
    colorPicker: {
        showAlpha: true
    },
    operate: {
        btn: {
            size
        }
    },
    xform: {
        form: {
            size,
            tabs: {
                table: {
                    size,
                    addConfig: {
                        size
                    }
                }
            }
        }
    },
    xtable: {
        table: {
            size
        }
    }
})
export default {
    components: {xForm: xcrud.xForm}
}
