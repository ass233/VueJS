import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
	path: '/index',
	component: resolve => require(['../App'], resolve),
	children: [{
		path: 'weddingDress',
		component: resolve => require(['../components/weddingDress/index'], resolve),
		children: [{
			path: '/',
			component: resolve => require(['../components/weddingDress/choose'], resolve)
		}, {
			path: 'brand',
			component: resolve => require(['../components/weddingDress/brand/main'], resolve),
			children: [{
				path: '/',
				component: resolve => require(['../components/weddingDress/brand/index'], resolve)
			}, {
				path: 'edit',
				component: resolve => require(['../components/weddingDress/brand/edit'], resolve)
			}]
		}, {
			path: 'series',
			component: resolve => require(['../components/weddingDress/series/main'], resolve),
			children: [{
				path: '/',
				component: resolve => require(['../components/weddingDress/series/index'], resolve)
			}, {
				path: 'edit',
				component: resolve => require(['../components/weddingDress/series/edit'], resolve)
			}]
		}, {
			path: 'style',
			component: resolve => require(['../components/weddingDress/style/main'], resolve),
			children: [{
				path: '/',
				component: resolve => require(['../components/weddingDress/style/index'], resolve)
			}, {
				path: 'edit',
				component: resolve => require(['../components/weddingDress/style/edit'], resolve)
			}]
		}, {
			path: 'parameter',
			component: resolve => require(['../components/weddingDress/parameter/main'], resolve),
			children: [{
				path: '/',
				component: resolve => require(['../components/weddingDress/parameter/index'], resolve)
			}, {
				path: 'edit',
				component: resolve => require(['../components/weddingDress/parameter/edit'], resolve)
			}]
		}, {
			path: 'pic',
			component: resolve => require(['../components/weddingDress/pic/main'], resolve),
			children: [{
				path: '/',
				component: resolve => require(['../components/weddingDress/pic/index'], resolve)
			}]
		}]
	}, {
		path: 'jewelry',
		component: resolve => require(['../components/jewelry/index'], resolve),
		children: [{
			path: '/',
			component: resolve => require(['../components/jewelry/choose'], resolve)
		}, {
			path: 'brand',
			component: resolve => require(['../components/jewelry/brand/main'], resolve),
			children: [{
				path: '/',
				component: resolve => require(['../components/jewelry/brand/index'], resolve)
			}, {
				path: 'edit',
				component: resolve => require(['../components/jewelry/brand/edit'], resolve)
			}]
		}, {
			path: 'series',
			component: resolve => require(['../components/jewelry/series/main'], resolve),
			children: [{
				path: '/',
				component: resolve => require(['../components/jewelry/series/index'], resolve)
			}, {
				path: 'edit',
				component: resolve => require(['../components/jewelry/series/edit'], resolve)
			}]
		}, {
			path: 'style',
			component: resolve => require(['../components/jewelry/style/main'], resolve),
			children: [{
				path: '/',
				component: resolve => require(['../components/jewelry/style/index'], resolve)
			}, {
				path: 'edit',
				component: resolve => require(['../components/jewelry/style/edit'], resolve)
			}]
		}, {
			path: 'parameter',
			component: resolve => require(['../components/jewelry/parameter/main'], resolve),
			children: [{
				path: '/',
				component: resolve => require(['../components/jewelry/parameter/index'], resolve)
			}, {
				path: 'edit',
				component: resolve => require(['../components/jewelry/parameter/edit'], resolve)
			}]
		}, {
			path: 'pic',
			component: resolve => require(['../components/jewelry/pic/main'], resolve),
			children: [{
				path: '/',
				component: resolve => require(['../components/jewelry/pic/index'], resolve)
			}]
		}]
	}, {
		path: 'business',
		component: resolve => require(['../components/business/index'], resolve),
		children: [{
			path: '/',
			component: resolve => require(['../components/business/choose'], resolve)
		}, {
			path: 'management',
			component: resolve => require(['../components/business/management/main'], resolve),
			children: [{
				path: '/',
				component: resolve => require(['../components/business/management/index'], resolve)
			}, {
				path: 'edit',
				component: resolve => require(['../components/business/management/edit'], resolve)
			}]
		}, {
			path: 'jewellery',
			component: resolve => require(['../components/business/jewellery/main'], resolve),
			children: [{
				path: '/',
				component: resolve => require(['../components/business/jewellery/index'], resolve)
			}, {
				path: 'edit',
				component: resolve => require(['../components/business/jewellery/edit'], resolve)
			}]
		}, {
			path: 'wedding',
			component: resolve => require(['../components/business/wedding/main'], resolve),
			children: [{
				path: '/',
				component: resolve => require(['../components/business/wedding/index'], resolve)
			}, {
				path: 'edit',
				component: resolve => require(['../components/business/wedding/edit'], resolve)
			}]
		}, {
			path: 'gold',
			component: resolve => require(['../components/business/gold/index'], resolve),
		}, {
			path: 'opportunity',
			component: resolve => require(['../components/business/opportunity/index'], resolve),
		}]
	}]
}, {
	path: '*',
	redirect: '/index',
}]


const router = new VueRouter({
	routes
})
export default router