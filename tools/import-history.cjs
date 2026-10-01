const fs=require('fs'),path=require('path'),H=require('../assets/history-engine.js');
const destination=path.resolve(__dirname,'../data/history/archive.json');
function merge(base,extra){
 if(extra.schema_version!==1)throw Error('Unsupported schema_version; expected 1');
 const output=structuredClone(base),collections=['sources','franchises','seasons','weekly_scores','matchups','championships'];
 for(const c of collections){if(!Array.isArray(extra[c]))throw Error('Missing array '+c);const id=r=>c==='seasons'?r.year:r.id;for(const row of extra[c]){const existing=output[c].find(r=>id(r)===id(row));if(existing){if(c==='franchises'){if(existing.currentName!==row.currentName)throw Error('Canonical name change requires review '+row.id);existing.aliases=[...new Set([...existing.aliases,...row.aliases])];}else if(JSON.stringify(existing)!==JSON.stringify(row))throw Error('Conflicting existing evidence; review required: '+c+' '+id(row));}else output[c].push(row);}}
 const sources=new Set(output.sources.map(s=>s.id));for(const c of ['weekly_scores','matchups','championships'])for(const r of output[c])if(!sources.has(r.source))throw Error('Undefined source '+r.source);
 const data=H.normalize(output);if(data.errors.length)throw Error(data.errors.join('\n'));return output;
}
if(require.main===module){try{const args=process.argv.slice(2),file=args.find(a=>!a.startsWith('--'));if(!file)throw Error('Usage: node tools/import-history.cjs verified-bundle.json [--apply]');const old=JSON.parse(fs.readFileSync(destination)),incoming=JSON.parse(fs.readFileSync(path.resolve(file))),result=merge(old,incoming);console.log(`VALID: ${result.weekly_scores.length} weekly scores; ${result.matchups.length} known matchups; ${result.championships.length} championships.`);if(args.includes('--apply')){const tmp=destination+'.pending';fs.writeFileSync(tmp,JSON.stringify(result,null,2)+'\n');fs.renameSync(tmp,destination);console.log('Archive updated. Existing issue files were untouched. Run npm test before publication.');}else console.log('Dry run only. No data changed. Use --apply to import.');}catch(e){console.error('IMPORT REJECTED:',e.message);process.exitCode=1;}}
module.exports={merge};
