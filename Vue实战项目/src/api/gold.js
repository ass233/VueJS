export default {
	getList(_this) {
			_this.$store.dispatch('load-start')
			_this.$http.post('/api/slcms/quotation/GetQuotationList', {
					page: parseInt(sessionStorage.getItem("gold-now-page")),
					page_size: _this.$store.state.gold.page_size,
				})
				.then((response) => {
					_this.$store.dispatch('load-close')
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					let allpage = Math.ceil(msg.resp.quotation_count / _this.$store.state.gold.page_size)
					_this.$store.dispatch('page', allpage)
					_this.$store.dispatch('gold-list', msg.resp.quotation_list)
				})
		},
		UpdateQuotation(_this, id, gold, platinum, cb) {
			_this.$store.dispatch('load-start')
			_this.$http.post('/api/slcms/quotation/UpdateQuotation', {
				brand_id: id,
				gold_price: gold,
				platinum_price: platinum
			}).then((response) => {
				_this.$store.dispatch('load-close')
				let msg = JSON.parse(response.data)
				if (msg.retcode != 0) {
					_this.$store.dispatch('alert-msg', msg.msg)
					_this.$store.dispatch('alert-start')
					return
				}
				_this.change_brand = Number
				_this.change = Number
				cb(_this)
			})
		}
}