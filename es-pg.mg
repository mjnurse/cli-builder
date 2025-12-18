## CLUSTER

clear cache [<index_name>]
`curl -s -X POST "http://$ES_HOST:$ES_PORT/<index_name>/_cache/clear"

cluster overview
`curl -s -X GET "http://$ES_HOST:$ES_PORT/"

cluster health
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cluster/health?human&pretty"

cluster stats
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cluster/stats?human&pretty"

cluster recovery stats
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/recovery?v"

## INDEX INTERROGATION

count <index_name>
`curl -s -X GET "http://$ES_HOST:$ES_PORT/<index_name>/_count?pretty"

list aliases [<filter>] [<order_by_field_name>]
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/aliases/<filter>?v&s=<order_by_field_name>"

list indices [<index_name>]
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/indices/<index_name>?v&h=health,status,index,pri,rep,sc,docs.count,docs.deleted,store.size,pri.store.size&s=index"

list open [<index_name>]
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/indices/<index_name>?v&h=health,status,index,pri,rep,sc,docs.count,docs.deleted,store.size,pri.store.size&s=index" | sed "/ close  /d"

list dot indices
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/indices/.*?v&s=index"

list shards [<index_name>] [<order_by_field_name>]
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/shards/<index_name>?v&h=index,shard,prirep,sc,state,docs,store,node&s=index,shard,prirep&s=<order_by_field_name>"

list shard details [<index_name>] [<order_by_field_name>]
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/shards/<index_name>?v&h=index,shard,prirep,state,docs,store,ip,segments.count,unassigned.reason,unassigned.for,node&s=<order_by_field_name>"

list segments [<index_name>]
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/segments/<index_name>?v&s=index,shard,prirep"

list segmented shards [<index_name>]
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/shards/<index_name>?v&h=index,shard,prirep,state,docs,node,segments.count&s=index,shard,prirep,node"

list avg segments per shard [<index_name>]
`curl -s "http://$ES_HOST:$ES_PORT/_cat/segments/<index_name>?v&s=index,shard,prirep" | tail -n +2 | sed 's/[[:space:]]\+/ /g' | cut -d ' ' -f1,2 |
    sort | uniq -c |
    awk '{c=$1; i=$2; sh=$3; se_c[i]+=c; sh_c[i]++} END {printf "%-52s Avg Segments\n","Index"; for  {avg=se_c[i]/sh_c[i]; printf "%-60s %.2f\n", i, avg}}' | sort

list fields <index_name>
`curl -s -X GET "http://$ES_HOST:$ES_PORT/<index_name>/_mapping" | cols

get index mapping <index_name>
`curl -s -X GET "http://$ES_HOST:$ES_PORT/<index_name>/_mapping?pretty"

list unassigned shards  ::`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/shards?v&h=index,shard,prirep,state,docs,segments.count&s=index,shard,prirep"

forcemerge progress
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/nodes?v&h=name,cpu,load_1m,merges.current,merges.current_docs,merges.total,merges.total_docs&s=name"

## INDEX MANIPULATION

add index to alias <index_name> <alias_name>
`curl -s -X POST "http://$ES_HOST:$ES_PORT/_aliases" -H 'Content-Type: application/json' -d '{"actions":[{"add":{"index":"'<index_name>'","alias":"'<alias_name>'"}}]}'

remove index from alias <index_name> <alias_name>
`curl -s -X DELETE "http://$ES_HOST:$ES_PORT/<index_name>/_aliases/<alias_name>";

create index <index_name> <number_of_shards> <number_of_replicas>
`curl -s -X PUT "http://$ES_HOST:$ES_PORT/<index_name>" -H 'Content-Type: application/json' -d '{"settings":{"index":{"number_of_shards":'<number_of_shards>',"number_of_replicas":'<number_of_replicas>'}}}'

create index from mapping <index_name> <number_of_shards> <number_of_replicas> <mapping-json>
`curl -s -X PUT "http://$ES_HOST:$ES_PORT/<index_name>" -H 'Content-Type: application/json' -d '{"settings":{"index":{"number_of_shards":'<number_of_shards>',"number_of_replicas":'<number_of_replicas>'}},"mappings":'<mapping-json>'}'

clone index <index_name> <new_index_name>
`curl -s -X POST "http://$ES_HOST:$ES_PORT/<index_name>/_clone/<new_index_name>"

delete index <index_name>
`curl -s -X DELETE "http://$ES_HOST:$ES_PORT/<index_name>";

open index <index_name>
`curl -s -X POST "http://$ES_HOST:$ES_PORT/<index_name>/_open"

close index <index_name>
`curl -s -X POST "http://$ES_HOST:$ES_PORT/<index_name>/_close"

enable read only <index_name>
`curl -s -X PUT "http://$ES_HOST:$ES_PORT/<index_name>/_settings" -H 'Content-Type: application/json' -d '{"index.blocks.write": true}'

enable read write <index_name>
`curl -s -X PUT "http://$ES_HOST:$ES_PORT/<index_name>/_settings" -H 'Content-Type: application/json' -d '{"index.blocks.write": false}'

reindex index <source_index_name> <dest_index_name>
`curl -s -X POST "http://$ES_HOST:$ES_PORT/_reindex" -H 'Content-Type: application/json' -d '{"source":{"index":"'<source_index_name>'"},"dest":{"index":"'<dest_index_name>'"}}'

move shard <index_name> <shard_num> <from_node_name> <to_node_name>
`curl -s -X POST "http://$ES_HOST:$ES_PORT/_cluster/reroute" -H 'Content-Type: application/json' -d '{"commands":[{"move":{"index":"'<index_name>'","shard":'<shard_num>',"from_node":"'<from_node_name>'","to_node":"'<to_node_name>'"}}]}'

alter number replicas <index_name> <number_of_replicas>
`curl -s -X PUT "http://$ES_HOST:$ES_PORT/<index_name>/_settings" -H 'Content-Type: application/json' -d '{"index":{"number_of_replicas":'<number_of_replicas>'}}'

disable shard allocation
`curl -s -X PUT "http://$ES_HOST:$ES_PORT/_cluster/settings" -H 'Content-Type: application/json' -d '{"persistent":{"cluster.routing.allocation.enable":"primaries"}}'

reenable shard allocation
`curl -s -X PUT "http://$ES_HOST:$ES_PORT/_cluster/settings" -H 'Content-Type: application/json' -d '{"persistent":{"cluster.routing.allocation.enable":null}}'

forcemerge <index_name> <max_num_segments>
`curl -s -X POST "http://$ES_HOST:$ES_PORT/<index_name>/_forcemerge?max_num_segments=<max_num_segments>"

refresh <index_name>
`curl -s -X POST "http://$ES_HOST:$ES_PORT/<index_name>/_refresh"

## INDEX ENTRY MANIPULATION

add entry <index_name> <entry_json> ::`curl -s -X POST "http://$ES_HOST:$ES_PORT/<index_name>/_doc" -H 'Content-Type: application/json' -d "<entry_json>"

delete entry <index_name> [<_id>]
    if [[ "$2" == "" ]]; then
`curl -s -X POST "http://localhost:9200/<index_name>/_delete_by_query" -H 'Content-Type: application/json'
                 -d '{ "query": { "match_all": {} } }' | pj;
        fi;
    else
`curl -s -X POST "http://localhost:9200/<index_name>/_delete_by_query" -H 'Content-Type: application/json'
             -d '{ "query": { "ids": { "values": [ "'<_id>'" ] } } }' | pj;
    fi

## NODES

list nodes
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/nodes?v&h=name,ip,nodeRole,m,heapPercent,ramPercent,cpu,load_1m,load_5m,load_15m,disk.total,disk.used_percent&s=name"

list node attributes
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/nodeattrs?v&s=node"

list nodes queries
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/nodes?v&h=name,nodeRole,search,queryTotal,searchFetchTotal,requestCacheHitCount&s=name"

search nodes
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_nodes"

node active threads
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/thread_pool?v&s=node_name,name"

node thread pool sizes
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/thread_pool?v&h=node_name,name,size,active,queue,queue_size,largest,min,max&s=node_name,name"

node perf overview
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/nodes?v&h=ip,port,role,master,cpu,ft,ftt,iic,iif,mt,mtt,d,mcs"

## SEARCH

search <index_name> [<search_term>]
    if [[ "$2" == "" ]]; then term="*"; else term="$2"; fi;
`curl -s -X GET "http://$ES_HOST:$ES_PORT/<index_name>/_search?q=${term}&pretty" | pj

search json <index_name> <search_json>
`curl -s -X GET "http://$ES_HOST:$ES_PORT/<index_name>/_search?pretty" -H 'Content-Type: application/json' -d "<search_json>"

search match <index_name> <field_name> <value>
`curl -s -X GET "http://$ES_HOST:$ES_PORT/<index_name>/_search?pretty" -H 'Content-Type: application/json' -d '{"query": { "match": { "'<field_name>'": "'<value>'" } } }'

search term <index_name> <field_name> <value>
`curl -s -X GET "http://$ES_HOST:$ES_PORT/<index_name>/_search?pretty" -H 'Content-Type: application/json' -d '{"query": { "term": { "'<field_name>'": "'<value>'" } } }'

search summary <index_name> <search_term>
`curl -s -X GET "http://$ES_HOST:$ES_PORT/<index_name>/_search?size=0&pretty" -H 'Content-Type: application/json' -d '{"aggs": {"count": {"terms": { "field" : "'<search_term>'", "size" : 100 } } } }'
## SQL

sql <sql>
    echo '{"query": "'"${<sql>//\"/\\\"}"'"}';
`curl -s -X POST "http://$ES_HOST:$ES_PORT/_sql?format=json" -H 'Content-Type: application/json' -d '{"query": "'"${<sql>//\"/\\\"}"'"}' | jq


## TASKS

list tasks [<sort_field>]
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/tasks?v&h=action,type,start_time,timestamp,running_time,node&s=<sort_field>"

list tasks detail [<sort_field>]
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/tasks?v&s=<sort_field>"

## REPOS / SNAPSHOTS

add repo <repo_name>
`curl -s -X PUT "http://$ES_HOST:$ES_PORT/_snapshot/<repo_name>?pretty" -H 'Content-Type: application/json' -d '{ "type": "fs", "settings": { "location": "'<repo_name>'" } } '

delete repo <repo_name>
    read -p "Are you sure [yN]? " yn;
    if [[ ${yn^} == Y ]]; then
`curl -s -X DELETE "http://$ES_HOST:$ES_PORT/_snapshot/<repo_name>?pretty";
    fi

list repos
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/repositories?v"

create snapshot <repo_name> <snapshot_name>
`curl -s -X PUT "http://$ES_HOST:$ES_PORT/_snapshot/<repo_name>/<snapshot_name>?pretty"

delete snapshot <repo_name> <snapshot_name>
    read -p "Are you sure [yN]? " yn;
    if [[ ${yn^} == Y ]]; then
`curl -s -X DELETE "http://$ES_HOST:$ES_PORT/_snapshot/<repo_name>/<snapshot_name>?pretty";
    fi

list snapshots
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_cat/snapshots?v"

snapshot details <repo_name> <snapshot_name>
`curl -s -X GET "http://$ES_HOST:$ES_PORT/_snapshot/<repo_name>/<snapshot_name>?pretty"

restore snaphot <repo_name> <snapshot_name>
`curl -s -X POST "http://$ES_HOST:$ES_PORT/_snapshot/<repo_name>/<snapshot_name>/_restore?pretty"
