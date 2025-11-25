# Elasticsearch

*Generated: 2025-11-25 18:35*


## HELP

**`help (ehe)`**


## CLUSTER

**`clear cache (ecc) [<index_name>]`**

**`cluster overview (eco)`**

**`cluster health (ech)`**

**`cluster stats (ecs)`**

**`cluster recovery stats (ecrs)`**


## INDEX INTERROGATION

**`count (ec) <index_name>`**

**`list aliases (ela) [<filter> <order_by_field_name>]`**

**`list indices (eli) [<index_name>]`**

**`list open (elo) [<index_name>]`**

**`list dot indices (eldi)`**

**`list shards (els) [<index_name> <order_by_field_name>]`**

**`list shard details (elsd) [<index_name> <order_by_field_name>]`**

**`list segments (ele) [<index_name>]`**

**`list segmented shards (elss) [<index_name>]`**

**`list avg segments per shard (elass) [<index_name>]`**

**`list fields (elf) <index_name>`**

**`get index mapping (egim) <index_name>`**

**`list unassigned shards (elus)`**

**`forcemerge progress (efmp)`**


## INDEX MANIPULATION

**`add index to alias (eaita) <index_name> <alias_name>`**

**`remove index from alias (erifa) <index_name> <alias_name>`**

**`create index (eci) <index_name> <number_of_shards> <number_of_replicas>`**

**`create index from mapping (ecifm) <index_name> <number_of_shards> <number_of_replicas> <mapping-json>`**

**`clone index (eclni) <index_name> <new_index_name>`**

**`delete index (edi) <index_name>`**

**`open index (eopi) <index_name>`**

**`close index (ecli) <index_name>`**

**`enable read only (eero) <index_name>`**

**`enable read write (eerw) <index_name>`**

**`reindex index (eri) <source_index_name> <dest_index_name>`**

**`move shard (ems) <index_name> <shard_num> <from_node_name> <to_node_name>`**

**`alter number replicas (eanr) <index_name> <number_of_replicas>`**

**`disable shard allocation (edsa)`**

**`reenable shard allocation (ersa)`**

**`forcemerge (efm) <index_name> <max_num_segments>`**

**`refresh (er) <index_name>`**


## INDEX ENTRY MANIPULATION

**`add entry (eae) <index_name> <entry_json>`**

**`delete entry (ede) <index_name> [<_id>]`**


## NODES

**`list nodes (eln)`**

**`list node attributes (elna)`**

**`list nodes queries (elnq)`**

**`search nodes (esn)`**

**`node active threads (eat)`**

**`node thread pool sizes (etps)`**

**`node perf overview (enpo)`**


## SEARCH

**`search (es) <index_name> [<search_term>]`**

**`search json (esj) <index_name> <search_json>`**

**`search match (esm) <index_name> <field_name> <value>`**

**`search term (est) <index_name> <field_name> <value>`**

**`search summary (ess) <index_name> <search_term>`**


## SQL

**`sql (esql) <sql>`**


## TASKS

**`list tasks (elt) [<sort_field>]`**

**`list tasks detail (eltd) [<sort_field>]`**


## REPOS / SNAPSHOTS

**`add repo (eare) <repo_name>`**

**`delete repo (edre) <repo_name>`**

**`list repos (elre)`**

**`create snapshot (ecsn) <repo_name> <snapshot_name>`**

**`delete snapshot (edsn) <repo_name> <snapshot_name>`**

**`list snapshots (elsn)`**

**`snapshot details (esnd) <repo_name> <snapshot_name>`**

**`restore snaphot (ersn) <repo_name> <snapshot_name>`**


## GENERIC

**`generic (eg) <type-GET/POST/PUT> <api_call>`**

**`query es settings (eqes)`**

