import { chromium } from '@playwright/test';
const browser=await chromium.launch({headless:true,args:['--disable-gpu','--disable-accelerated-2d-canvas','--in-process-gpu','--single-process']});
try{
 const page=await browser.newPage({viewport:{width:1280,height:900},deviceScaleFactor:1});
 page.on('console',m=>console.log('PAGE',m.text()));
 await page.goto(new URL('browser.html',import.meta.url).href);
 console.log(await page.evaluate(()=>{const c=window.cad.renderer.camera;return {width:c.width,height:c.height,scale:c.scale,center:c.center,step:c.gridStep,bounds:c.bounds};}));
 console.log(await Promise.race([page.evaluate(()=>{const e=window.cad;console.log('before-render');const context=e.renderer.context; e.renderer.context=new Proxy(context,{get(target,key){const value=Reflect.get(target,key,target);return typeof value==='function'?(...args)=>{console.log('canvas',key);return value.apply(target,args);}:value;},set(target,key,value){return Reflect.set(target,key,value,target);}});e.renderer.render(e.drawing,{selected:new Set(),preview:[],pen:false});console.log('after-render');return 'render complete';}),new Promise(resolve=>setTimeout(()=>resolve('render timeout'),5000))]));
 console.log(await Promise.race([page.screenshot({path:'tests/diagnostic.png',timeout:5000}).then(()=>'screenshot complete'),new Promise(resolve=>setTimeout(()=>resolve('screenshot timeout'),6000))]));
}finally{await browser.close();}
