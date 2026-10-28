/* Missing content is not a clinical finding. Preserve meaningful source text. */
function sourceText(value){
  if(typeof value!=='string')return '';
  return value.split(/\r?\n/).filter(line=>!/^\s*(?:null|undefined|nan|none|n\/a)\s*$/i.test(line)).join('\n').trim();
}
function joinSourceText(...values){return values.map(sourceText).filter(Boolean).join('\n\n');}
function sourceValue(value,fallback='No informado en la fuente'){return sourceText(value)||fallback;}
function sourceExcerpt(value){return /(?:…|\.\.\.)\s*$/.test(sourceText(value));}
