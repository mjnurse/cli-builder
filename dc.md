# DC

*Generated: 2026-01-26 13:50*


## HELP

**`help (dhe)`**


## CONTAINERS

**`delete container (drm) <container_name>`**

**`list containers (dps) [<-d>]`** - -d: show details

**`logs (dlo) <container-name> [<-f>]`** - -f: follow log

**`pull container (dpu) <container_name>`**

**`rename container (dmv) <current_name> <new_name>`**

**`restart container (dre) <container_name>`**

**`run container (dru) <source-container-name> <deployed-container-name> [<-p host-port:container-port>]`**

**`shell (dsh) <container_name> [<-s> <-r>]`** - bash shell. -s: sh, -r: user root

**`start container (dst) <container_name> [<-a>]`**

**`stats (ds)`** - Show the CPU, Memory consumption of containers

**`stop container (dso) <container_name> [<-a>]`** - -a: Stop all containers


## COMPOSE

**`compose build (dcb)`** - Build containers

**`compose down (dcdo) [<service>]`** - Stop and remove containers, networks

**`compose list (dcls)`**

**`compose restart (dcre) [<service>]`** - Restart all containers

**`compose top (dct)`**

**`compose up (dcup) [<service>]`** - Deploy and run containers, networks

**`compose build up (dcbup) [<service>]`** - Build, deploy and run containers, networks


## NETWORKS

**`list networks (dln)`**

**`prune networks (dpn)`** - Remove all unused custom networks

**`remove network (drn) <network-name>`**


## SYSTEM

**`system prune all (dspa)`** - Remove ALL unused containers, images, networks, and build cache

