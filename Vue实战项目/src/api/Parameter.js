export default {
	getList(_this) {
			_this.$store.dispatch('load-start')
			_this.$http.post('/api/plcms/style_parameter/GetParameterList', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					page: parseInt(sessionStorage.getItem("parameter-now-page")),
					page_size: _this.$store.state.parameter.page_size,
					parameter_name: _this.$store.state.parameter.search
				})
				.then((response) => {
					_this.$store.dispatch('load-close')
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					let allpage = Math.ceil(msg.resp.count / _this.$store.state.parameter.page_size)
					_this.$store.dispatch('page', allpage)
					_this.$store.dispatch('parameter-list', msg.resp.list)
				})
		},
		ChangeParameterOrderNum(_this, id, order, type, cb, name) {
			_this.$http.post('/api/plcms/style_parameter/ChangeParameterOrderNum', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					type: parseInt(type),
					id: parseInt(id),
					order_num: parseInt(order),
					parameter_group_name: name
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					cb(_this)
					_this.group_num = null
					_this.change_num = null
				})
		},
		addGroup(_this, cb) {
			if(_this.$store.state.publicMsg.repeat){return}
			_this.$store.dispatch('repeat-open')
			_this.$http.post('/api/plcms/style_parameter/CreateParameterGroup', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					parameter_group_name: _this.kind
				})
				.then((response) => {
					_this.$store.dispatch('repeat-close')
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					cb(_this)
					_this.$store.dispatch('pic-open-kind')
					_this.kind=null
				})
		},
		getGroup(_this) {
			_this.$http.post('/api/plcms/style_parameter/GetParameterGroupList', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					_this.parameterList = msg.resp.parameter_group_list
				})
		},
		getEdit(_this) {
			if (!_this.$route.query.parameter_id) {
				return
			}
			_this.change = true
			_this.$http.post('/api/plcms/style_parameter/GetParameter', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					parameter_id: parseInt(_this.$route.query.parameter_id)
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					_this.choose_parameter = msg.resp.pl_style_parameter.pl_style_parameter_group_id
					_this.parameter_name = msg.resp.pl_style_parameter.parameter_name
					for (let item of msg.resp.pl_style_parameter.category_list) {
						_this.choose_category.push(item.category_id)
					}
					_this.choose_kind = msg.resp.pl_style_parameter.data_type
					_this.unit = msg.resp.pl_style_parameter.unit
					if (msg.resp.pl_style_parameter.data_type == 1) {
						return
					}
					_this.option = []
					for (let item of msg.resp.pl_style_parameter.parameter_content_list) {
						let add = {}
						add.name = item.name
						add.id = item.id
						_this.option.push(add)
					}
				})
		},
		add(_this) {
			if(_this.$store.state.publicMsg.repeat){return}
			_this.$store.dispatch('repeat-open')
			let parameter_content_list = []
			if (_this.choose_kind != 1) {
				for (let item of _this.option) {
					if (item.name != null) {
						parameter_content_list.push(item.name)
					}
				}
			}
			_this.$http.post('/api/plcms/style_parameter/CreateParameter', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					parameter_group_id: _this.choose_parameter,
					parameter_name: _this.parameter_name,
					category_id_list: _this.choose_category,
					unit: _this.unit,
					data_type: _this.choose_kind,
					parameter_content_list: parameter_content_list
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
		update(_this) {
			let parameter_content_list = []
			if (_this.choose_kind != 1) {
				for (let item of _this.option) {
					if (item.name != null) {
						parameter_content_list.push(item)
					}
				}
			}
			_this.$http.post('/api/plcms/style_parameter/UpdateParameter', {
					pl_library_id: _this.$store.state.publicMsg.pl_library_id,
					parameter_id: parseInt(_this.$route.query.parameter_id),
					parameter_group_id: parseInt(_this.choose_parameter),
					parameter_name: _this.parameter_name,
					category_id_list: _this.choose_category,
					unit: _this.unit,
					data_type: parseInt(_this.choose_kind),
					parameter_content_list: parameter_content_list
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