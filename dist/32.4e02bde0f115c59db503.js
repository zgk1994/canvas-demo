(window.webpackJsonp=window.webpackJsonp||[]).push([[32,6],{"0Pcb":function(t,e,i){"use strict";const a=function(){const t=window.navigator.userAgent;return window.location.href,function(t){const e={},i=t.indexOf("iPhone")>=0||t.indexOf("iPad")>=0||t.indexOf("iPod")>=0,a=t.indexOf("Android")>0;return e.ios=i,e.android=a,e.mobile=i||a,e.pc=!i&&!a,e}(t)}();e.a=a},Qb4n:function(t,e,i){"use strict";var a=i("kZAv");e.a=class{constructor(){this.el=document.createElement("canvas")}initCanvasSize(t,e){this.el.width=t,this.el.height=e,this.width=t,this.height=e}getContext(t,e){return this.el.getContext(t,e)}render(t){this.container=t;let{width:e,height:i}=t.getBoundingClientRect();this.initCanvasSize(e||a.d,i||a.b),this.container.innerHTML="",this.container.appendChild(this.el)}}},"bxh+":function(t,e,i){"use strict";i.r(e);var a=i("Qb4n"),n=i("kZAv"),s=i("0Pcb");e.default=class extends a.a{constructor(){super(),this.ctx=this.getContext("2d"),this.fps=0,this.lastFrameTime=0,this.lastDrawFps=0,this.lastDrawFpsTime=0,this.animateOutAngle=0,this.animateInnerAngle=0,this.arrowCount=6,this.arrowLength=10,this.canShowOutArrow=!1,this.canShowInnerArrow=!1,this.canShowLineArrow=!1,this.animateEnd=!0,this.animateStart=!1}drawText(){let{ctx:t,width:e,height:i}=this;t.save(),t.font=n.a,t.textBaseline="middle",t.fillStyle="rgba(100,140,230,1)";let a=t.measureText("非零环绕法则").width;t.translate(e/2,i/2),t.fillText("非零环绕法则",-a/2,0),t.restore()}drawRule(){let{canShowOutArrow:t,canShowInnerArrow:e,canShowLineArrow:i,fps:a,width:n}=this;t&&(a&&this.animateOutAngle<2*Math.PI&&(this.animateOutAngle+=2*Math.PI/a),this.animateOutAngle=Math.min(2*Math.PI,this.animateOutAngle),this.animateOutAngle===2*Math.PI&&(this.canShowInnerArrow=!0),this.drawOutArrow()),e&&(a&&this.animateInnerAngle<2*Math.PI&&(this.animateInnerAngle+=2*Math.PI/a),this.animateInnerAngle=Math.min(2*Math.PI,this.animateInnerAngle),this.animateInnerAngle===2*Math.PI&&(this.canShowLineArrow=!0),this.drawInnerArrow()),i&&(this.drawLineArrow(),this.animateEnd=!0)}drawOutArrow(){let t=Math.PI/4,{ctx:e,width:i,height:a,outRadius:n,arrowLength:s,arrowCount:r,animateOutAngle:h}=this;e.save(),e.translate(i/2,a/2),e.strokeStyle="red",e.beginPath(),e.arc(0,0,n,0,h,!1);for(let i=1;i<=r;i++)e.rotate(2*Math.PI/r),e.moveTo(n,0),e.lineTo(n-s*Math.cos(t),-s*Math.sin(t)),e.moveTo(n,0),e.lineTo(n+s*Math.cos(t),-s*Math.sin(t));e.stroke(),e.restore()}drawInnerArrow(){let t=Math.PI/4,{ctx:e,width:i,height:a,innerRadius:n,arrowLength:s,arrowCount:r,animateInnerAngle:h}=this;e.save(),e.translate(i/2,a/2),e.rotate(Math.PI/2),e.strokeStyle="#CD00CD",e.beginPath(),e.arc(0,0,n,0,-h,!0);for(let i=1;i<=r;i++)e.rotate(2*Math.PI/r),e.moveTo(n,0),e.lineTo(n-s*Math.cos(t),s*Math.sin(t)),e.moveTo(n,0),e.lineTo(n+s*Math.cos(t),s*Math.sin(t));e.stroke(),e.restore()}drawLineArrow(){let t=Math.PI/4,{ctx:e,width:i,height:a,outRadius:n,arrowLength:r}=this,h=n+(s.a.pc?60:30);e.save(),e.translate(i/2,a/2),e.strokeStyle="green",e.rotate(-Math.PI/4),e.beginPath(),e.moveTo(0,0),e.lineTo(h,0),e.lineTo(h-r*Math.cos(t),-r*Math.sin(t)),e.moveTo(h,0),e.lineTo(h-r*Math.cos(t),r*Math.sin(t)),e.stroke(),e.restore()}drawCircle(){let{ctx:t,width:e,height:i,outRadius:a,innerRadius:n}=this;t.save(),t.fillStyle="rgba(100,140,230,0.5)",t.strokeStyle="rgba(100,140,230,1)",t.translate(e/2,i/2),t.beginPath(),t.arc(0,0,a,0,2*Math.PI,!1),t.moveTo(n,0),t.arc(0,0,n,0,2*Math.PI,!0),t.shadowColor="rgba(0,0,0,0.8)",t.shadowOffsetX=.2*(a-n),t.shadowOffsetY=t.shadowOffsetX,t.shadowBlur=.3*(a-n),t.fill(),t.shadowColor=void 0,t.shadowOffsetX=0,t.shadowOffsetY=0,t.shadowBlur=0,t.stroke(),t.restore()}drawFps(){let{ctx:t,width:e,height:i,fps:a,lastDrawFps:s,lastDrawFpsTime:r}=this,h=Date.now();h-r>=100&&(this.lastDrawFps=a,this.lastDrawFpsTime=h),t.save(),t.font=n.a;let o=t.measureText("M").width;t.fillText("FPS："+s,10,o+10),t.restore()}drawAnimateRule(){this.animateStart=!0,this.animateEnd=!1,window.requestAnimationFrame(this.draw.bind(this))}draw(t){let{ctx:e,width:i,height:a}=this;e.clearRect(0,0,i,a),this.drawCircle(),this.drawText(),this.drawFps(),this.animateStart&&(this.computeFps(t),this.canShowOutArrow=!0,this.drawRule(),this.animateEnd||window.requestAnimationFrame(this.draw.bind(this)))}computeFps(t){let{lastFrameTime:e}=this;e&&t&&(this.fps=Math.floor(1e3/(t-e))),this.lastFrameTime=t}render(t){super.render(t);let{ctx:e,width:i,height:a}=this,n=Math.min(i,a);this.outRadius=.8*n/2,this.innerRadius=.6*this.outRadius,this.draw(performance.now()),setTimeout(this.drawAnimateRule.bind(this),300)}}},kZAv:function(t,e,i){"use strict";i.d(e,"d",function(){return a}),i.d(e,"b",function(){return n}),i.d(e,"a",function(){return s}),i.d(e,"c",function(){return r});const a=500,n=500,s=`${i("0Pcb").a.pc?24:16}px sans-serif`,r="https://snayan.github.io/canvas-demo/"}}]);