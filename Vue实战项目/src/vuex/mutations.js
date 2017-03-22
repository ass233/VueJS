const mutations = {
    'add-msg' (state, msg) {
        state.publicMsg.messageList = msg
    },
    'page' (state, msg) {
        state.publicMsg.allpage = msg
    },
    'pl_library_id' (state, msg) {
        state.publicMsg.pl_library_id = msg
    },
    'now-initial' (state, msg) {
        state.publicMsg.nowpage = 1
    },
    'now-change' (state, msg) {
        state.publicMsg.nowpage = msg
    },
    'now-add' (state) {
        state.publicMsg.nowpage++
    },
    'now-reduce' (state) {
        state.publicMsg.nowpage--
    },
    'repeat-close' (state) {
        state.publicMsg.repeat = false
    },
    'repeat-open' (state) {
        state.publicMsg.repeat = true
    },
    'alert-start' (state) {
        state.alert.open = true
    },
    'alert-close' (state) {
        state.alert.open = false
    },
    'alert-msg' (state, msg) {
        state.alert.msg = msg
    },
    'load-start' (state) {
        state.load.open = true
    },
    'load-close' (state) {
        state.load.open = false
    },
    'brand-list' (state, msg) {
        state.brand.list = msg
    },
    'brand-search' (state, msg) {
        state.brand.search = msg
    },
    'series-list' (state, msg) {
        state.series.list = msg
    },
    'series-search' (state, msg) {
        state.series.search = msg
    },
    'parameter-list' (state, msg) {
        state.parameter.list = msg
    },
    'parameter-search' (state, msg) {
        state.parameter.search = msg
    },
    'style-list' (state, msg) {
        state.style.list = msg
    },
    'style-search' (state, msg) {
        state.style.search = msg
    },
    'pic-list' (state, msg) {
        state.pic.list = msg
    },
    'pic-search' (state, msg) {
        state.pic.search = msg
    },
    'pic-open-upload' (state) {
        state.pic.upload = !state.pic.upload
    },
    'pic-open-move' (state) {
        state.pic.move = !state.pic.move
    },
    'pic-open-cover' (state) {
        state.pic.cover = !state.pic.cover
    },
    'pic-open-kind' (state) {
        state.pic.kind = !state.pic.kind
    },
    'pic-picture_category' (state, msg) {
        state.pic.picture_category = msg
    },
    'pic-move_id' (state, msg) {
        state.pic.move_id = msg
    },
    'pic-move_url' (state, msg) {
        state.pic.move_url = msg
    },
    'management-list' (state, msg) {
        state.management.list = msg
    },
    'management-search' (state, msg) {
        state.management.search = msg
    },
    'management-business_id' (state, msg) {
        state.management.business_id = msg
    },
    'gold-list' (state, msg) {
        state.gold.list = msg
    },
    'opportunity-list' (state, msg) {
        state.opportunity.list = msg
    },
    'opportunity-search' (state, msg) {
        state.opportunity.search = msg
    },
    'common-list' (state, msg) {
        state.common.list = msg
    },
    'common-search' (state, msg) {
        state.common.search = msg
    },
}

export default mutations