export default {
	ChangeStatus(_this, type, id, status, cb) {
			_this.$http.post('/api/plcms/common/ChangeStatus', {
				pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
				type: parseInt(type),
				id: parseInt(id),
				status: parseInt(status)
			}).then((response) => {
				let msg = JSON.parse(response.data)
				if (msg.retcode != 0) {
					_this.$store.dispatch('alert-msg', msg.msg)
					_this.$store.dispatch('alert-start')
					return
				}
				cb(_this)
			})
		},
		signature(_this, type) {
			_this.$http.post('/common/get_product_policy_signature/GetProductPolicySingnature', {
					type: type || parseInt(sessionStorage.getItem("pic_type")),
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					_this.access_url = msg.resp.access_url
					_this.accessid = msg.resp.accessid
					_this.expire = msg.resp.expire
					_this.host = msg.resp.host
					_this.key = msg.resp.key
					_this.oss_bucket = msg.resp.oss_bucket
					_this.policy = msg.resp.policy
					_this.signature = msg.resp.signature
				})
		},
		category(_this, type, id, pl_library_id) {
			_this.$http.post('/api/plcms/category/GetCategoryList', {
					pl_library_id: pl_library_id || parseInt(sessionStorage.getItem("pl_library_id")),
					type: parseInt(type),
					id: parseInt(id)
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					_this.category = msg.resp
				})
		},
		country(_this) {
			_this.$http.post('/api/plcms/country/GetCountryList', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					_this.country = msg.resp
				})
		},
		Year(_this) {
			_this.$http.post('/api/plcms/style_picture/GetYearStyleList', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					_this.year = msg.resp
				})
		}
}