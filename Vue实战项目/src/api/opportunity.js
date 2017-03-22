export default {
	getList(_this) {
			_this.$store.dispatch('load-start')
			_this.$http.post('/api/slcms/opportunity/GetStatisticsList', {
					page: parseInt(sessionStorage.getItem("opportunity-now-page")),
					page_size: _this.$store.state.opportunity.page_size,
					seller_name: _this.$store.state.opportunity.search,
					seller_id:_this.$route.query.seller_id
				})
				.then((response) => {
					_this.$store.dispatch('load-close')
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					let allpage = Math.ceil(msg.resp.statistics_count / _this.$store.state.opportunity.page_size)
					_this.$store.dispatch('page', allpage)
					_this.$store.dispatch('opportunity-list', msg.resp.statistics_list)
				})
		},
		UpdateVisitRecord(_this,cb) {
			_this.$store.dispatch('load-start')
			_this.$http.post('/api/slcms/opportunity/UpdateVisitRecord', {
					user_want_id: _this.id,
					return_visit_record: _this.description,
				})
				.then((response) => {
					_this.$store.dispatch('load-close')
					_this.modal = false
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					cb(_this)
				})
		}
}