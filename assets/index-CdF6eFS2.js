(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function c(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=c(n);fetch(n.href,o)}})();const a=document.getElementById("checkbox-count-input"),m=document.getElementById("category-form"),p=document.getElementById("selected"),g=document.getElementById("checkboxes"),C=5,d=100,f=0;function l(t){const e=new URL(window.location);e.searchParams.set("categories",t.join(","));const c=a.value;e.searchParams.set("count",c||t.length),window.history.pushState({},"",e)}function u(t){p.textContent=t.join(", ")}function y(){const t=new URLSearchParams(window.location.search),e=t.get("categories"),c=t.get("count");return{categories:e?e.split(","):[],count:c?parseInt(c,10):C}}let r=[];function b(t){let e=t.target.value;e<f?t.target.value=f:e>d&&(t.target.value=d),l(r)}function E(t){t.preventDefault();const e=a.value;h(e)}function v(t){const e=t.target.value;t.target.checked?r.includes(e)||r.push(e):r=r.filter(c=>c!==e),l(r),u(r)}function h(t,e=!0){const c=g;c.innerHTML="",e&&(r=[]),l(r),u(r);for(let s=1;s<=t;s++){const n=document.createElement("input");n.type="checkbox",n.id=`cat${s}`,n.value=s,n.checked=r.includes(n.value),n.addEventListener("change",v);const o=document.createElement("label");o.htmlFor=`cat${s}`,o.textContent=`Категория ${s}`;const i=document.createElement("br");c.appendChild(n),c.appendChild(o),c.appendChild(i)}}function L(){const{categories:t,count:e}=y();a.value=e,t.length&&(r=t),h(e,!1),t.length&&u(r)}a.addEventListener("input",b);m.addEventListener("submit",E);L();
