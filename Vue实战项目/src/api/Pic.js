export default {
	getList(_this) {
			_this.$store.dispatch('load-start')
			_this.$http.post('/api/plcms/style_picture/GetPictureList', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					page: parseInt(sessionStorage.getItem("pic-now-page")),
					page_size: _this.$store.state.pic.page_size,
					type: 0,
					style_id: parseInt(_this.$route.query.style_id),
					title: _this.$store.state.pic.search
				})
				.then((response) => {
					_this.$store.dispatch('load-close')
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					let allpage = Math.ceil(msg.resp.count / _this.$store.state.pic.page_size)
					_this.$store.dispatch('page', allpage)
					_this.$store.dispatch('pic-list', msg.resp.list)
				})
		},
		getPicCategory(_this) {
			_this.$http.post('/api/plcms/style_picture/GetPictureCategoryList', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					_this.$store.dispatch('pic-picture_category', msg.resp)
				})
		},
		update(_this, val, id, type, order, cb) {
			_this.$http.post('/api/plcms/style_picture/UpdatePictureInfo', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					picture_id: parseInt(id),
					picture_category_id: parseInt(_this.msg[val].picture_category.picture_category_id),
					title: _this.msg[val].title,
					order_num: order || _this.msg[val].order_num,
					style_id: parseInt(_this.$route.query.style_id),
					type: parseInt(type)
				})
				.then((response) => {
					_this.changePicNum = null
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					cb(_this)
				})
		},
		changePicStyle(_this, cb) {
			_this.$http.post('/api/plcms/style_picture/ChangePictureStyle', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					picture_id: parseInt(_this.move_id),
					style_id: parseInt(_this.$route.query.style_id),
					new_style_id: parseInt(_this.choose_style)
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					cb(_this)
				})
		},
		GetListImage(_this) {
			_this.$http.post('/api/plcms/style_picture/GetListImage', {
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
					for (let item of msg.resp.list) {
						if (item.is_list_image == 1 && item.list_image_order_num == 1) {
							_this.fir_id = item.id
							_this.fir_url = item.picture_url
						}
						if (item.is_list_image == 1 && item.list_image_order_num == 2) {
							_this.sec_id = item.id
							_this.sec_url = item.picture_url
						}
					}
				})
		},
		SetListImage(_this, list, cb) {
			_this.$http.post('/api/plcms/style_picture/SetListImage', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					style_id: parseInt(_this.$route.query.style_id),
					picture_info_list: list
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					cb(_this)
					_this.closeup()
				})
		}
}