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

section="HISTORY"
if [[ "$1" == "history" || "$1" == "gh" ]]; then
   if [[ "$1" == "gh" ]]; then shift; else shift 1; fi
   usage="history (gh) "
   check_params $# 0 "Usage: $usage"
   print_command 'git log > /tmp/gi1; while read line; do echo $line; if [[ ${line:0:6} == commit ]]; then git diff-tree --no-commit-id --name-only -r ${line:7:99} | tr "\n" " " | fold -s -w 100; echo; fi; done < /tmp/gi1 | sed "s/^ *//; /^$/d; s/^commit/${l80}\n${c_yel}Commit:/" | sed "s/^Author/${c_lcya}Author/; s/^Date/${c_lgre}Date/; s/$/${c_whi}/" > /tmp/gi2; echo -e "$(cat /tmp/gi2)"; rm -f /tmp/gi1 /tmp/gi2'
   git log > /tmp/gi1; while read line; do echo $line; if [[ ${line:0:6} == commit ]]; then git diff-tree --no-commit-id --name-only -r ${line:7:99} | tr "\n" " " | fold -s -w 100; echo; fi; done < /tmp/gi1 | sed "s/^ *//; /^$/d; s/^commit/${l80}\n${c_yel}Commit:/" | sed "s/^Author/${c_lcya}Author/; s/^Date/${c_lgre}Date/; s/$/${c_whi}/" > /tmp/gi2; echo -e "$(cat /tmp/gi2)"; rm -f /tmp/gi1 /tmp/gi2
   exit
fi
section="STATUS"
if [[ "$1" == "status" || "$1" == "gs" ]]; then
   if [[ "$1" == "gs" ]]; then shift; else shift 1; fi
   usage="status (gs) "
   check_params $# 0 "Usage: $usage"
   print_command 'git status'
   git status
   exit
fi
section="ADD/COMMIT"
if [[ "$1 $2" == "push -f|--force" || "$1" == "gp" ]]; then
   if [[ "$1" == "gp" ]]; then shift; else shift 2; fi
   usage="push (gp) [-f|--force] [<message>] "
   check_params $# 0 "Usage: $usage"
   print_command 'force_yn=n; if [[ $1 == -f || $1 == --force ]]; then force_yn=y; shift; fi; echo $1'
   force_yn=n; if [[ $1 == -f || $1 == --force ]]; then force_yn=y; shift; fi; echo $1
   exit
fi
if [[ "$1 $2 $3" == "git add ." || "$1" == "" ]]; then
   if [[ "$1" == "" ]]; then shift; else shift 3; fi
   usage="git add . "
   check_params $# 0 "Usage: $usage"
   print_command 'git add .'
   git add .
   exit
fi
if [[ "$1 $2" == "git status" || "$1" == "" ]]; then
   if [[ "$1" == "" ]]; then shift; else shift 2; fi
   usage="git status "
   check_params $# 0 "Usage: $usage"
   print_command 'git status'
   git status
   exit
fi
if [[ "$1 $2 $3 $4 $5 $6" == "if "$1" != "-f" ; then" || "$1" == "" ]]; then
   if [[ "$1" == "" ]]; then shift; else shift 6; fi
   usage="if [[ "$1" != "-f" ]]; then "
   check_params $# 0 "Usage: $usage"
   print_command 'if [[ "$1" != "-f" ]]; then'
   if [[ "$1" != "-f" ]]; then
   exit
fi
if [[ "$1 $2 $3 $4 $5 $6 $7" == "read -p 'Press a key to continue'" || "$1" == "" ]]; then
   if [[ "$1" == "" ]]; then shift; else shift 7; fi
   usage="read -p 'Press a key to continue' "
   check_params $# 0 "Usage: $usage"
   print_command 'read -p 'Press a key to continue''
   read -p 'Press a key to continue'
   exit
fi
if [[ "$1" == "fi" || "$1" == "" ]]; then
   if [[ "$1" == "" ]]; then shift; else shift 1; fi
   usage="fi "
   check_params $# 0 "Usage: $usage"
   print_command 'fi'
   fi
   exit
fi
if [[ "$1 $2 $3 $4" == "git commit -m 'Various'" || "$1" == "" ]]; then
   if [[ "$1" == "" ]]; then shift; else shift 4; fi
   usage="git commit -m 'Various' "
   check_params $# 0 "Usage: $usage"
   print_command 'git commit -m 'Various''
   git commit -m 'Various'
   exit
fi
if [[ "$1 $2 $3 $4" == "git push origin master" || "$1" == "" ]]; then
   if [[ "$1" == "" ]]; then shift; else shift 4; fi
   usage="git push origin master "
   check_params $# 0 "Usage: $usage"
   print_command 'git push origin master'
   git push origin master
   exit
fi
section="HELP"
if [[ "$1" == "help" || "$1" == "ghe" ]]; then
   if [[ "$1" == "ghe" ]]; then shift; else shift 1; fi
   usage="help (ghe) "
   check_params $# 0 "Usage: $usage"
   egrep "usage=|section=" "$0" | grep -v "grep" | sed "s/.*usage=/ /; s/.*section=//; s/\"//g"
   exit
fi

if [[ "$1" == "" ]]; then
  echo "No option passed"
else
  echo "$*: invalid option"
fi
echo "Try \"gi help\" for more information."

