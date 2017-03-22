const state = {
	publicMsg: {
		messageList: null,
		allpage: Number,
		nowpage: Number,
		pl_library_id: Number,
		repeat:false
	},
	load: {
		open: false
	},
	alert: {
		open: false,
		msg: null,
	},
	brand: {
		page_size: 20,
		search: null,
		list: null,
	},
	series: {
		page_size: 20,
		search: null,
		list: null,
	},
	parameter: {
		page_size: 3,
		search: null,
		list: null,
	},
	style: {
		page_size: 20,
		search: null,
		list: null,
	},
	pic: {
		page_size: 20,
		search: null,
		move: false,
		kind: false,
		move_url: null,
		move_id: Number,
		list: null,
		picture_category: null,
		upload: false,
		cover: false
	},
	management: {
		page_size: 20,
		search: null,
		business_id:null,
		list: null,
	},
	gold:{
		page_size: 20,
		list: null,
	},
	opportunity:{
		page_size: 20,
		list: null,
		search: null,
	},
	common:{
		page_size: 20,
		list: null,
		search: null,
	}
}

export default state