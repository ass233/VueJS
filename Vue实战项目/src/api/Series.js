export default {
	getList(_this) {
			_this.$store.dispatch('load-start')
			_this.$http.post('/api/plcms/series/GetSeriesList', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					page: parseInt(sessionStorage.getItem("series-now-page")),
					page_size: _this.$store.state.series.page_size,
					type: 0,
					brand_id: parseInt(_this.$route.query.brand_id),
					series_name: _this.$store.state.series.search
				})
				.then((response) => {
					_this.$store.dispatch('load-close')
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					let allpage = Math.ceil(msg.resp.count / _this.$store.state.series.page_size)
					_this.$store.dispatch('page', allpage)
					_this.$store.dispatch('series-list', msg.resp.series_list)
				})
		},
		getList_All(_this, id, pl_library_id) {
			_this.$store.dispatch('load-start')
			_this.$http.post('/api/plcms/series/GetSeriesList', {
					pl_library_id: pl_library_id || parseInt(sessionStorage.getItem("pl_library_id")),
					type: 1,
					brand_id: parseInt(id)
				})
				.then((response) => {
					_this.$store.dispatch('load-close')
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					_this.seriesList = msg.resp.series_list
					if (!_this.$route.query.series_id) {
						return
					}
					_this.choose_series = _this.$route.query.series_id
					for (let item of msg.resp.series_list) {
						if (_this.$route.query.series_id == item.series_id) {
							_this.seriesName = item.series_name
						}
					}
				})
		},
		getEdit(_this) {
			if (!_this.$route.query.series_id) {
				return
			}
			_this.$http.post('/api/plcms/series/GetSeries', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					series_id: parseInt(_this.$route.query.series_id)
				})
				.then((response) => {
					let msg = JSON.parse(response.data)
					if (msg.retcode != 0) {
						_this.$store.dispatch('alert-msg', msg.msg)
						_this.$store.dispatch('alert-start')
						return
					}
					_this.has_series_name = msg.resp.pl_series.series_name
					_this.designer_name = msg.resp.pl_series.designer_name
					for (let item of msg.resp.pl_series.category_list) {
						_this.choose_category.push(item.category_id)
					}
					_this.description = msg.resp.pl_series.description
					_this.country = msg.resp.pl_series.brand.country.country_name
					if (msg.resp.pl_series.series_empty == "1") {
						_this.no_series = true
					}
				})
		},
		add(_this) {
			if(_this.$store.state.publicMsg.repeat){return}
			_this.$store.dispatch('repeat-open')
			_this.$http.post('/api/plcms/series/AddSeries', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					brand_id: parseInt(_this.brandId),
					series_name: _this.series_name,
					series_empty: _this.series_empty,
					designer_name: _this.designer_name,
					category_id_list: _this.choose_category,
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
			_this.$http.post('/api/plcms/series/UpdateSeries', {
					pl_library_id: parseInt(sessionStorage.getItem("pl_library_id")),
					series_id: parseInt(_this.$route.query.series_id),
					brand_id: parseInt(_this.brandId),
					series_name: _this.series_name,
					series_empty: _this.series_empty,
					designer_name: _this.designer_name,
					category_id_list: _this.choose_category,
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