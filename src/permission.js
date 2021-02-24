import router from './router.js'
import nprgroess from 'nprogress'
import 'nprogress/nprogress.css'
// import { of } from 'core-js/fn/array';

router.beforeEach(function(to,from,next){
    nprgroess.start();
    if(to.path.startsWith('/home')){
        const token = window.localStorage.getItem('user-token');
        if(token){
            next();
        }else{
            next('/login');
        }
    }else{
        next();
    }
})
router.afterEach(function(){
    nprgroess.done();
})

export default router