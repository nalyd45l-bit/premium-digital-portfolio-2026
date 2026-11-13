/** Deploy in the owner's private Apps Script project. No data-reading endpoint is exposed. */
function output(value){return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);}
function doGet(){return output({ok:false,error:'method_not_allowed'});}
function validateOffer(data){
 if(!data||typeof data!=='object'||Array.isArray(data))return 'invalid';
 if(data.website||data.consent!==true)return 'invalid';
 if(!/^[a-f0-9-]{36}$/i.test(data.requestId||''))return 'invalid';
 if(!Number.isFinite(data.elapsedMs)||data.elapsedMs<2500||data.elapsedMs>86400000)return 'invalid';
 var limits={company:160,representative:120,position:180,salary:80,email:254,phone:40,message:4000};
 for(var key in limits){if(data[key]!==undefined&&(typeof data[key]!=='string'||data[key].length>limits[key]))return 'invalid';}
 for(var field of ['company','representative','position','email']){if(typeof data[field]!=='string'||!data[field].trim())return 'required';}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))return 'email';
 if(['RUB','USD','EUR','Другая'].indexOf(data.currency)<0)return 'currency';
 if(['Удалённо','Гибрид','В офисе','Обсудим'].indexOf(data.workFormat)<0)return 'format';
 return null;
}
function sheetText(value){var text=String(value||'').trim();return /^[=+@\-\t\r]/.test(text)?"'"+text:text;}
function doPost(event){
 try{
  var body=event&&event.postData&&event.postData.contents;if(!body||body.length>16000)return output({ok:false,error:'invalid'});
  var data=JSON.parse(body);var invalid=validateOffer(data);if(invalid)return output({ok:false,error:invalid});
  var props=PropertiesService.getScriptProperties();var target=props.getProperty('TARGET_SHEET_ID');var secret=props.getProperty('TURNSTILE_SECRET');var host=props.getProperty('ALLOWED_HOSTNAME');
  if(!target||!secret||!host)return output({ok:false,error:'not_configured'});
  var cache=CacheService.getScriptCache();var cacheKey='offer:'+data.requestId;
  if(cache.get(cacheKey)==='saved')return output({ok:true});
  if(typeof data.captchaToken!=='string'||!data.captchaToken||data.captchaToken.length>2048)return output({ok:false,error:'verification'});
  var verification=UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'post',payload:{secret:secret,response:data.captchaToken},muteHttpExceptions:true});
  var verified=JSON.parse(verification.getContentText());if(verified.success!==true||verified.hostname!==host)return output({ok:false,error:'verification'});
  var lock=LockService.getScriptLock();if(!lock.tryLock(10000))return output({ok:false,error:'busy'});
  try{
   if(cache.get(cacheKey)==='saved')return output({ok:true});
   var bucket='rate:'+Math.floor(Date.now()/60000);var count=Number(cache.get(bucket)||0);if(count>=20)return output({ok:false,error:'rate_limited'});
   var sheet=SpreadsheetApp.openById(target).getSheetByName('Предложения');if(!sheet)return output({ok:false,error:'not_configured'});
   var row=[new Date(),sheetText(data.company),sheetText(data.representative),sheetText(data.position),sheetText(data.salary),sheetText(data.currency),sheetText(data.workFormat),sheetText(data.email),sheetText(data.phone),sheetText(data.message),'Новое',data.requestId,'Да'];
   sheet.appendRow(row);cache.put(cacheKey,'saved',21600);cache.put(bucket,String(count+1),120);
  }finally{lock.releaseLock();}
  var email=props.getProperty('NOTIFY_EMAIL');if(email){try{MailApp.sendEmail({to:email,subject:'Новое предложение — портфолио',body:'Получено новое предложение. Откройте личную Google Таблицу: https://docs.google.com/spreadsheets/d/'+target+'/edit'});}catch(notificationError){/* The offer is saved; a notification failure must not cause a duplicate. */}}
  return output({ok:true});
 }catch(error){return output({ok:false,error:'unavailable'});}
}
/** Run once as the owner after configuring properties. Creates a private backup folder and a daily trigger. */
function setupBackups(){
 var props=PropertiesService.getScriptProperties();if(!props.getProperty('TARGET_SHEET_ID'))throw new Error('Configure TARGET_SHEET_ID first');
 if(!props.getProperty('BACKUP_FOLDER_ID'))props.setProperty('BACKUP_FOLDER_ID',DriveApp.createFolder('Portfolio — private offer backups').getId());
 var exists=ScriptApp.getProjectTriggers().some(function(t){return t.getHandlerFunction()==='dailyBackup';});
 if(!exists)ScriptApp.newTrigger('dailyBackup').timeBased().everyDays(1).atHour(3).create();
 dailyBackup();
}
function dailyBackup(){
 var props=PropertiesService.getScriptProperties();var id=props.getProperty('TARGET_SHEET_ID');var folderId=props.getProperty('BACKUP_FOLDER_ID');if(!id||!folderId)throw new Error('Backups are not configured');
 var folder=DriveApp.getFolderById(folderId);DriveApp.getFileById(id).makeCopy('Offers backup '+new Date().toISOString(),folder);
 var cutoff=Date.now()-30*86400000;var files=folder.getFiles();while(files.hasNext()){var file=files.next();if(file.getName().indexOf('Offers backup ')===0&&file.getDateCreated().getTime()<cutoff)file.setTrashed(true);}
}
