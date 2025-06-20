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
    echo "COMMAND: $*" | sed 's/./-/g'
    echo "COMMAND: $*" | sed 's/"/\"/g'
    echo "COMMAND: $*" | sed 's/./-/g'
  fi
}

section="GENERAL"
if [[ "$1 $2 $3" == "list branches local" || "$1" == "glbl" ]]; then
   if [[ "$1" == "glbl" ]]; then shift; else shift 3; fi
   usage="[95mlist branches local [96m(glbl)[97m[0m "
   check_params $# 0 "Usage: $usage"
   print_command " git branch "
   git branch
   exit
fi
if [[ "$1 $2 $3" == "list branches remote" || "$1" == "glbr" ]]; then
   if [[ "$1" == "glbr" ]]; then shift; else shift 3; fi
   usage="[95mlist branches remote [96m(glbr)[97m[0m "
   check_params $# 0 "Usage: $usage"
   print_command " git branch -r "
   git branch -r
   exit
fi
if [[ "$1" == "clone" || "$1" == "gc" ]]; then
   if [[ "$1" == "gc" ]]; then shift; else shift 1; fi
   usage="[95mclone [96m(gc)[97m <url>[0m "
   check_params $# 1 "Usage: $usage"
   print_command " git clone $1 "
   git clone $1
   exit
fi
if [[ "$1" == "history" || "$1" == "gh" ]]; then
   if [[ "$1" == "gh" ]]; then shift; else shift 1; fi
   usage="[95mhistory [96m(gh)[97m[0m "
   check_params $# 0 "Usage: $usage"
   print_command " git log > /tmp/gi1; while read line; do echo $line; if [[ ${line:0:6} == commit ]]; then git diff-tree --no-commit-id --name-only -r ${line:7:99} | tr \"\n\" \" \" | fold -s -w 100; echo; fi; done < /tmp/gi1 | sed \"s/^ *//; /^$/d; s/^commit/${l80}\n${c_yel}Commit:/\" | sed \"s/^Author/${c_lcya}Author/; s/^Date/${c_lgre}Date/; s/$/${c_whi}/\" > /tmp/gi2; echo -e \"$(cat /tmp/gi2)\"; rm -f /tmp/gi1 /tmp/gi2 "
   git log > /tmp/gi1; while read line; do echo $line; if [[ ${line:0:6} == commit ]]; then git diff-tree --no-commit-id --name-only -r ${line:7:99} | tr "\n" " " | fold -s -w 100; echo; fi; done < /tmp/gi1 | sed "s/^ *//; /^$/d; s/^commit/${l80}\n${c_yel}Commit:/" | sed "s/^Author/${c_lcya}Author/; s/^Date/${c_lgre}Date/; s/$/${c_whi}/" > /tmp/gi2; echo -e "$(cat /tmp/gi2)"; rm -f /tmp/gi1 /tmp/gi2
   exit
fi
if [[ "$1" == "pull" || "$1" == "gpu" ]]; then
   if [[ "$1" == "gpu" ]]; then shift; else shift 1; fi
   usage="[95mpull [96m(gpu)[97m[0m "
   check_params $# 0 "Usage: $usage"
   print_command " git pull "
   git pull
   exit
fi
if [[ "$1" == "push" || "$1" == "gp" ]]; then
   if [[ "$1" == "gp" ]]; then shift; else shift 1; fi
   usage="[95mpush [96m(gp)[97m [37m[<-f|--force>][97m [37m[<message>][97m[0m "
   check_params $# 0 "Usage: $usage"
   print_command " force_yn=n; if [[ $1 == -f || $1 == --force ]]; then force_yn=y; shift; fi; if [[ \"$1\" == \"\" ]]; then message=\"Various\"; else message=\"$1\"; fi; [ -f ./gen-readme ] && ./gen-readme; git add .; git status; if [[ \"$1\" != \"-f\" ]]; then read -p 'Press a key to continue, CTRL-C to abort' dummy; fi; git commit -m 'Various'; git push origin "
   force_yn=n; if [[ $1 == -f || $1 == --force ]]; then force_yn=y; shift; fi; if [[ "$1" == "" ]]; then message="Various"; else message="$1"; fi; [ -f ./gen-readme ] && ./gen-readme; git add .; git status; if [[ "$1" != "-f" ]]; then read -p 'Press a key to continue, CTRL-C to abort' dummy; fi; git commit -m 'Various'; git push origin
   exit
fi
if [[ "$1" == "status" || "$1" == "gs" ]]; then
   if [[ "$1" == "gs" ]]; then shift; else shift 1; fi
   usage="[95mstatus [96m(gs)[97m[0m "
   check_params $# 0 "Usage: $usage"
   print_command " git status "
   git status
   exit
fi
if [[ "$1 $2" == "switch branch" || "$1" == "gsb" ]]; then
   if [[ "$1" == "gsb" ]]; then shift; else shift 2; fi
   usage="[95mswitch branch [96m(gsb)[97m <branch-name>[0m [92m # (git checkout)[0m"
   check_params $# 1 "Usage: $usage"
   print_command " git checkout $1  "
   git checkout $1 
   exit
fi
section="HELP"
if [[ "$1" == "help" || "$1" == "ghe" ]]; then
   if [[ "$1" == "ghe" ]]; then shift; else shift 1; fi
   usage="[95mhelp [96m(ghe)[97m[0m "
   check_params $# 0 "Usage: $usage"
   egrep "usage=|section=" "$0" | grep -v "grep" | sed "s/.*usage=/ /; s/.*section=/\x1b[92m/; s/\"//g"
   exit
fi

if [[ "$1" == "" ]]; then
  echo "No option passed"
else
  echo "$*: invalid option"
fi
echo "Try \"gi help\" for more information."

