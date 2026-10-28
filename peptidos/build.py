"""Build a dependency-free, portable training library from the supplied workbook."""
import csv, json, pathlib, re, base64, collections
import openpyxl

ROOT = pathlib.Path(__file__).resolve().parent
SOURCE = ROOT / 'source' / 'Superpower Peptide Library - 152 peptides graded.xlsx'
summaries = dict(line.split('|', 1) for line in (ROOT/'summaries.txt').read_text().splitlines() if '|' in line)
wb = openpyxl.load_workbook(SOURCE, data_only=True)
def records(sheet):
    rows = list(wb[sheet].values)
    return [dict(zip(rows[0], r)) for r in rows[1:] if r[0]]
rows, details, citations = records('Peptides'), records('Full detail'), records('Citations')
audit={'records':len(rows),'restored_from_full_detail':{},'missing_optional_fields':{},'invalid_citation_urls':[]}
def present(value):
    return isinstance(value,str) and value.strip().lower() not in {'','null','undefined','none','nan','n/a'}
def cut(value):
    return present(value) and value.rstrip().endswith(('…','...'))
def source_sections(value):
    return [(m.group(1).strip(),m.group(2).strip()) for m in re.finditer(r'(?:^|\n)title: ([^\n]+)\ntext: (.*?)(?=\ntitle: |\Z)',value or '',re.S)]

assert len(rows) == 152 and len(details) == 152
assert all(r['name'] in summaries for r in rows), [r['name'] for r in rows if r['name'] not in summaries]
area_keys = ['Brain & sleep','Skin & aging','Digestive & weight','Immune & defense','Hormones & metabolism','Bones & muscles','Heart & blood','Sexual & reproductive']
priority = ['Semaglutide','Tirzepatide','Tesamorelin','Sermorelin','GHK-Cu','MOTS-c','BPC-157','TB-500','Retatrutide','Glutathione']
fda2026 = 'https://www.fda.gov/drugs/novel-drug-approvals-fda/novel-drug-approvals-2026'
for i,(r,d) in enumerate(zip(rows,details)):
    assert r['url'] == d['url']
    r.pop('Taken from @MeesesRfriends on X',None)
    r['id'] = d['slug']
    r['area'] = area_keys.index(r['body_area'])
    r['summary_es'] = summaries[r['name']]
    r['priority'] = r['name'] in priority
    r['display_name'] = r['name']
    if i == 26: r['display_name'] += ' · contexto fuera de indicación'
    if i == 138: r['display_name'] += ' · lipodistrofia por VIH'
    if i == 145: r['display_name'] += ' · programas previos'
    if i == 146: r['display_name'] += ' · síndrome de Rett'
    r['status'] = {'FDA-approved':'approved','In clinical trials':'trials','Wellness and performance':'experimental','Cosmetic and topical':'cosmetic'}[r['category']]
    r['correction'] = None
    if i in [46,48,122]:
        r['status'] = 'approved'
        r['correction'] = {'text':'Se corrigió la categoría del Excel, que aún decía «In clinical trials». El estado aprobado corresponde a una indicación y producto específicos.', 'url': fda2026 if i in [48,122] else 'https://www.fda.gov/drugs/drug-trials-snapshots/drug-trials-snapshots-forzinity'}
    r['detail'] = d
    r['source_repairs'] = []
    # Prefer complete same-record content over abbreviated cells; never invent a fact.
    for short_key,full_key in [('mechanism','mechanism'),('side_effects_safety','safety_side_effects'),('fda_status','fda_status'),('human_study_findings','research_findings')]:
        if (not present(r.get(short_key)) or cut(r.get(short_key))) and present(d.get(full_key)) and not cut(d[full_key]):
            r[short_key]=d[full_key]
            r['source_repairs'].append({'field':short_key,'source':'Full detail.'+full_key})
    sections=source_sections(d.get('sections'))
    for key,pattern in [('what_it_is',r'^What (?:is|are) '),('human_study_findings',r'^(?:What does (?:the )?research show|What (?:do|does).*?(?:studies|evidence)|What have.*?studies)')]:
        if not present(r.get(key)):
            found=next((body for title,body in sections if re.search(pattern,title,re.I) and present(body)),None)
            if found:
                r[key]=found
                r['source_repairs'].append({'field':key,'source':'Full detail.sections'})
    # Replace a misleading comparative shorthand with a primary-label summary.
    if r['id']=='abaloparatide':
        r['research_at_a_glance']='In the pivotal placebo-controlled study, abaloparatide reduced vertebral and nonvertebral fractures in postmenopausal women with osteoporosis. This does not establish blanket superiority over teriparatide.'
        r['editorial_note']={'text':'Se sustituyó el resumen comparativo impreciso del archivo por un resumen de los resultados frente a placebo descritos en la ficha FDA. No debe interpretarse como superioridad general frente a teriparatide.','url':'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/208743Orig1s015lbl.pdf'}
    for repair in r['source_repairs']:
        key=repair['field'];audit['restored_from_full_detail'][key]=audit['restored_from_full_detail'].get(key,0)+1
    for key in ['what_it_is','research_at_a_glance','human_study_findings','side_effects_safety']:
        if not present(r.get(key)):
            audit['missing_optional_fields'].setdefault(key,[]).append(r['id'])
    r['citations'] = [{k:c[k] for k in ['n','url','host','ref','context']} for c in citations if c['peptide'] == r['name']]
    # Duplicate source names retain distinct slugs and original clinical contexts.
    r['search_text'] = ' '.join(str(r.get(k) or '') for k in ['display_name','aliases','summary_es','what_it_is','class','body_area','key_takeaway'])
assert len(set(r['id'] for r in rows)) == 152
for r in rows:
    for c in r['citations']:
        if not re.match(r'^https?://[^/\s]+',c.get('url') or ''):audit['invalid_citation_urls'].append({'id':r['id'],'url':c.get('url')})
(ROOT/'qa').mkdir(exist_ok=True)
(ROOT/'qa'/'data-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2))
payload = {'meta': {'title':'Carlos Guzmán · Guía educativa de péptidos','version':'2.3.0','prepared':'2026-10-26','source_file':SOURCE.name,'records':len(rows),'citation_rows':len(citations),'clinical_review':'Pendiente de revisión y aprobación por el farmacéutico responsable'}, 'peptides':rows}
(ROOT/'dist'/'data.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2))
with (ROOT/'dist'/'biblioteca.csv').open('w',newline='',encoding='utf-8-sig') as f:
    writer=csv.DictWriter(f,fieldnames=['id','display_name','summary_es','body_area','status','category','evidence_strength','fda_status','url'])
    writer.writeheader();writer.writerows({k:r.get(k) for k in writer.fieldnames} for r in rows)
asset=ROOT/'assets'/'anatomy-render.webp'
image_src='data:image/webp;base64,'+base64.b64encode(asset.read_bytes()).decode() if asset.exists() else ''
html=(ROOT/'template.html').read_text().replace('__ANATOMY_IMAGE__', image_src).replace('/*__CSS__*/',(ROOT/'styles.css').read_text()+'\n'+(ROOT/'theme.css').read_text()).replace('/*__DATA__*/',json.dumps(payload,ensure_ascii=False).replace('</','<\\/')).replace('/*__JS__*/',(ROOT/'content.js').read_text()+'\n'+(ROOT/'app.js').read_text())
(ROOT/'dist'/'index.html').write_text(html)
print(json.dumps({'records':len(rows),'citation_rows':len(citations),'bytes':len(html.encode()),'missing_summaries':0,'unique_ids':len(set(r['id'] for r in rows))}))
