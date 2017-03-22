export default {
	getList(_this) {
			_this.$store.dispatch('load-start')
			_this.$http.post('/api/plcms/style/GetStyleList', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					page: parseInt(sessionStorage.getItem("style-now-page")),
					page_size: _this.$store.state.style.page_size,
					type: 0,
					series_id: parseInt(_this.$route.query.series_id),
					style_name: _this.$store.state.style.search
				})
				.then((response) => {
					_this.$store.dispatch('load-close')
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					let allpage = Math.ceil(msg.resp.count / _this.$store.state.style.page_size)
					_this.$store.dispatch('page', allpage)
					_this.$store.dispatch('style-list', msg.resp.style_list)
				})
		},
		getList_All(_this, id, pl_library_id) {
			_this.$store.dispatch('load-start')
			_this.$http.post('/api/plcms/style/GetStyleList', {
					pl_library_id: pl_library_id || parseInt(sessionStorage.getItem("pl_library_id")),
					series_id: parseInt(id),
					type: 1
				})
				.then((response) => {
					_this.$store.dispatch('load-close')
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						return
					}
					_this.styleList = msg.resp.style_list
				})
		},
		ParameterByCategory(_this, id) {
			if (_this.first) {
				_this.first = false
				return
			}
			_this.$http.post('/api/plcms/style/GetStyleParameterByCategory', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					category_id: parseInt(id)
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					for (let item of msg.resp.pl_style_parameter_group_list) {
						for (let list of item.parameter_list) {
							if (list.data_type == 3) {
								list.value = []
							}
						}
					}
					_this.add_list = msg.resp.pl_style_parameter_group_list
				})
		},
		getEdit(_this, cb) {
			if (!_this.$route.query.style_id) {
				cb(_this)
				return
			}
			_this.first = true
			_this.$http.post('/api/plcms/style/GetStyleParameter', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					style_id: parseInt(_this.$route.query.style_id)
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					_this.choose_brand = msg.resp.pl_style.brand_id
					_this.choose_series = msg.resp.pl_style.series_id
					_this.choose_year = msg.resp.pl_style.year_style_id
					_this.brandName = msg.resp.pl_style.brand_name
					_this.seriesName = msg.resp.pl_style.series_name
					_this.choose_category = msg.resp.pl_style.category_selected_id
					_this.choose_sell_status = msg.resp.pl_style.sell_status
					_this.show_real_name = msg.resp.pl_style.real_name
					for (let item of msg.resp.pl_style.paremeter_group_list) {
						for (let list of item.parameter_list) {
							if (list.data_type == 3) {
								if (list.value == "" || list.value == null) {
									list.value = []
								} else {
									list.value = list.value.split(",")
								}
							}
						}
					}
					_this.add_list = msg.resp.pl_style.paremeter_group_list
					cb(_this)
				})
		},
		update(_this) {
			_this.$http.post('/api/plcms/style/UpdateStyle', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					style_id: parseInt(_this.$route.query.style_id),
					series_id: parseInt(_this.choose_series),
					year_style_id: parseInt(_this.choose_year),
					style_name: _this.style_name,
					style_real_name: _this.show_real_name || _this.style_real_name,
					category_id: parseInt(_this.choose_category),
					paremeter_list: _this.paremeter_list,
					sell_status: _this.choose_sell_status
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
		},
		add(_this) {
			if(_this.$store.state.publicMsg.repeat){return}
			_this.$store.dispatch('repeat-open')
			_this.$http.post('/api/plcms/style/AddStyle', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					year_style_id: parseInt(_this.choose_year),
					style_name: _this.style_name,
					style_real_name: _this.style_real_name,
					category_id: parseInt(_this.choose_category),
					paremeter_list: _this.paremeter_list,
					series_id: parseInt(_this.choose_series),
					sell_status: _this.choose_sell_status
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
		}
}