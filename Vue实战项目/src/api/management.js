export default {
	getList(_this) {
			_this.$store.dispatch('load-start')
			_this.$http.post('/api/slcms/seller/GetSellerList', {
					page: parseInt(sessionStorage.getItem("management-now-page")),
					page_size: _this.$store.state.management.page_size,
					name: _this.$store.state.management.search,
					business_class_id: _this.$store.state.management.business_id
				})
				.then((response) => {
					_this.$store.dispatch('load-close')
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					let allpage = Math.ceil(msg.resp.seller_count / _this.$store.state.management.page_size)
					_this.$store.dispatch('page', allpage)
					_this.$store.dispatch('management-list', msg.resp.seller_list)
				})
		},
		changeStatus(_this, id, status, cb) {
			_this.$store.dispatch('load-start')
			_this.$http.post('/api/slcms/seller/UpdateSellerStatus', {
					seller_id: id,
					status: status,
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
		ificationList(_this) {
			_this.$store.dispatch('load-start')
			_this.$http.post('/api/slcms/seller/GetBusinessClassificationList')
				.then((response) => {
					_this.$store.dispatch('load-close')
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					_this.ificationList = msg.resp.businessclassification_list
				})
		},
		add(_this) {
			if(_this.$store.state.publicMsg.repeat){return}
			_this.$store.dispatch('repeat-open')
			_this.$http.post('/api/slcms/seller/CreateSeller', {
					category: _this.category,
					name: _this.name,
					short_name: _this.short_name,
					province_id: _this.province_id,
					city_id: _this.city_id,
					address: _this.address,
					phone_list: _this.phone_list,
					logo_url: _this.logo_url,
					person_in_charge: _this.person_in_charge,
					business_license: _this.business_license,
					business_class_id: _this.business_class_id,
					brand_list: _this.brand_id,
					certificate_url: _this.certificate_url,
					coverage_list: _this.coverage,
					description: _this.description
				})
				.then((response) => {
					_this.$store.dispatch('repeat-close')
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						return
					}
					_this.$router.go(-1)
				})
		},
		update(_this) {
			_this.$http.post('/api/slcms/seller/UpdateSeller', {
					seller_id: parseInt(_this.$route.query.seller_id),
					category: _this.category,
					name: _this.name,
					short_name: _this.short_name,
					province_id: _this.province_id,
					city_id: _this.city_id,
					address: _this.address,
					phone_list: _this.phone_list,
					logo_url: _this.logo_url,
					person_in_charge: _this.person_in_charge,
					business_license: _this.business_license,
					business_class_id: _this.business_class_id,
					brand_list: _this.brand_id,
					certificate_url: _this.certificate_url,
					coverage_list: _this.coverage,
					description: _this.description
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						return
					}
					_this.$router.go(-1)
				})
		},
		getEdit(_this) {
			_this.$http.post('/api/slcms/seller/GetSellerDetailById', {
					seller_id: parseInt(_this.$route.query.seller_id),
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						return
					}
					_this.address = msg.resp[0].address
					_this.brand_id = msg.resp[0].brand_list
					_this.business_class_id = msg.resp[0].business_class_id
					_this.business_license = msg.resp[0].business_license
					_this.category = msg.resp[0].category
					if (msg.resp[0].certificate_url[0] != null) {
						_this.certificate_url[0] = msg.resp[0].certificate_url[0].url
					}
					_this.city_id = msg.resp[0].city_id
					_this.coverage = msg.resp[0].converage_list
					_this.description = msg.resp[0].description
					_this.logo_url = msg.resp[0].logo_url
					_this.name = msg.resp[0].name
					_this.person_in_charge = msg.resp[0].person_in_charge
					_this.province_id = msg.resp[0].province_id
					_this.seller_id = msg.resp[0].seller_id
					_this.short_name = msg.resp[0].short_name
					for (let item of msg.resp[0].phone_list) {
						if (item.category == 1) {
							_this.phone_area = item.phone_num
						}
						if (item.category == 2) {
							_this.phone_four = item.phone_num
						}
						if (item.category == 3) {
							_this.phone_mobile = item.phone_num
						}
					}
				})
		},
		GetProvinceList(_this) {
			_this.$http.post('/api/slcms/seller/GetProvinceList')
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						return
					}
					_this.province_list = msg.resp.province_list
				})
		},
		GetBusinessClassificationList(_this) {
			_this.$http.post('/api/slcms/seller/GetBusinessClassificationList')
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						return
					}
					_this.businessclassification_list = msg.resp.businessclassification_list
				})
		},
		GetCoverageList(_this) {
			_this.$http.post('/api/slcms/seller/GetCoverageList')
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						return
					}
					_this.coverage_list = msg.resp.coverage_list
				})
		},
		GetCityList(_this, val) {
			_this.$http.post('/api/slcms/seller/GetCityList', {
					province_id: val
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						return
					}
					_this.city_list = msg.resp.city_list
				})
		}
}