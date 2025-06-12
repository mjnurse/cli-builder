#!/bin/bash

debug_yn=n
if [[ "$1" == "-d" ]]; then
  debug_yn=y
  shift
fi
if [[ "${CLI_DEBUG^^}" == "TRUE" ]]; then
  debug_yn=y
fi

l80="--------------------------------------------------------------------------------"

c_bla="\\\e[30m"
c_blu="\\\e[34m"
c_cya="\\\e[36m"
c_def="\\\e[39m"
c_gra="\\\e[90m"
c_gre="\\\e[32m"
c_mag="\\\e[35m"
c_red="\\\e[31m"
c_whi="\\\e[97m"
c_yel="\\\e[33m"

c_lblu="\\\e[94m"
c_lcya="\\\e[96m"
c_lgra="\\\e[37m"
c_lgre="\\\e[92m"
c_lmag="\\\e[95m"
c_lred="\\\e[91m"
c_lyel="\\\e[93m"


function check_params() {
  # param 1 - actual number of parameters
  # param 2 - required number of parameters
  # param 3 - incorrect parameters message

  if [[ "$1" < "$2" ]]; then
    echo "$3"
    exit
  fi
}

function print_command() {
  # param 1 - command

  if [[ $debug_yn == y ]]; then
    echo "COMMAND: $*" | sed s/./-/g
    echo "COMMAND: $*"
    echo "COMMAND: $*" | sed s/./-/g
  fi
}

ES_AUTH=""
ES_HOST="${ES_HOST:-localhost}"
ES_PORT="${ES_PORT:-9200}"
section="CLUSTER"
if [[ "$1 $2" == "clear cache" || "$1" == "ecc" ]]; then
   if [[ "$1" == "ecc" ]]; then shift; else shift 2; fi
   usage="[95mclear cache [96m(ecc)[0m [<index_name>] "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X POST "http://$ES_HOST:$ES_PORT/$1/_cache/clear"'
   curl -X POST "http://$ES_HOST:$ES_PORT/$1/_cache/clear"
   exit
fi
if [[ "$1 $2" == "cluster overview" || "$1" == "eco" ]]; then
   if [[ "$1" == "eco" ]]; then shift; else shift 2; fi
   usage="[95mcluster overview [96m(eco)[0m "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/"'
   curl -X GET "http://$ES_HOST:$ES_PORT/"
   exit
fi
if [[ "$1 $2" == "cluster health" || "$1" == "ech" ]]; then
   if [[ "$1" == "ech" ]]; then shift; else shift 2; fi
   usage="[95mcluster health [96m(ech)[0m "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_cluster/health?human&pretty"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_cluster/health?human&pretty"
   exit
fi
if [[ "$1 $2" == "cluster stats" || "$1" == "ecs" ]]; then
   if [[ "$1" == "ecs" ]]; then shift; else shift 2; fi
   usage="[95mcluster stats [96m(ecs)[0m "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_cluster/stats?human&pretty"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_cluster/stats?human&pretty"
   exit
fi
section="INDEX INTERROGATION"
if [[ "$1" == "count" || "$1" == "ec" ]]; then
   if [[ "$1" == "ec" ]]; then shift; else shift 1; fi
   usage="[95mcount [96m(ec)[0m <index_name> "
   check_params $# 1 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/$1/_count?pretty"'
   curl -X GET "http://$ES_HOST:$ES_PORT/$1/_count?pretty"
   exit
fi
if [[ "$1 $2" == "list aliases" || "$1" == "ela" ]]; then
   if [[ "$1" == "ela" ]]; then shift; else shift 2; fi
   usage="[95mlist aliases [96m(ela)[0m [<filter>] [<order_by_field_name>] "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_cat/aliases/$1?v&s=$2"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/aliases/$1?v&s=$2"
   exit
fi
if [[ "$1 $2" == "list indices" || "$1" == "eli" ]]; then
   if [[ "$1" == "eli" ]]; then shift; else shift 2; fi
   usage="[95mlist indices [96m(eli)[0m [<index_name>] "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_cat/indices/$1?v&h=health,status,index,pri,rep,sc,docs.count,docs.deleted,store.size,pri.store.size&s=index"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/indices/$1?v&h=health,status,index,pri,rep,sc,docs.count,docs.deleted,store.size,pri.store.size&s=index"
   exit
fi
if [[ "$1 $2" == "list shards" || "$1" == "els" ]]; then
   if [[ "$1" == "els" ]]; then shift; else shift 2; fi
   usage="[95mlist shards [96m(els)[0m [<index_name>] [<order_by_field_name>] "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_cat/shards/$1?v&h=index,shard,prirep,sc,state,docs,store,node&s=index,shard,prirep&s=$2"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/shards/$1?v&h=index,shard,prirep,sc,state,docs,store,node&s=index,shard,prirep&s=$2"
   exit
fi
if [[ "$1 $2 $3" == "list shard details" || "$1" == "elsd" ]]; then
   if [[ "$1" == "elsd" ]]; then shift; else shift 3; fi
   usage="[95mlist shard details [96m(elsd)[0m [<index_name>] [<order_by_field_name>] "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_cat/shards/$1?v&h=index,shard,prirep,state,docs,store,ip,segments.count,unassigned.reason,unassigned.for,node&s=$2"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/shards/$1?v&h=index,shard,prirep,state,docs,store,ip,segments.count,unassigned.reason,unassigned.for,node&s=$2"
   exit
fi
if [[ "$1 $2" == "list segments" || "$1" == "ele" ]]; then
   if [[ "$1" == "ele" ]]; then shift; else shift 2; fi
   usage="[95mlist segments [96m(ele)[0m [<index_name>] "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_cat/segments/$1?v&s=index,shard,prirep"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/segments/$1?v&s=index,shard,prirep"
   exit
fi
if [[ "$1 $2 $3" == "list segmented shards" || "$1" == "elss" ]]; then
   if [[ "$1" == "elss" ]]; then shift; else shift 3; fi
   usage="[95mlist segmented shards [96m(elss)[0m [<index_name>] "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_cat/shards/$1?v&h=index,shard,prirep,state,docs,node,segments.count&s=index,shard,prirep,node"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/shards/$1?v&h=index,shard,prirep,state,docs,node,segments.count&s=index,shard,prirep,node"
   exit
fi
if [[ "$1 $2 $3" == "get index mapping" || "$1" == "egim" ]]; then
   if [[ "$1" == "egim" ]]; then shift; else shift 3; fi
   usage="[95mget index mapping [96m(egim)[0m <index_name> "
   check_params $# 1 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/$1/_mapping?pretty"'
   curl -X GET "http://$ES_HOST:$ES_PORT/$1/_mapping?pretty"
   exit
fi
if [[ "$1 $2 $3" == "list unassigned shards" || "$1" == "elus" ]]; then
   if [[ "$1" == "elus" ]]; then shift; else shift 3; fi
   usage="[95mlist unassigned shards [96m(elus)[0m "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_cat/shards?v&h=index,shard,prirep,state,docs,segments.count&s=index,shard,prirep"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/shards?v&h=index,shard,prirep,state,docs,segments.count&s=index,shard,prirep"
   exit
fi
if [[ "$1 $2" == "forcemerge progress" || "$1" == "efmp" ]]; then
   if [[ "$1" == "efmp" ]]; then shift; else shift 2; fi
   usage="[95mforcemerge progress [96m(efmp)[0m "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_cat/nodes?v&h=name,cpu,load_1m,merges.current,merges.current_docs,merges.total,merges.total_docs&s=name"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/nodes?v&h=name,cpu,load_1m,merges.current,merges.current_docs,merges.total,merges.total_docs&s=name"
   exit
fi
section="INDEX MANIPULATION"
if [[ "$1 $2 $3 $4" == "add index to alias" || "$1" == "eaita" ]]; then
   if [[ "$1" == "eaita" ]]; then shift; else shift 4; fi
   usage="[95madd index to alias [96m(eaita)[0m <index_name> <alias_name> "
   check_params $# 2 "Usage: $usage"
   print_command 'curl -X POST "http://$ES_HOST:$ES_PORT/_aliases" -H 'Content-Type: application/json' -d '{"actions":[{"add":{"index":"'$1'","alias":"'$2'"}}]}''
   curl -X POST "http://$ES_HOST:$ES_PORT/_aliases" -H 'Content-Type: application/json' -d '{"actions":[{"add":{"index":"'$1'","alias":"'$2'"}}]}'
   exit
fi
if [[ "$1 $2 $3 $4" == "remove index from alias" || "$1" == "erifa" ]]; then
   if [[ "$1" == "erifa" ]]; then shift; else shift 4; fi
   usage="[95mremove index from alias [96m(erifa)[0m <index_name> <alias_name> "
   check_params $# 2 "Usage: $usage"
   print_command 'read -p "Are you sure [yN]? " yn; if [[ ${yn^} == Y ]]; then curl -X DELETE "http://$ES_HOST:$ES_PORT/$1/_aliases/$2"; fi'
   read -p "Are you sure [yN]? " yn; if [[ ${yn^} == Y ]]; then curl -X DELETE "http://$ES_HOST:$ES_PORT/$1/_aliases/$2"; fi
   exit
fi
if [[ "$1 $2" == "create index" || "$1" == "eci" ]]; then
   if [[ "$1" == "eci" ]]; then shift; else shift 2; fi
   usage="[95mcreate index [96m(eci)[0m <index_name> <number_of_shards> <number_of_replicas> "
   check_params $# 3 "Usage: $usage"
   print_command 'curl -X PUT "http://$ES_HOST:$ES_PORT/$1" -H 'Content-Type: application/json' -d '{"settings":{"index":{"number_of_shards":'$2',"number_of_replicas":'$3'}}}''
   curl -X PUT "http://$ES_HOST:$ES_PORT/$1" -H 'Content-Type: application/json' -d '{"settings":{"index":{"number_of_shards":'$2',"number_of_replicas":'$3'}}}'
   exit
fi
if [[ "$1 $2 $3 $4" == "create index from mapping" || "$1" == "ecifm" ]]; then
   if [[ "$1" == "ecifm" ]]; then shift; else shift 4; fi
   usage="[95mcreate index from mapping [96m(ecifm)[0m <index_name> <number_of_shards> <number_of_replicas> <mapping-json> "
   check_params $# 4 "Usage: $usage"
   print_command 'curl -X PUT "http://$ES_HOST:$ES_PORT/$1" -H 'Content-Type: application/json' -d '{"settings":{"index":{"number_of_shards":'$2',"number_of_replicas":'$3'}},"mappings":'$4'}''
   curl -X PUT "http://$ES_HOST:$ES_PORT/$1" -H 'Content-Type: application/json' -d '{"settings":{"index":{"number_of_shards":'$2',"number_of_replicas":'$3'}},"mappings":'$4'}'
   exit
fi
if [[ "$1 $2" == "clone index" || "$1" == "eclni" ]]; then
   if [[ "$1" == "eclni" ]]; then shift; else shift 2; fi
   usage="[95mclone index [96m(eclni)[0m <index_name> <new_index_name> "
   check_params $# 2 "Usage: $usage"
   print_command 'curl -X POST "http://$ES_HOST:$ES_PORT/$1/_clone/$2"'
   curl -X POST "http://$ES_HOST:$ES_PORT/$1/_clone/$2"
   exit
fi
if [[ "$1 $2" == "delete index" || "$1" == "edi" ]]; then
   if [[ "$1" == "edi" ]]; then shift; else shift 2; fi
   usage="[95mdelete index [96m(edi)[0m <index_name> "
   check_params $# 1 "Usage: $usage"
   print_command 'read -p "Are you sure [yN]? " yn; if [[ ${yn^} == Y ]]; then curl -X DELETE "http://$ES_HOST:$ES_PORT/$1"; fi'
   read -p "Are you sure [yN]? " yn; if [[ ${yn^} == Y ]]; then curl -X DELETE "http://$ES_HOST:$ES_PORT/$1"; fi
   exit
fi
if [[ "$1 $2" == "open index" || "$1" == "eopi" ]]; then
   if [[ "$1" == "eopi" ]]; then shift; else shift 2; fi
   usage="[95mopen index [96m(eopi)[0m <index_name> "
   check_params $# 1 "Usage: $usage"
   print_command 'curl -X POST "http://$ES_HOST:$ES_PORT/$1/_open"'
   curl -X POST "http://$ES_HOST:$ES_PORT/$1/_open"
   exit
fi
if [[ "$1 $2" == "close index" || "$1" == "ecli" ]]; then
   if [[ "$1" == "ecli" ]]; then shift; else shift 2; fi
   usage="[95mclose index [96m(ecli)[0m <index_name> "
   check_params $# 1 "Usage: $usage"
   print_command 'curl -X POST "http://$ES_HOST:$ES_PORT/$1/_close"'
   curl -X POST "http://$ES_HOST:$ES_PORT/$1/_close"
   exit
fi
if [[ "$1 $2 $3" == "enable read only" || "$1" == "eero" ]]; then
   if [[ "$1" == "eero" ]]; then shift; else shift 3; fi
   usage="[95menable read only [96m(eero)[0m <index_name> "
   check_params $# 1 "Usage: $usage"
   print_command 'curl -X PUT "http://$ES_HOST:$ES_PORT/$1/_settings" -H 'Content-Type: application/json' -d '{"index.blocks.write": true}''
   curl -X PUT "http://$ES_HOST:$ES_PORT/$1/_settings" -H 'Content-Type: application/json' -d '{"index.blocks.write": true}'
   exit
fi
if [[ "$1 $2 $3" == "enable read write" || "$1" == "eerw" ]]; then
   if [[ "$1" == "eerw" ]]; then shift; else shift 3; fi
   usage="[95menable read write [96m(eerw)[0m <index_name> "
   check_params $# 1 "Usage: $usage"
   print_command 'curl -X PUT "http://$ES_HOST:$ES_PORT/$1/_settings" -H 'Content-Type: application/json' -d '{"index.blocks.write": false}''
   curl -X PUT "http://$ES_HOST:$ES_PORT/$1/_settings" -H 'Content-Type: application/json' -d '{"index.blocks.write": false}'
   exit
fi
if [[ "$1 $2" == "reindex index" || "$1" == "eri" ]]; then
   if [[ "$1" == "eri" ]]; then shift; else shift 2; fi
   usage="[95mreindex index [96m(eri)[0m <source_index_name> <dest_index_name> "
   check_params $# 2 "Usage: $usage"
   print_command 'curl -X POST "http://$ES_HOST:$ES_PORT/_reindex" -H 'Content-Type: application/json' -d '{"source":{"index":"'$1'"},"dest":{"index":"'$2'"}}''
   curl -X POST "http://$ES_HOST:$ES_PORT/_reindex" -H 'Content-Type: application/json' -d '{"source":{"index":"'$1'"},"dest":{"index":"'$2'"}}'
   exit
fi
if [[ "$1 $2" == "move shard" || "$1" == "ems" ]]; then
   if [[ "$1" == "ems" ]]; then shift; else shift 2; fi
   usage="[95mmove shard [96m(ems)[0m <index_name> <shard_num> <from_node_name> <to_node_name> "
   check_params $# 4 "Usage: $usage"
   print_command 'curl -X POST "http://$ES_HOST:$ES_PORT/_cluster/reroute" -H 'Content-Type: application/json' -d '{"commands":[{"move":{"index":"'$1'","shard":'$2',"from_node":"'$3'","to_node":"'$4'"}}]}''
   curl -X POST "http://$ES_HOST:$ES_PORT/_cluster/reroute" -H 'Content-Type: application/json' -d '{"commands":[{"move":{"index":"'$1'","shard":'$2',"from_node":"'$3'","to_node":"'$4'"}}]}'
   exit
fi
if [[ "$1 $2 $3" == "alter number replicas" || "$1" == "eanr" ]]; then
   if [[ "$1" == "eanr" ]]; then shift; else shift 3; fi
   usage="[95malter number replicas [96m(eanr)[0m <index_name> <number_of_replicas> "
   check_params $# 2 "Usage: $usage"
   print_command 'curl -X PUT "http://$ES_HOST:$ES_PORT/$1/_settings" -H 'Content-Type: application/json' -d '{"index":{"number_of_replicas":'$2'}}''
   curl -X PUT "http://$ES_HOST:$ES_PORT/$1/_settings" -H 'Content-Type: application/json' -d '{"index":{"number_of_replicas":'$2'}}'
   exit
fi
if [[ "$1 $2 $3" == "disable shard allocation" || "$1" == "edsa" ]]; then
   if [[ "$1" == "edsa" ]]; then shift; else shift 3; fi
   usage="[95mdisable shard allocation [96m(edsa)[0m "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X PUT "http://$ES_HOST:$ES_PORT/_cluster/settings" -H 'Content-Type: application/json' -d '{"persistent":{"cluster.routing.allocation.enable":"primaries"}}''
   curl -X PUT "http://$ES_HOST:$ES_PORT/_cluster/settings" -H 'Content-Type: application/json' -d '{"persistent":{"cluster.routing.allocation.enable":"primaries"}}'
   exit
fi
if [[ "$1 $2 $3" == "reenable shard allocation" || "$1" == "ersa" ]]; then
   if [[ "$1" == "ersa" ]]; then shift; else shift 3; fi
   usage="[95mreenable shard allocation [96m(ersa)[0m "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X PUT "http://$ES_HOST:$ES_PORT/_cluster/settings" -H 'Content-Type: application/json' -d '{"persistent":{"cluster.routing.allocation.enable":null}}''
   curl -X PUT "http://$ES_HOST:$ES_PORT/_cluster/settings" -H 'Content-Type: application/json' -d '{"persistent":{"cluster.routing.allocation.enable":null}}'
   exit
fi
if [[ "$1" == "forcemerge" || "$1" == "efm" ]]; then
   if [[ "$1" == "efm" ]]; then shift; else shift 1; fi
   usage="[95mforcemerge [96m(efm)[0m <index_name> <max_num_segments> "
   check_params $# 2 "Usage: $usage"
   print_command 'curl -X POST "http://$ES_HOST:$ES_PORT/$1/_forcemerge?max_num_segments=$2"'
   curl -X POST "http://$ES_HOST:$ES_PORT/$1/_forcemerge?max_num_segments=$2"
   exit
fi
if [[ "$1" == "refresh" || "$1" == "er" ]]; then
   if [[ "$1" == "er" ]]; then shift; else shift 1; fi
   usage="[95mrefresh [96m(er)[0m <index_name> "
   check_params $# 1 "Usage: $usage"
   print_command 'curl -X POST "http://$ES_HOST:$ES_PORT/$1/_refresh"'
   curl -X POST "http://$ES_HOST:$ES_PORT/$1/_refresh"
   exit
fi
section="INDEX ENTRY MANIPULATION"
if [[ "$1 $2" == "add entry" || "$1" == "eae" ]]; then
   if [[ "$1" == "eae" ]]; then shift; else shift 2; fi
   usage="[95madd entry [96m(eae)[0m <index_name> <entry_json> "
   check_params $# 2 "Usage: $usage"
   print_command 'curl -X POST "http://$ES_HOST:$ES_PORT/$1/_doc" -H 'Content-Type: application/json' -d "$2"'
   curl -X POST "http://$ES_HOST:$ES_PORT/$1/_doc" -H 'Content-Type: application/json' -d "$2"
   exit
fi
section="NODES"
if [[ "$1 $2" == "list nodes" || "$1" == "eln" ]]; then
   if [[ "$1" == "eln" ]]; then shift; else shift 2; fi
   usage="[95mlist nodes [96m(eln)[0m "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_cat/nodes?v&h=name,ip,nodeRole,m,heapPercent,ramPercent,cpu,load_1m,load_5m,load_15m,disk.total,disk.used_percent&s=name"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/nodes?v&h=name,ip,nodeRole,m,heapPercent,ramPercent,cpu,load_1m,load_5m,load_15m,disk.total,disk.used_percent&s=name"
   exit
fi
if [[ "$1 $2 $3" == "list nodes queries" || "$1" == "elnq" ]]; then
   if [[ "$1" == "elnq" ]]; then shift; else shift 3; fi
   usage="[95mlist nodes queries [96m(elnq)[0m "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_cat/nodes?v&h=name,nodeRole,search,queryTotal,searchFetchTotal,requestCacheHitCount&s=name"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/nodes?v&h=name,nodeRole,search,queryTotal,searchFetchTotal,requestCacheHitCount&s=name"
   exit
fi
if [[ "$1 $2" == "search nodes" || "$1" == "esn" ]]; then
   if [[ "$1" == "esn" ]]; then shift; else shift 2; fi
   usage="[95msearch nodes [96m(esn)[0m "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_nodes"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_nodes"
   exit
fi
if [[ "$1 $2 $3" == "node active threads" || "$1" == "eat" ]]; then
   if [[ "$1" == "eat" ]]; then shift; else shift 3; fi
   usage="[95mnode active threads [96m(eat)[0m "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_cat/thread_pool?v&s=node_name,name"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/thread_pool?v&s=node_name,name"
   exit
fi
section="SEARCH"
if [[ "$1" == "search" || "$1" == "es" ]]; then
   if [[ "$1" == "es" ]]; then shift; else shift 1; fi
   usage="[95msearch [96m(es)[0m <index_name> <search_term> "
   check_params $# 2 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/$1/_search?q=$2&pretty"'
   curl -X GET "http://$ES_HOST:$ES_PORT/$1/_search?q=$2&pretty"
   exit
fi
if [[ "$1 $2" == "search json" || "$1" == "esj" ]]; then
   if [[ "$1" == "esj" ]]; then shift; else shift 2; fi
   usage="[95msearch json [96m(esj)[0m <index_name> <search_json> "
   check_params $# 2 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/$1/_search?pretty" -H 'Content-Type: application/json' -d "$2"'
   curl -X GET "http://$ES_HOST:$ES_PORT/$1/_search?pretty" -H 'Content-Type: application/json' -d "$2"
   exit
fi
if [[ "$1 $2" == "search match" || "$1" == "esm" ]]; then
   if [[ "$1" == "esm" ]]; then shift; else shift 2; fi
   usage="[95msearch match [96m(esm)[0m <index_name> <field_name> <value> "
   check_params $# 3 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/$1/_search?pretty" -H 'Content-Type: application/json' -d '{"query": { "match": { "'$2'": "'$3'" } } }''
   curl -X GET "http://$ES_HOST:$ES_PORT/$1/_search?pretty" -H 'Content-Type: application/json' -d '{"query": { "match": { "'$2'": "'$3'" } } }'
   exit
fi
if [[ "$1 $2" == "search term" || "$1" == "est" ]]; then
   if [[ "$1" == "est" ]]; then shift; else shift 2; fi
   usage="[95msearch term [96m(est)[0m <index_name> <field_name> <value> "
   check_params $# 3 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/$1/_search?pretty" -H 'Content-Type: application/json' -d '{"query": { "term": { "'$2'": "'$3'" } } }''
   curl -X GET "http://$ES_HOST:$ES_PORT/$1/_search?pretty" -H 'Content-Type: application/json' -d '{"query": { "term": { "'$2'": "'$3'" } } }'
   exit
fi
if [[ "$1 $2" == "search summary" || "$1" == "ess" ]]; then
   if [[ "$1" == "ess" ]]; then shift; else shift 2; fi
   usage="[95msearch summary [96m(ess)[0m <index_name> <search_term> "
   check_params $# 2 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/$1/_search?size=0&pretty" -H 'Content-Type: application/json' -d '{"aggs": {"count": {"terms": { "field" : "'$2'", "size" : 100 } } } }''
   curl -X GET "http://$ES_HOST:$ES_PORT/$1/_search?size=0&pretty" -H 'Content-Type: application/json' -d '{"aggs": {"count": {"terms": { "field" : "'$2'", "size" : 100 } } } }'
   exit
fi
section="TASKS"
if [[ "$1 $2" == "list tasks" || "$1" == "elt" ]]; then
   if [[ "$1" == "elt" ]]; then shift; else shift 2; fi
   usage="[95mlist tasks [96m(elt)[0m [<sort_field>] "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_cat/tasks?v&h=action,type,start_time,timestamp,running_time,node&s=$1"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/tasks?v&h=action,type,start_time,timestamp,running_time,node&s=$1"
   exit
fi
if [[ "$1 $2 $3" == "list tasks detail" || "$1" == "eltd" ]]; then
   if [[ "$1" == "eltd" ]]; then shift; else shift 3; fi
   usage="[95mlist tasks detail [96m(eltd)[0m [<sort_field>] "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_cat/tasks?v&s=$1"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/tasks?v&s=$1"
   exit
fi
section="REPOS / SNAPSHOTS"
if [[ "$1 $2" == "add repo" || "$1" == "eare" ]]; then
   if [[ "$1" == "eare" ]]; then shift; else shift 2; fi
   usage="[95madd repo [96m(eare)[0m <repo_name> "
   check_params $# 1 "Usage: $usage"
   print_command 'curl -X PUT "http://$ES_HOST:$ES_PORT/_snapshot/$1?pretty" -H 'Content-Type: application/json' -d '{ "type": "fs", "settings": { "location": "'$1'" } } ''
   curl -X PUT "http://$ES_HOST:$ES_PORT/_snapshot/$1?pretty" -H 'Content-Type: application/json' -d '{ "type": "fs", "settings": { "location": "'$1'" } } '
   exit
fi
if [[ "$1 $2" == "delete repo" || "$1" == "edre" ]]; then
   if [[ "$1" == "edre" ]]; then shift; else shift 2; fi
   usage="[95mdelete repo [96m(edre)[0m <repo_name> "
   check_params $# 1 "Usage: $usage"
   print_command 'read -p "Are you sure [yN]? " yn; if [[ ${yn^} == Y ]]; then curl -X DELETE "http://$ES_HOST:$ES_PORT/_snapshot/$1?pretty"; fi'
   read -p "Are you sure [yN]? " yn; if [[ ${yn^} == Y ]]; then curl -X DELETE "http://$ES_HOST:$ES_PORT/_snapshot/$1?pretty"; fi
   exit
fi
if [[ "$1 $2" == "list repos" || "$1" == "elre" ]]; then
   if [[ "$1" == "elre" ]]; then shift; else shift 2; fi
   usage="[95mlist repos [96m(elre)[0m "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_cat/repositories?v"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/repositories?v"
   exit
fi
if [[ "$1 $2" == "create snapshot" || "$1" == "ecsn" ]]; then
   if [[ "$1" == "ecsn" ]]; then shift; else shift 2; fi
   usage="[95mcreate snapshot [96m(ecsn)[0m <repo_name> <snapshot_name> "
   check_params $# 2 "Usage: $usage"
   print_command 'curl -X PUT "http://$ES_HOST:$ES_PORT/_snapshot/$1/$2?pretty"'
   curl -X PUT "http://$ES_HOST:$ES_PORT/_snapshot/$1/$2?pretty"
   exit
fi
if [[ "$1 $2" == "delete snapshot" || "$1" == "edsn" ]]; then
   if [[ "$1" == "edsn" ]]; then shift; else shift 2; fi
   usage="[95mdelete snapshot [96m(edsn)[0m <repo_name> <snapshot_name> "
   check_params $# 2 "Usage: $usage"
   print_command 'read -p "Are you sure [yN]? " yn; if [[ ${yn^} == Y ]]; then curl -X DELETE "http://$ES_HOST:$ES_PORT/_snapshot/$1/$2?pretty"; fi'
   read -p "Are you sure [yN]? " yn; if [[ ${yn^} == Y ]]; then curl -X DELETE "http://$ES_HOST:$ES_PORT/_snapshot/$1/$2?pretty"; fi
   exit
fi
if [[ "$1 $2" == "list snapshots" || "$1" == "elsn" ]]; then
   if [[ "$1" == "elsn" ]]; then shift; else shift 2; fi
   usage="[95mlist snapshots [96m(elsn)[0m "
   check_params $# 0 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_cat/snapshots?v"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/snapshots?v"
   exit
fi
if [[ "$1 $2" == "snapshot details" || "$1" == "esnd" ]]; then
   if [[ "$1" == "esnd" ]]; then shift; else shift 2; fi
   usage="[95msnapshot details [96m(esnd)[0m <repo_name> <snapshot_name> "
   check_params $# 2 "Usage: $usage"
   print_command 'curl -X GET "http://$ES_HOST:$ES_PORT/_snapshot/$1/$2?pretty"'
   curl -X GET "http://$ES_HOST:$ES_PORT/_snapshot/$1/$2?pretty"
   exit
fi
if [[ "$1 $2" == "restore snaphot" || "$1" == "ersn" ]]; then
   if [[ "$1" == "ersn" ]]; then shift; else shift 2; fi
   usage="[95mrestore snaphot [96m(ersn)[0m <repo_name> <snapshot_name> "
   check_params $# 2 "Usage: $usage"
   print_command 'curl -X POST "http://$ES_HOST:$ES_PORT/_snapshot/$1/$2/_restore?pretty"'
   curl -X POST "http://$ES_HOST:$ES_PORT/_snapshot/$1/$2/_restore?pretty"
   exit
fi
section="GENERIC"
if [[ "$1" == "generic" || "$1" == "eg" ]]; then
   if [[ "$1" == "eg" ]]; then shift; else shift 1; fi
   usage="[95mgeneric [96m(eg)[0m <type-GET/POST/PUT> <api_call> "
   check_params $# 2 "Usage: $usage"
   print_command 'curl -X $1 "http://$ES_HOST:$ES_PORT/$2"'
   curl -X $1 "http://$ES_HOST:$ES_PORT/$2"
   exit
fi
if [[ "$1 $2" == "query-es settings" || "$1" == "eqes" ]]; then
   if [[ "$1" == "eqes" ]]; then shift; else shift 2; fi
   usage="[95mquery-es settings [96m(eqes)[0m "
   check_params $# 0 "Usage: $usage"
   print_command 'query-es -s'
   query-es -s
   exit
fi
section="HELP"
if [[ "$1" == "help" || "$1" == "ehe" ]]; then
   if [[ "$1" == "ehe" ]]; then shift; else shift 1; fi
   usage="[95mhelp [96m(ehe)[0m "
   check_params $# 0 "Usage: $usage"
   egrep "usage=|section=" "$0" | grep -v "grep" | sed "s/.*usage=/ /; s/.*section=/\x1b[92m/; s/\"//g"
   exit
fi

if [[ "$1" == "" ]]; then
  echo "No option passed"
else
  echo "$*: invalid option"
fi
echo "Try \"es help\" for more information."

