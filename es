#!/bin/bash

debug_yn=n
if [[ "$1" == "-d" ]]; then
   debug_yn=y
   shift
fi


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

section="CLUSTER"
if [[ "$1 $2" == "clear cache" || "$1" == "cc" ]]; then
   if [[ "$1" == "cc" ]]; then shift; else shift 2; fi
   usage="clear cache (cc) [<index_name>]"
   check_params $# 0 "Usage: $usage"
   print_command query-es -o POST -a "$1/_cache/clear"
   query-es -o POST -a "$1/_cache/clear"
   exit
fi
if [[ "$1 $2" == "cluster stats" || "$1" == "cs" ]]; then
   if [[ "$1" == "cs" ]]; then shift; else shift 2; fi
   usage="cluster stats (cs)"
   check_params $# 0 "Usage: $usage"
   print_command query-es -o GET -a "_cluster/stats?human"             -f 's/.*\("cluster_name":"[^"]*"\).*\("query_cache":{[^}]*}\).*\("mem":{[^}]*}\).*/\1\n   \2\n   \3\n/'
   query-es -o GET -a "_cluster/stats?human"             -f 's/.*\("cluster_name":"[^"]*"\).*\("query_cache":{[^}]*}\).*\("mem":{[^}]*}\).*/\1\n   \2\n   \3\n/'
   exit
fi
section="INDEX INTERROGATION "
if [[ "$1 $2" == "list aliases" || "$1" == "la" ]]; then
   if [[ "$1" == "la" ]]; then shift; else shift 2; fi
   usage="list aliases (la) [<filter>] [<order_by_field_name>]"
   check_params $# 0 "Usage: $usage"
   print_command query-es -o GET -a "_cat/aliases?v&s=$2" -r 1 -f '1p;t; s/\(.*'$1'.*$\)/\1/;t;d'
   query-es -o GET -a "_cat/aliases?v&s=$2" -r 1 -f '1p;t; s/\(.*'$1'.*$\)/\1/;t;d'
   exit
fi
if [[ "$1 $2" == "list indices" || "$1" == "li" ]]; then
   if [[ "$1" == "li" ]]; then shift; else shift 2; fi
   usage="list indices (li) [<index_name>]"
   check_params $# 0 "Usage: $usage"
   print_command query-es -o GET -a "_cat/indices/$1?v&h=health,status,index,pri,rep,docs.count,docs.deleted,store.size,pri.store.size&s=index" -r 1
   query-es -o GET -a "_cat/indices/$1?v&h=health,status,index,pri,rep,docs.count,docs.deleted,store.size,pri.store.size&s=index" -r 1
   exit
fi
if [[ "$1 $2" == "list shards" || "$1" == "ls" ]]; then
   if [[ "$1" == "ls" ]]; then shift; else shift 2; fi
   usage="list shards (ls) [<index_name>]"
   check_params $# 0 "Usage: $usage"
   print_command query-es -o GET -a "_cat/shards/$1?v&h=index,shard,prirep,state,docs,store,node&s=index,shard,prirep" -r 1
   query-es -o GET -a "_cat/shards/$1?v&h=index,shard,prirep,state,docs,store,node&s=index,shard,prirep" -r 1
   exit
fi
if [[ "$1 $2 $3" == "list shard details" || "$1" == "lsd" ]]; then
   if [[ "$1" == "lsd" ]]; then shift; else shift 3; fi
   usage="list shard details (lsd) [<index_name>] [<order_by_field_name>]"
   check_params $# 0 "Usage: $usage"
   print_command query-es -o GET -a "_cat/shards/$1?v&h=index,shard,prirep,state,docs,store,ip,segments.count,unassigned.reason,unassigned.for,node&s=$2"
   query-es -o GET -a "_cat/shards/$1?v&h=index,shard,prirep,state,docs,store,ip,segments.count,unassigned.reason,unassigned.for,node&s=$2"
   exit
fi
if [[ "$1 $2" == "list segments" || "$1" == "le" ]]; then
   if [[ "$1" == "le" ]]; then shift; else shift 2; fi
   usage="list segments (le) [<index_name>]"
   check_params $# 0 "Usage: $usage"
   print_command query-es -o GET -a "_cat/segments/$1?v&s=index,shard,prirep"
   query-es -o GET -a "_cat/segments/$1?v&s=index,shard,prirep"
   exit
fi
if [[ "$1 $2 $3" == "list segmented shards" || "$1" == "lss" ]]; then
   if [[ "$1" == "lss" ]]; then shift; else shift 3; fi
   usage="list segmented shards (lss) [<index_name>]"
   check_params $# 0 "Usage: $usage"
   print_command query-es -o GET -a "_cat/shards/$1?v&h=index,shard,prirep,state,docs,node,segments.count&s=index,shard,prirep,node" -f '/ 1$/d'
   query-es -o GET -a "_cat/shards/$1?v&h=index,shard,prirep,state,docs,node,segments.count&s=index,shard,prirep,node" -f '/ 1$/d'
   exit
fi
if [[ "$1 $2 $3" == "get index mapping" || "$1" == "gim" ]]; then
   if [[ "$1" == "gim" ]]; then shift; else shift 3; fi
   usage="get index mapping (gim) <index_name>"
   check_params $# 1 "Usage: $usage"
   print_command query-es -o GET -a "/$1/_mapping?pretty"
   query-es -o GET -a "/$1/_mapping?pretty"
   exit
fi
if [[ "$1 $2 $3" == "list unassigned shards" || "$1" == "lus" ]]; then
   if [[ "$1" == "lus" ]]; then shift; else shift 3; fi
   usage="list unassigned shards (lus)"
   check_params $# 0 "Usage: $usage"
   print_command query-es -o GET -a "_cat/shards?v&h=index,shard,prirep,state,docs,segments.count&s=index,shard,prirep"    -f 's/\(.* \(INITIALIZING\|UNASSIGNED\) .*\)/\1/;t;d'
   query-es -o GET -a "_cat/shards?v&h=index,shard,prirep,state,docs,segments.count&s=index,shard,prirep"    -f 's/\(.* \(INITIALIZING\|UNASSIGNED\) .*\)/\1/;t;d'
   exit
fi
if [[ "$1 $2" == "forcemerge progress" || "$1" == "fmp" ]]; then
   if [[ "$1" == "fmp" ]]; then shift; else shift 2; fi
   usage="forcemerge progress (fmp)"
   check_params $# 0 "Usage: $usage"
   print_command query-es -o GET -a "/_cat/nodes?v&h=name,cpu,load_1m,merges.current,merges.current_docs,merges.total,merges.total_docs&s=name"
   query-es -o GET -a "/_cat/nodes?v&h=name,cpu,load_1m,merges.current,merges.current_docs,merges.total,merges.total_docs&s=name"
   exit
fi
section="INDEX MANIPULATION"
if [[ "$1 $2" == "create index" || "$1" == "ci" ]]; then
   if [[ "$1" == "ci" ]]; then shift; else shift 2; fi
   usage="create index (ci) <index_name> <number_of_shards> <number_of_replicas>"
   check_params $# 3 "Usage: $usage"
   print_command query-es -o PUT -a "$1" -j '{"settings":{"index":{"number_of_shards":'$2',"number_of_replicas":'$3'}}}'
   query-es -o PUT -a "$1" -j '{"settings":{"index":{"number_of_shards":'$2',"number_of_replicas":'$3'}}}'
   exit
fi
if [[ "$1 $2" == "delete index" || "$1" == "di" ]]; then
   if [[ "$1" == "di" ]]; then shift; else shift 2; fi
   usage="delete index (di) <index_name>"
   check_params $# 1 "Usage: $usage"
   print_command query-es -o DELETE -a "$1"
   query-es -o DELETE -a "$1"
   exit
fi
if [[ "$1 $2" == "open index" || "$1" == "opi" ]]; then
   if [[ "$1" == "opi" ]]; then shift; else shift 2; fi
   usage="open index (opi) <index_name>"
   check_params $# 1 "Usage: $usage"
   print_command query-es -o POST -a "$1/_open"
   query-es -o POST -a "$1/_open"
   exit
fi
if [[ "$1 $2" == "close index" || "$1" == "cli" ]]; then
   if [[ "$1" == "cli" ]]; then shift; else shift 2; fi
   usage="close index (cli) <index_name>"
   check_params $# 1 "Usage: $usage"
   print_command query-es -o POST -a "$1/_close"
   query-es -o POST -a "$1/_close"
   exit
fi
if [[ "$1 $2 $3" == "enable read write" || "$1" == "erw" ]]; then
   if [[ "$1" == "erw" ]]; then shift; else shift 3; fi
   usage="enable read write (erw) <index_name>"
   check_params $# 1 "Usage: $usage"
   print_command query-es -o PUT -a "$1/_settings" -j '{"index.blocks.read_only_allow_delete": null}'
   query-es -o PUT -a "$1/_settings" -j '{"index.blocks.read_only_allow_delete": null}'
   exit
fi
if [[ "$1 $2" == "reindex index" || "$1" == "ri" ]]; then
   if [[ "$1" == "ri" ]]; then shift; else shift 2; fi
   usage="reindex index (ri) <source_index_name> <dest_index_name>"
   check_params $# 2 "Usage: $usage"
   print_command query-es -o POST -a "_reindex" -j '{"source":{"index":"'$1'"},"dest":{"index":"'$2'"}}'
   query-es -o POST -a "_reindex" -j '{"source":{"index":"'$1'"},"dest":{"index":"'$2'"}}'
   exit
fi
if [[ "$1" == "forcemerge" || "$1" == "fm" ]]; then
   if [[ "$1" == "fm" ]]; then shift; else shift 1; fi
   usage="forcemerge (fm) <index_name> <max_num_segments>"
   check_params $# 2 "Usage: $usage"
   print_command query-es -o POST -a "$1/_forcemerge?max_num_segments=$2"
   query-es -o POST -a "$1/_forcemerge?max_num_segments=$2"
   exit
fi
if [[ "$1 $2" == "move shard" || "$1" == "ms" ]]; then
   if [[ "$1" == "ms" ]]; then shift; else shift 2; fi
   usage="move shard (ms) <index_name> <shard_num> <from_node_name> <to_node_name>"
   check_params $# 4 "Usage: $usage"
   print_command query-es -o POST -a "_cluster/reroute" -j '{"commands":[{"move":{"index":"'$1'","shard":'$2',"from_node":"'$3'","to_node":"'$4'"}}]}'
   query-es -o POST -a "_cluster/reroute" -j '{"commands":[{"move":{"index":"'$1'","shard":'$2',"from_node":"'$3'","to_node":"'$4'"}}]}'
   exit
fi
if [[ "$1 $2 $3" == "alter number replicas" || "$1" == "anr" ]]; then
   if [[ "$1" == "anr" ]]; then shift; else shift 3; fi
   usage="alter number replicas (anr) <index_name> <number_of_replicas>"
   check_params $# 2 "Usage: $usage"
   print_command query-es -o PUT -a "$1/_settings" -j '{"index":{"number_of_replicas":'$2'}}'
   query-es -o PUT -a "$1/_settings" -j '{"index":{"number_of_replicas":'$2'}}'
   exit
fi
if [[ "$1 $2 $3" == "disable shard allocation" || "$1" == "dsa" ]]; then
   if [[ "$1" == "dsa" ]]; then shift; else shift 3; fi
   usage="disable shard allocation (dsa)"
   check_params $# 0 "Usage: $usage"
   print_command query-es -o PUT -a "_cluster/settings" -j '{"persistent":{"cluster.routing.allocation.enable":"primaries"}}'
   query-es -o PUT -a "_cluster/settings" -j '{"persistent":{"cluster.routing.allocation.enable":"primaries"}}'
   exit
fi
if [[ "$1 $2 $3" == "reenable shard allocation" || "$1" == "rsa" ]]; then
   if [[ "$1" == "rsa" ]]; then shift; else shift 3; fi
   usage="reenable shard allocation (rsa)"
   check_params $# 0 "Usage: $usage"
   print_command query-es -o PUT -a "_cluster/settings" -j '{"persistent":{"cluster.routing.allocation.enable":null}}'
   query-es -o PUT -a "_cluster/settings" -j '{"persistent":{"cluster.routing.allocation.enable":null}}'
   exit
fi
section="INDEX ENTRY MANIPULATION"
if [[ "$1 $2" == "add entry" || "$1" == "ae" ]]; then
   if [[ "$1" == "ae" ]]; then shift; else shift 2; fi
   usage="add entry (ae) <index_name> <entry_json>"
   check_params $# 2 "Usage: $usage"
   print_command query-es -o POST -a /$1/_doc -j "$2"
   query-es -o POST -a /$1/_doc -j "$2"
   exit
fi
section="NODES"
if [[ "$1 $2" == "list nodes" || "$1" == "ln" ]]; then
   if [[ "$1" == "ln" ]]; then shift; else shift 2; fi
   usage="list nodes (ln)"
   check_params $# 0 "Usage: $usage"
   print_command query-es -r 1 -o GET -a "_cat/nodes?v&h=name,ip,nodeRole,m,heapPercent,ramPercent,cpu,load_1m,load_5m,load_15m,disk.total,disk.used_percent&s=name"
   query-es -r 1 -o GET -a "_cat/nodes?v&h=name,ip,nodeRole,m,heapPercent,ramPercent,cpu,load_1m,load_5m,load_15m,disk.total,disk.used_percent&s=name"
   exit
fi
if [[ "$1 $2 $3" == "list nodes queries" || "$1" == "lnq" ]]; then
   if [[ "$1" == "lnq" ]]; then shift; else shift 3; fi
   usage="list nodes queries (lnq)"
   check_params $# 0 "Usage: $usage"
   print_command query-es -r 1 -o GET -a "_cat/nodes?v&h=name,nodeRole,search,queryTotal,searchFetchTotal,requestCacheHitCount&s=name"
   query-es -r 1 -o GET -a "_cat/nodes?v&h=name,nodeRole,search,queryTotal,searchFetchTotal,requestCacheHitCount&s=name"
   exit
fi
if [[ "$1 $2" == "search nodes" || "$1" == "sn" ]]; then
   if [[ "$1" == "sn" ]]; then shift; else shift 2; fi
   usage="search nodes (sn)"
   check_params $# 0 "Usage: $usage"
   print_command query-es -o GET -a "_nodes" -f "$1"
   query-es -o GET -a "_nodes" -f "$1"
   exit
fi
if [[ "$1 $2 $3" == "node active threads" || "$1" == "at" ]]; then
   if [[ "$1" == "at" ]]; then shift; else shift 3; fi
   usage="node active threads (at)"
   check_params $# 0 "Usage: $usage"
   print_command query-es -o GET -a "_cat/thread_pool?v&s=node_name,name"             -f 's/\(.*node_name.*\|.* [1-9] .*$\)/\1/;t;d'
   query-es -o GET -a "_cat/thread_pool?v&s=node_name,name"             -f 's/\(.*node_name.*\|.* [1-9] .*$\)/\1/;t;d'
   exit
fi
section="SEARCH"
if [[ "$1" == "search" || "$1" == "s" ]]; then
   if [[ "$1" == "s" ]]; then shift; else shift 1; fi
   usage="search (s) <index_name> <search_term>"
   check_params $# 2 "Usage: $usage"
   print_command query-es -o GET -a "$1/_search?q=$2&pretty"
   query-es -o GET -a "$1/_search?q=$2&pretty"
   exit
fi
if [[ "$1 $2" == "search json" || "$1" == "sj" ]]; then
   if [[ "$1" == "sj" ]]; then shift; else shift 2; fi
   usage="search json (sj) <index_name> <search_json>"
   check_params $# 2 "Usage: $usage"
   print_command query-es -o GET -a "$1/_search?pretty" -j "$2"
   query-es -o GET -a "$1/_search?pretty" -j "$2"
   exit
fi
if [[ "$1 $2" == "search summary" || "$1" == "ss" ]]; then
   if [[ "$1" == "ss" ]]; then shift; else shift 2; fi
   usage="search summary (ss) <index_name> <search_term>"
   check_params $# 2 "Usage: $usage"
   print_command query-es -o GET -a "$1/_search?q=$Qzz\("took":[0-9]*\).*\("_shards":{[^}]*}\).*\("total":[0-9]*,"max_score":[0-9\.]*\)/\1 \2 \3"
   query-es -o GET -a "$1/_search?q=$Qzz\("took":[0-9]*\).*\("_shards":{[^}]*}\).*\("total":[0-9]*,"max_score":[0-9\.]*\)/\1 \2 \3"
   exit
fi
section="TASKS"
if [[ "$1 $2" == "list tasks" || "$1" == "lt" ]]; then
   if [[ "$1" == "lt" ]]; then shift; else shift 2; fi
   usage="list tasks (lt) [<sort_field>]"
   check_params $# 0 "Usage: $usage"
   print_command query-es -o GET -a "/_cat/tasks?v&h=action,type,start_time,timestamp,running_time,node&s=$1"             -f '/monitor\/tasks\/lists/d'
   query-es -o GET -a "/_cat/tasks?v&h=action,type,start_time,timestamp,running_time,node&s=$1"             -f '/monitor\/tasks\/lists/d'
   exit
fi
if [[ "$1 $2 $3" == "list tasks detail" || "$1" == "ltd" ]]; then
   if [[ "$1" == "ltd" ]]; then shift; else shift 3; fi
   usage="list tasks detail (ltd) [<sort_field>]"
   check_params $# 0 "Usage: $usage"
   print_command query-es -o GET -a "/_cat/tasks?v&s=$1"
   query-es -o GET -a "/_cat/tasks?v&s=$1"
   exit
fi
section="GENERIC"
if [[ "$1" == "generic" || "$1" == "g" ]]; then
   if [[ "$1" == "g" ]]; then shift; else shift 1; fi
   usage="generic (g) <type-GET/POST/PUT> <api_call>"
   check_params $# 2 "Usage: $usage"
   print_command query-es -o $1 -a "$2"
   query-es -o $1 -a "$2"
   exit
fi
section="HELP"
if [[ "$1" == "help" || "$1" == "esh" ]]; then
   if [[ "$1" == "esh" ]]; then shift; else shift 1; fi
   usage="help (esh)"
   check_params $# 0 "Usage: $usage"
   egrep "usage=|section=" $0 | grep -v "grep" | sed "s/.*usage=/   /; s/.*section=//; s/\"//g"
   exit
fi

if [[ "$1" == "" ]]; then
   echo "No option passed"
else
   echo "$*: invalid option"
fi
echo "Try \"es help\" for more information."

