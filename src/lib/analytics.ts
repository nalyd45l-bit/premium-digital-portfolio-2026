// Only fixed identifiers are permitted. Never pass form fields, email, phone, salary, or message.
export type AnalyticsEvent='section_view'|'project_open'|'contact_click'|'resume_download'|'offer_submit';
export type AnalyticsParams={section_id?:string;project_id?:string;contact_type?:'email'|'phone'|'telegram'};
type WindowGA=Window&{dataLayer?:unknown[];gtag?:(...args:unknown[])=>void};
const key='portfolio.analytics-consent';
const measurementId=import.meta.env.VITE_GA_MEASUREMENT_ID||'';
export const analyticsConfigured=/^G-[A-Z0-9]+$/.test(measurementId);
let allowed=false,loaded=false;
export function storedConsent():string|null{try{return localStorage.getItem(key)}catch{return null}}
export function analyticsConsent(value:boolean){allowed=value;try{localStorage.setItem(key,value?'granted':'denied')}catch{}if(value&&analyticsConfigured){loadAnalytics();window.dispatchEvent(new Event('portfolio:analytics-enabled'))}else{const w=window as WindowGA;w.gtag?.('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});document.cookie.split(';').forEach(c=>{const name=c.trim().split('=')[0];if(name==='_ga'||name.startsWith('_ga_')){const domains=['',`; domain=${location.hostname}`,`; domain=.${location.hostname}`];for(const domain of domains)document.cookie=`${name}=; Max-Age=0; path=/${domain}`}})}}
function loadAnalytics(){const w=window as WindowGA;if(loaded){w.gtag?.('consent','update',{analytics_storage:'granted'});return}loaded=true;w.dataLayer=w.dataLayer||[];w.gtag=function(){w.dataLayer!.push(arguments)};w.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});w.gtag('js',new Date());w.gtag('config',measurementId,{send_page_view:true,allow_google_signals:false,allow_ad_personalization_signals:false,anonymize_ip:true,cookie_domain:'none',cookie_flags:'SameSite=Lax;Secure',page_location:location.origin+location.pathname,page_referrer:safeReferrer()});const script=document.createElement('script');script.async=true;script.src=`https://www.googletagmanager.com/gtag/js?id=${measurementId}`;document.head.appendChild(script)}
function safeReferrer(){try{return document.referrer?new URL(document.referrer).origin:''}catch{return ''}}
export function track(event:AnalyticsEvent,params:AnalyticsParams={}){if(!allowed||!analyticsConfigured)return;const safe:Record<string,string>={};for(const key of ['section_id','project_id','contact_type'] as const){const value=params[key];if(value&&/^[a-z0-9_-]{1,32}$/.test(value))safe[key]=value}(window as WindowGA).gtag?.('event',event,safe)}
export function initAnalytics(){if(storedConsent()==='granted')analyticsConsent(true)}
