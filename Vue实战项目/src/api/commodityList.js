export default {
	getList(_this) {
			_this.$store.dispatch('load-start')
			_this.$http.post('/api/slcms/commodity/GetCommodityList', {
					page: _this.$store.state.publicMsg.nowpage,
					page_size: _this.$store.state.common.page_size,
					seller_id: parseInt(_this.$route.query.seller_id),
					commodity_name: _this.$store.state.common.search,
				})
				.then((response) => {
					_this.$store.dispatch('load-close')
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					let allpage = Math.ceil(msg.resp.commodity_count / _this.$store.state.common.page_size)
					_this.$store.dispatch('page', allpage)
					_this.$store.dispatch('common-list', msg.resp.commodity_list)
				})
		},
		UpdateCommodityStatus(_this, id, status, cb) {
			_this.$store.dispatch('load-start')
			_this.$http.post('/api/slcms/commodity/UpdateCommodityStatus', {
					commodity_id: id,
					status: status
				})
				.then((response) => {
					_this.$store.dispatch('load-close')
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					cb(_this)
				})
		},
		GetCommodity(_this, val) {
			_this.$http.post('/api/slcms/commodity/GetCommodityParamterList', {
					brand_id:_this.choose_brand,
					category_id: _this.choose_category,
					style_id: val
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					_this.commodity = msg.resp.parameter_group_list
				})
		},
		GetSaleFormList(_this, library_id) {
			_this.$http.post('/api/slcms/commodity/GetSaleFormList', {
					library_id: library_id,
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						return
					}
					_this.categorys = msg.resp.sale_form_list
				})
		},
		add(_this) {
			if(_this.$store.state.publicMsg.repeat){return}
			_this.$store.dispatch('repeat-open')
			_this.$http.post('/api/slcms/commodity/AddCommodity', {
					category_id: _this.choose_category,
					brand_id: _this.choose_brand,
					series_id: _this.choose_series,
					style_id: _this.choose_style,
					seller_id: parseInt(_this.$route.query.seller_id),
					sale_from_list: _this.sale_from_list,
					parameter_group_list: _this.commodity
				})
				.then((response) => {
					_this.$store.dispatch('repeat-close')
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					_this.$router.go(-1)
				})
		},
		getEdit(_this) {
			_this.$http.post('/api/slcms/commodity/GetCommodityById', {
					commodity_id: parseInt(_this.$route.query.commodity_id)
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					_this.choose_category = msg.resp.commodity[0].category_id
					_this.choose_brand = msg.resp.commodity[0].brand_id
					_this.choose_series = msg.resp.commodity[0].series_id
					_this.choose_style = msg.resp.commodity[0].style_id
					if (_this.style == 0) {
						for (let item of msg.resp.commodity[0].sale_from_list) {
							_this.sale_from_list.push(item.sale_form_id)
						}
					}
					if (_this.style == 1) {
							_this.choose_sale=msg.resp.commodity[0].sale_from_list[0].sale_form_id
					}
					_this.commodity = msg.resp.commodity[0].parameter_group_list
				})
		},
		update(_this) {
			_this.$http.post('/api/slcms/commodity/UpdateCommodity', {
					commodity_id: parseInt(_this.$route.query.commodity_id),
					category_id: _this.choose_category,
					brand_id: _this.choose_brand,
					series_id: _this.choose_series,
					style_id: _this.choose_style,
					seller_id: parseInt(_this.$route.query.seller_id),
					sale_from_list: _this.sale_from_list,
					parameter_group_list: _this.commodity
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					_this.$router.go(-1)
				})
		}
}