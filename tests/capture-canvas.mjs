import { chromium } from '@playwright/test';
const browser=await chromium.launch({headless:true,args:['--disable-gpu']});
try {
 const page=await browser.newPage({viewport:{width:1280,height:900},deviceScaleFactor:2});
 await page.goto(new URL('browser.html',import.meta.url).href);
 const png=await page.evaluate(()=>{const e=window.cad;e.renderer.fit(e.drawing);e.renderer.render(e.drawing,{selected:new Set(),preview:[],pen:false});return e.canvas.toDataURL('image/png');});
 console.log(png);
}finally{await browser.close();}
