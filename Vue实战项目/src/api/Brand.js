export default {
	getList(_this) {
			_this.$store.dispatch('load-start')
			_this.$http.post('/api/plcms/brand/GetBrandList', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					page: parseInt(sessionStorage.getItem("brand-now-page")),
					page_size: _this.$store.state.brand.page_size,
					type: 0,
					brand_name: _this.$store.state.brand.search,
				})
				.then((response) => {
					_this.$store.dispatch('load-close')
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					let allpage = Math.ceil(msg.resp.count / _this.$store.state.brand.page_size)
					_this.$store.dispatch('page', allpage)
					_this.$store.dispatch('brand-list', msg.resp.brand_list)
				})
		},
		getList_All(_this,pl_library_id) {
			_this.$store.dispatch('load-start')
			_this.$http.post('/api/plcms/brand/GetBrandList', {
					pl_library_id: pl_library_id || parseInt(sessionStorage.getItem("pl_library_id")),
					type: 1
				})
				.then((response) => {
					_this.$store.dispatch('load-close')
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					_this.brandList = msg.resp.brand_list
					if (!_this.$route.query.brand_id) {
						return
					}
					_this.choose_brand = _this.$route.query.brand_id
					for (let item of msg.resp.brand_list) {
						if (_this.$route.query.brand_id == item.brand_id) {
							_this.brandName = item.brand_name
						}
					}
				})
		},
		getBrand(_this) {
			if (!_this.$route.query.brand_id) {
				return
			}
			_this.$http.post('/api/plcms/brand/GetBrand', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					brand_id: parseInt(_this.$route.query.brand_id)
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					_this.brand_name = msg.resp.pl_brand.brand_name
					_this.chinese_name = msg.resp.pl_brand.chinese_name
					_this.company_name = msg.resp.pl_brand.company_name
					_this.choose_country = msg.resp.pl_brand.country.country_id
					for (let item of msg.resp.pl_brand.category_list) {
						_this.choose_category.push(item.category_id)
					}
					_this.description = msg.resp.pl_brand.description
					_this.img = msg.resp.pl_brand.logo
				})
		},
		add(_this) {
			if(_this.$store.state.publicMsg.repeat){return}
			_this.$store.dispatch('repeat-open')
			_this.$http.post('/api/plcms/brand/AddBrand', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					brand_name: _this.brand_name,
					chinese_name: _this.chinese_name,
					company_name: _this.company_name,
					country_id: parseInt(_this.choose_country),
					category_id_list: _this.choose_category,
					logo: _this.img,
					description: _this.description
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
			_this.$http.post('/api/plcms/brand/UpdateBrand', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					brand_id: parseInt(_this.$route.query.brand_id),
					brand_name: _this.brand_name,
					chinese_name: _this.chinese_name,
					company_name: _this.company_name,
					country_id: parseInt(_this.choose_country),
					category_id_list: _this.choose_category,
					logo: _this.img,
					description: _this.description
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